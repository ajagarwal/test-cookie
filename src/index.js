const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const app = express();
const port = 3008;

const myLogger = function analyticsLogger(req, res, next) {
  console.log('Request IP: ' + req.url);
  console.log('Requested for resource: ' + req.url);
  next();
};

app.use(myLogger);
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.setHeader('Set-Cookie', 'hello=123');
  res.setHeader('Content-Type', 'application/json');
  res.cookie('val', uuid.v4(), {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  });
  res.send('{"value": "Hello World!"}');
});

app.get('/hello', (req, res) => {
  console.log(req.headers);
  console.log(req.cookies);
  res.setHeader('Content-Type', 'application/json');
  res.send(`{"val": "1234"}`);
});

app.get('/redi', (req, res) => {
  res.cookie('redir-val', uuid.v4(), { sameSite: 'none', secure: true });
  res.redirect('http://127.0.0.1:5500/src/');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
