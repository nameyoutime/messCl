const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express();

// router
const user = require('./router/user.router');
const room = require('./router/room.router');




server.use(cors());
server.use(bodyParser.json());

server.use("/api/user", user);
server.use("/api/room", room);



module.exports = server;