// code away!
require('dotenv').config();
const server = require('./server');



// server.use('api/posts', server);

const port = process.env.PORT ;

server.listen(port, ()=> {

console.log(`server listening on http://localhost:${port}`);


});