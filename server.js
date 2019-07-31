const express = require('express');

const server = express();

const cors = require('cors')
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');


server.use(cors());
server.use(logger);
server.use('/api/user', postRouter);
server.use('/api/user', userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
server.get('/api/posts', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

function logger(req, res, next) {

  const now = new Date().toISOString();
  // response.send(now);

console.log(`${req.method}, ${req.url}, ${now} `)
next();
};




module.exports = server;
