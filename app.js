var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressHandlebar = require('express-handlebars').create({
	partialsDir: path.join(__dirname, 'views/partials'), 
	defaultLayout: 'main',
	layoutDir: path.join(__dirname, 'views/layouts'),
	extname: '.hbs',
	helpers: {
		currTime: function () {
	    	 var datetime = require('node-datetime');
	    	 var now = datetime.create(datetime.create().now());
	    	 var formatted = now.format('m/d/Y H:M:S');
	    	 
	    	 return formatted;
		}
	}
});

var home = require('./routes/home');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHandlebar.engine);

app.set('view engine', '.hbs');
app.enable('view cache');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
    console.log('Express server has started on port ' + port + '...');
});

module.exports = app;
