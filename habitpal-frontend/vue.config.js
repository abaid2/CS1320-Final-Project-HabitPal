const fs = require('fs')

module.exports = {
    devServer: {
        https: {
          key: fs.readFileSync('./certs/habitpal.com+5-key.pem'),
          cert: fs.readFileSync('./certs/habitpal.com+5.pem'),
        },
        port: 8081,
        public: 'https://localhost:8081/'
    }
}