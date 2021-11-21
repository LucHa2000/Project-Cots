const express = require('express')
const path =require('path')
const morgan = require('morgan')
const session = require('express-session');
const flash = require('connect-flash'); //flash session
const cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
const app = express()
const bodyParser = require('body-parser')
const mysql =require('mysql')
const route =  require('./routes')
const port = process.env.PORT || 5000
const server = require('http').Server(app);
const io = require('socket.io')(server)
const nodemailer = require('nodemailer');
require('dotenv').config()

//parsing middleware
//parse application/s-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
); 
app.use(cookieParser()); // use cookie
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 180 * 60 * 1000,
      secure: false,
    },
  }),
);
app.use(flash());

app.use(morgan('combined'))
//parse application/json
app.use(express.json());
//template Engine
//app.engine('hbs',exphbs({extname: '.hbs'}))
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs', //config hbs
    helpers: require('./helpers/hbs'),
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
server.listen(port, () => {
  console.log(` Server run at http://localhost:${port}`)
})
// Router
route(app)