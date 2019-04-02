//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://dbuser:user123@ds151602.mlab.com:51602/eeemails', //place the URI of your mongo database here.
	uriR: 'mongodb://dbuser:user123@ds151602.mlab.com:51602/resources'
  }
};
