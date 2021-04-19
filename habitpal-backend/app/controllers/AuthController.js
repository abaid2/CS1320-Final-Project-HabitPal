const { User } = require('../models/UserModel');
const emailValidator = require('deep-email-validator');
 
async function isEmailValid(email) {
 return emailValidator.validate({
    email: email,
    sender: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: false,
  });
}

exports.RegisterUser = async(req, res) => {
    const email = req.body.email;
    const {valid, reason, validators} = await isEmailValid(email);
    if (!valid) {
        return res.status(400).json({ success: false, message: 'Invalid email!', reason: `${reason}` });
    }
    const user = new User(req.body);
    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({ errors: err })
        } else {
            const userData = {
                username: doc.username,
                email: doc.email,
            }
            return res.status(200).json({
                success: true,
                message: 'Successfully Signed Up',
                userData
            })
        }
    });
}

exports.LoginUser = (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) {
            return res.status(404).json({ success: false, message: 'User email not found!' });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                //isMatch is either true or false
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Wrong Password!' });
                } else {
                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send({ err });
                        } else {
                            const data = {
                                    habitId: user._id,
                                    username: user.username,
                                    email: user.email,
                                    token: user.token
                                }
                                //saving token to cookie
                            res.cookie('authToken', user.token, {
                                sameSite: 'none',
                                maxAge: 3 * 60 * 60 * 1000,
                                secure: true
                            }).status(200).json({
                                success: true,
                                message: 'Successfully Logged In!',
                                userData: data
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.LogoutUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.user._id }, { token: '' },
        (err) => {
            if (err) {
                return res.json({ success: false, err });
            }
            return res.status(200).send({ success: true, message: 'Successfully Logged Out!' });
        });
}

//get authenticated user details
exports.getUserDetails = (req, res) => {
    return res.status(200).json({
        isAuthenticated: true,
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
    });
}

// exports.getUserById = async(req, res) => {
//     let user = await User.findById({ _id: req.body.userId })
//     const userData = {
//         username: user.username,
//         email: user.email,
//     }
//     return res.status(200).send(userData);
// }