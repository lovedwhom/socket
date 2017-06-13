var express = require('express'),
    app  = express(),
    server = require('http').createServer(app),
    io  = require('socket.io').listen(server),
    users  =[];

app.use('/',express.static(__dirname + '/www'));
server.listen(process.env.PORT || 3000,function(){
    console.log('success')
});

io.sockets.on('connection',function (socket) {
    socket.on('login',function(nickname){
        console.log(nickname);
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess',nickname);
            //所有人都能收到信息
            io.sockets.emit('system', nickname, users.length, 'login');
        }
    });
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });

    socket.on('sendChatMsg',function(msg){
        //自己接收不到消息
        socket.broadcast.emit('newMsg',socket.nickname,msg)
    })
});