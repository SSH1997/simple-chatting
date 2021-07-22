const express = require('express');

const socketServer = require('../socket/index').getSocketServer();

const router = express.Router();

router.post('/', (req, res) => {
  socketServer.emit('newChat', req.body);
  res.send({ 1: 1 });
});

module.exports = router;
