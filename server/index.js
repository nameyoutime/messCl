const app = require('./src/server');
const config = require('./src/config');

const Database = require('./src/database')

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

async function main() {
  await Database.instance.connect();
  server.listen(config.PORT, config.HOST, () => {
    console.log(`Server started on ${config.HOST}:${config.PORT}`);
  })
}
main()

io.on('connection', (socket) => {
  // console.log("user id:", socket.id);
  socket.on('touch', data => {
    socket.to(data).emit("render","a");
  })
  socket.on('acceptF', data => {
    socket.to(data).emit("renderF","a");
  })
  socket.on('delete', val => {
    socket.to(val.room).emit("deleteMess",val.data);
  })
  socket.on('user-join', data => {
    socket.join(data);
  })
  socket.on('user-leave', data => {
    socket.leave(data);
  })
  socket.on('join', room => {
    socket.join(room);
  })
  socket.on('leave', room => {
    socket.leave(room);
  })
  socket.on("message",data=>{
    let room = data.room;
    let payload = data.data;
    socket.to(room).emit('sendMessage',payload);
  })
});
