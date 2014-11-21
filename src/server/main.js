var io = require('socket.io').listen(8080);

console.log('---------------------------------------');

//关闭debug信息（心跳信息等）
io.set('log level', 1);

var birdsList = {};

//客户端接入
io.sockets.on('connection', function (socket) {
    'use strict';

    var id = socket.id;
    console.log(id);

    // 数据结构
    birdsList[id] = {
        id: id,
        x: 0,
        y: 0,
        offsetX: 0,
        rotate: 0
    };

    socket.emit('getId', {
        id: id
    });

    socket.on('update', function(data) {
        birdsList[socket.id] = data;
        socket.broadcast.emit('update', {
            data: data
        });
    });

    socket.on('disconnect', function () {
       console.log( 'close --- '+ socket.id );
       delete birdsList[socket.id];
    });

});

function merge(obj, obj) {
    for (var key in obj) {

    }
}
