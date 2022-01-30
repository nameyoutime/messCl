require('dotenv').config();
module.exports = {
    PORT: '8080',
    HOST: '0.0.0.0',
    CONNECTIONSTRING: process.env.MONGO,
}