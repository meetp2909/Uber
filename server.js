

const app = require('./app');
const http = require('http');
const Port = process.env.PORT || 4000;
const server = http.createServer(app);




server.listen(Port,()=>{
    console.log(`Server is running on ${Port}`)
})
