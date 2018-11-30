const profile = require('./profile/profile.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars

module.exports = function(app) {
  app.configure(profile);
  app.configure(users);
};
