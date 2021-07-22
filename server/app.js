const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const socketServer = require('./socket');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number(port)) return val;

  if (port >= 0) return port;

  return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

socketServer.setSocketServer(server);
