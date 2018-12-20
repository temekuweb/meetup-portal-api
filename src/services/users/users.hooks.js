const { authenticate } = require('@feathersjs/authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const globalHooks = require('../../hooks');
const commonHooks = require('feathers-hooks-common');
const accountService = require('../authmanagement/authmanagement.service');

const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;

const sendVerificationEmail = require('../../hooks/send-verification-email');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword(), verifyHooks.addVerification()],
    update: [commonHooks.disallow('external')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      context => {
        accountService(context.app).notifier(
          'resendVerifySignup',
          context.result
        );
      },
      verifyHooks.removeVerification()
    ],
    update: [],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ),
        hashPassword(),
        authenticate('jwt')
      )
    ],
    remove: [authenticate('jwt')]
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
