// Test Chat app using socket.io
// John Lynch, October 2019
// Based on tutorial at https://socket.io/get-started/chat/

var express = require(`express`);
var app = express();
var http = require(`http`).createServer(app);
var io = require(`socket.io`)(http);

app.use(express.static(__dirname + `/public`));

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on(`connection`, socket => {
  console.log(`Super.   A user connected!`);
  socket.on(`Chia Chat Message`, msg => {
    socket.broadcast.emit(`Chia Chat Message`, msg);
    console.log(`Message: ${msg}`);
  });
  socket.on(`disconnect`, _ => {
    console.log(`Terrible!   A user disconnected!`);
  });
});

http.listen(process.env.PORT || 5000, _ => {
  console.log(`Chia is listening on port 5000.`);
});
