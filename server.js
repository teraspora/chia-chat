// Test Chat app using socket.io
// John Lynch, October 2019
// Based on tutorial at https://socket.io/get-started/chat/

const express = require(`express`);
const app = express();
const http = require(`http`).createServer(app);
const io = require(`socket.io`)(http);
const port = process.env.PORT || 5000;

// scripts/ and styles/ dirs go in here but referenced  without'public'
app.use(express.static(__dirname + `/public`));

// Root route
app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle user connecting
io.on(`connection`, socket => {
  console.log(`Super.   A user connected!`);
  socket.on(`Chia Chat Message`, msg => {
    socket.broadcast.emit(`Chia Chat Message`, msg);  // broadcast sends to all *other* connections
    console.log(`Message: ${msg}`);
  });
  socket.on(`disconnect`, _ => {
    console.log(`Terrible!   A user disconnected!`);
  });
});

http.listen(port, _ => {
  console.log(`Chia is now listening on port ${port}.`);
});
