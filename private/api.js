/**
 * Created by user on 04.07.17.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/test-tweet', function (req, res) {
    notify.newTweet(req.body);
    res.status(200);
    res.send();
});

app.listen(8003);