/*
 *  create a new profile, and assign it's id to context.data.profile
 */
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const createUserProfile = async context => {
  const profileService = context.app.service('profile');
  const { username } = context.data;

  const newProfile = await profileService.create({ username });
  context.data.profile = newProfile._id;
  return context;
};

const removeUserProfile = async context => {
  const profileService = context.app.service('profile');
  const { profile: profileId } = context.result;

  await profileService.remove(profileId);
  return context;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [// Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [removeUserProfile]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
