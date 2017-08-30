/**
 * Created by user on 08.06.17.
 */
global.io = require('socket.io').listen(8303);
global.auth = require('./auth.js');
global.Notify = require('./notify.js');

var api = require('./api.js');

notify = new Notify(io);