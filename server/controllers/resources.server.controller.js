
/* Dependencies */
var mongoose = require('mongoose'),
    Resource = require('../models/resources.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update resources.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the resource(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a resource */
exports.create = function(req, res) {

  /* Instantiate a Resource */
  var resource = new Resource(req.body);


  /* Then save the resource */
  resource.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(resource);
    }
  });
};

/* Show the current resource */
exports.read = function(req, res) {
  /* send back the resource as json from the request */
  res.json(req.resource);
};

/* Update a resource */
exports.update = function(req, res) {
  var resource = req.resource;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  resource.citation = req.body.citation;
  resource.url = req.body.url;
  resource.category = req.body.category;
  /* Save the article */
  resource.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(resource);
    }
  });
};

/* Delete a resource */
exports.delete = function(req, res) {
  var resource = req.resource;

  /** TODO **/
  resource.remove(function(err,doc) {
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

/* Retreive all the directory resources, sorted alphabetically by resource code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
    Resource.find().sort('code').exec(function(err, result) {
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
  Middleware: find a resource by its ID, then pass it to the next request handler.

  Find the resource using a mongoose query,
        bind it to the request object as the property 'resource',
        then finally call next
 */
exports.resourceByID = function(req, res, next, id) {
  Resource.findById(id).exec(function(err, resource) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.resource = resource;
      next();
    }
  });
};
