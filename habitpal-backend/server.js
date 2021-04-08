// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const dbConfig = require('./app/config/DBConfig');

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const { getHabits, addHabit, inviteFriend, getInvitations, acceptInvite, getDetail } = require('./app/controllers/HabitController');
const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('./app/controllers/AuthController');
const { auth } = require('./app/middleware/auth')

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin:true,credentials: true}));

app.post('/users/register', RegisterUser);
app.post('/users/login', LoginUser);
app.get('/users/auth', auth, getUserDetails);
app.get('/users/logout', auth, LogoutUser);

app.get('/habits', auth, getHabits);
app.post('/habits', auth, addHabit);

app.post('/invite', auth, inviteFriend);
app.get('/invite', auth, getInvitations);

app.post('/accept', auth, acceptInvite);

app.get('/detail', auth, getDetail);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));