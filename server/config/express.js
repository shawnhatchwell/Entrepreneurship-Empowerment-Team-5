var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');
    eventsRouter = require('../routes/events.server.routes');
	resourcesRouter = require('../routes/resources.server.routes'),
  adminRouter = require('../routes/admintest.routes');

module.exports.init = function() {
  //connect to database
  var connect = mongoose.connect(config.db.uri, {useMongoClient : true});
  //var connectR = mongoose.connect(config.db.uriR, {useMongoClient : true});

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));


  /**TODO
  Serve static files */
  app.use(express.static(path.join(__dirname, '../../client')));


  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter);
  app.use('/api/events', eventsRouter);
  app.use('/api/resources', resourcesRouter);
  app.use('/admin', adminRouter);

  /**TODO
  Go to homepage for all routes not specified */
  app.all('*', function (req, res, next){
	  res.sendFile('client/index.html');
  });

  return app;
};
