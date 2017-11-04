var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

app.use(express.static(__dirname + '/public'));

var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', { fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js' });
});


app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function (req, res) {
    res.render('tours/oregon-coast');
});


app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

app.get('/headers', function (req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) {
        s += name + ': ' + req.headers[name] + '\n';
    }
    res.send(s);
});

app.get('/greeting', function (req, res) {
    res.render('about', {
        message: 'welcome',
        style: req.query.style,
        userid: req.cookie.userid,
        username: req.session.username
    });
});


app.get('/no-layout', function (req, res) {
    res.render('no-layout', { layout: 'custom' });
});

app.get('custom-layout', function (req, res) {
    res.render('custom-laout', { layout: 'custom' });
});

app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});


app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + ' ; press Ctrl+C to terminate.');
});