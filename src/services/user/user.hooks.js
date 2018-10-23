/*
 *  create a new profile, and assign it's id to context.data.profile
 */
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
    create: [createUserProfile],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
