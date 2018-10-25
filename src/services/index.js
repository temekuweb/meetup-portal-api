const profile = require('./profile/profile.service.js');
const user = require('./user/user.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars

module.exports = function(app) {
  app.configure(profile);
  app.configure(user);
  app.configure(users);
};
