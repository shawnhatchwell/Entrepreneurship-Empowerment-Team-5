
/* Dependencies */
var mongoose = require('mongoose'),
    Request = require('../models/requests.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update requests.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the request(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a request */
exports.create = function(req, res) {

  /* Instantiate a Request */
  var request = new Request(req.body);


  /* Then save the request */
  request.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(request);
    }
  });
};

/* Show the current request */
exports.read = function(req, res) {
  /* send back the request as json from the request */
  res.json(req.request);
};

/* Update a request */
exports.update = function(req, res) {
  var request = req.request;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  request.name = req.body.name;
  request.phone = req.body.phone;
  request.emailaddress = req.body.emailaddress;
  request.organization = req.body.organization;
  request.response = req.body.response;
  /* Save the article */
  request.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(request);
    }
  });
};

/* Delete a request */
exports.delete = function(req, res) {
  var request = req.request;

  /** TODO **/
  request.remove(function(err,doc) {
	if(err) {
      console.log(err);
      res.status(400).send(err);
    }
	else{
		 res.json(doc);
	}
  });
  /* Remove the article */
};

/* Retreive all the directory requests, sorted alphabetically by request code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
    Request.find().sort('emailaddress').exec(function(err, result) {
	if (err) {
      console.log(err);
      res.status(400).send(err);
	}
	else{
		res.json(result);
	}
	});
};

/*
  Middleware: find a request by its ID, then pass it to the next request handler.

  Find the request using a mongoose query,
        bind it to the request object as the property 'request',
        then finally call next
 */
exports.requestByID = function(req, res, next, id) {
  Request.findById(id).exec(function(err, request) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.request = request;
      next();
    }
  });
};
