const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const fs = require('fs');

const routes = require('./routes');

// This line is from the Node.js HTTPS documentation.
const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
};

const app = express();
const server = https.createServer(options, app).listen(443);
const io = socketio(server);

mongoose.connect('mongodb+srv://openroom:openroom@open-room-4n209.mongodb.net/openroom?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

// Creates the socket.io connection for real time actions
io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

// adds socket.io to a middleware, so the params and the connected users 
//are available in the whole app.
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);