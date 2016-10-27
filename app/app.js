const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const checkinRouter = require('./routes/checkinRouter');
const authRouter = require('./routes/authRouter');
const authentication = require('./middleware/authentication');
const session = require('express-session');

const app = express();
const GoogleGeocode = require('./GoogleGeocode');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: true,
}));

app.use(morgan('dev'));

app.use('/api', authentication);
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/checkins', checkinRouter);

app.get('/geocode/:latitude/:longitude', (request, response) => {
  const geocodeBot = new GoogleGeocode();
  geocodeBot.getGeocode(request.params.latitude, request.params.longitude)
            .then((geocodeData) => {
              response.status(200).send(geocodeData)
            });
});
app.get('/restaurant/:latitude/:longitude', (request, response) => {
  const geoplaceBot = new GoogleGeocode();
  geoplaceBot.getRestaurant(request.params.latitude, request.params.longitude)
            .then((geocodeData) => {
              response.status(200).send(geocodeData)
            });
});
app.get('/touristspot/:latitude/:longitude', (request, response) => {
  const geospotBot = new GoogleGeocode();
  geospotBot.getTouristSpot(request.params.latitude, request.params.longitude)
            .then((geocodeData) => {
              response.status(200).send(geocodeData)
            });
});
app.get('/todo/:latitude/:longitude', (request, response) => {
  const geodoBot = new GoogleGeocode();
  geodoBot.getToDo(request.params.latitude, request.params.longitude)
            .then((geocodeData) => {
              response.status(200).send(geocodeData)
            });
});

module.exports = app;
