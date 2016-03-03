'use strict';

const express = require('express');
const app = express();
const pg = require('pg').native;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://localhost:5432/nodechat';
const db = new pg.Client(POSTGRES_URL);

app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chats', (req, res) => {
  db.query('SELECT * FROM chats', (err, result) => {
    console.log('>>>>>', result.rows);

    if (err) throw err;

    res.send(result.rows);
  });
});

db.connect((err) => {
  if (err) throw err

  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  });
});

io.on('connection', (socket) => {
  console.log('connection', socket);

  socket.on('sendChat', (msg) => {
    console.log(msg);
    socket.broadcast.emit('receiveChat', msg);

  });

});

