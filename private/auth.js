var auth = {
    sockets: {},
    connect: function (socketId, userId) {
        console.log(socketId, userId);
        var sockets = this.sockets;
        if (sockets.userId) {
            console.log(sockets[userId]+'sdftg123');
            sockets[userId].push(socketId);
        } else {
            sockets[userId] = [socketId];
            console.log(sockets[userId]+'31');
        }
    },
    disconnect: function (socketId) {
        socketId = socketId.id;
        var isFinish = false;
        var sockets = this.sockets;
        for (var userId in sockets) {
            sockets[userId].forEach(function (socket, usersI) {
                if (socket == socketId) {
                    delete sockets[userId][usersI];
                    this.sockets = sockets;
                    isFinish = true;
                    return 0;
                }
            }.bind(this));
            if (isFinish)return;
        }
    },
    emit: function (name, data, users) {
        var sockets = this.sockets;
        users.forEach(function (userId) {
            if (sockets[userId])
                sockets[userId].forEach(function (socketId) {
                   io.sockets.sockets[socketId].emit(name, data);
                });
        });
    },
    massEmit: function (name, data) {
        var sockets = this.sockets;
        io.sockets.emit(name, data);
    }
};
module.exports = auth;
