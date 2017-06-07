
var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

//这种写法如果引入socket.io无法启动服务
// server.listen(8082);

//必须按下面这种写法才能正常启动
server.listen(3000, function(){
    console.log('listening on *:3000');
});



app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        socket.emit('msg', { hello: 'world' });
        console.log(data);
    });
    socket.on('sendMsg',function(data){
        socket.emit('news', { hello: 'world' });
        console.log(data);
    });
    socket.on('disconnet',function () {
        io.sockets.emit('user disconnected');
    })
});

// 'use strict'
//
// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res)=> {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hello world');
// });
//
// server.listen(port, hostname, ()=> {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

