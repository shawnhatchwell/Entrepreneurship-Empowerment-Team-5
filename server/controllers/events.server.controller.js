/* Dependencies */
var mongoose = require('mongoose'),
    Event = require('../models/events.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update events.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the event(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a event */
exports.create = function(req, res) {

  /* Instantiate a Event */
  var event = new Event(req.body);


  /* Then save the event */
  event.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(event);
    }
  });
};

/* Show the current event */
exports.read = function(req, res) {
  /* send back the event as json from the request */
  res.json(req.event);
};

/* Update a event */
exports.update = function(req, res) {
  var event = req.event;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  event.emailaddress = req.body.emailaddress;
  event.name = req.body.name;
  event.address = req.body.address;
  event.event = req.body.event;
  event.start = req.body.start;
  event.end = req.body.end;
  event.description = req.body.description;
  /* Save the article */
  event.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(event);
    }
  });
};

/* Delete a event */
exports.delete = function(req, res) {
  var event = req.event;

  /** TODO **/
  event.remove(function(err,doc) {
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

/* Retreive all the directory events, sorted alphabetically by event code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
    Event.find().sort('code').exec(function(err, result) {
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
  Middleware: find a event by its ID, then pass it to the next request handler.

  Find the event using a mongoose query,
        bind it to the request object as the property 'event',
        then finally call next
 */
exports.eventByID = function(req, res, next, id) {
  Event.findById(id).exec(function(err, event) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.event = event;
      next();
    }
  });
};
exports.approve = function(req, res) {
  console.log('it works homie');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function listEvents(auth) {
  const calendar = google.calendar({
    version: 'v3',
    auth
  });
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
  console.log('testadd');
  var event = {
    'summary': req.body.name,
    'location': req.body.address,
    'description': req.body.description,
    'start': {
      'dateTime': req.body.start,
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': req.body.end,
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=1'
    ],
    'attendees': [{
      'email': req.body.emailaddress
    }, ],
    'reminders': {
      'useDefault': false,
      'overrides': [{
          'method': 'email',
          'minutes': 24 * 60
        },
        {
          'method': 'popup',
          'minutes': 10
        },
      ],
    },
  };
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.data.htmlLink);
  });
}
res.json(req.event);
};
