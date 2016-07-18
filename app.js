var express = require('express');
var favicon = require('serve-favicon');
require('dotenv').config();

var app = express();

app.use(express.static('assets'));
app.use(favicon(__dirname + '/assets/favicon/favicon.ico'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/admin', function(req, res) {

    res.render('admin');

});

var server = app.listen(process.env.PORT, function() {
    console.log('App listening on port: ' + server.address().port);

});
