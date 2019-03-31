//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://willcosker:dbpass123@ds041992.mlab.com:41992/bootcamp3wcosker', //place the URI of your mongo database here.
  },
  port: 8080 || process.env.PORT
};
