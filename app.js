const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.render('index', {title: 'Home'});
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});


app.post('/contact', function (req, res) {    
  let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'datsyk.test@gmail.com',
    pass: 'EmbYgsVkv2u4KtE'
  }
  });

  let mailOptions = {
  from: 'datsyk.edu@gmail.com',
  to: req.body.email,   //Отправка на почту введенную в форме, поле email
  subject: req.body.name,  // в теме имя с формы поле name
  text: req.body.text     // берем сообщение  c textarea
  }

  transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log('Mail not sent');
    } else {
        console.log('Mail sent');
    }
  });

  res.redirect('/contact');

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
