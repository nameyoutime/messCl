const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express();

// router
const user = require('./router/user.router');
const room = require('./router/room.router');
const mess = require('./router/message.router');





server.use(cors());
server.use(bodyParser.json());

server.use("/api/user", user);
server.use("/api/room", room);
server.use("/api/mess", mess);



module.exports = server;