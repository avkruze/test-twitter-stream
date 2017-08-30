var connect = require('./connect.js');

var notify = {
    newTweet: function (tweet) {
        console.log(tweet);
        auth.massEmit('newTweet', tweet);
    }
}
function Notify() {
    console.log('start notify');
    io.on('connection', function (socket) {
        // get info about socket from frontend
        var user = null;
        socket.on('auth', function (userId) {
            auth.connect(socket.id, userId);
        });

        socket.on('disconnect', function () {
            auth.disconnect(socket);
        });
    });
    this.__proto__ = notify;
}
module.exports = Notify;
