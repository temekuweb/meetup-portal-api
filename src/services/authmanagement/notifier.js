module.exports = function(app) {
  const emailConfig = app.get('emailconfig');

  function getLink(type, hash) {
    const url = 'http://localhost:3030/' + type + '?token' + hash;
    return url;
  }

  function sendEMail(email) {
    return app
      .service('mailer')
      .create(email)
      .then(function(result) {
        console.log('Sent email'.result);
      })
      .catch(err => {
        console.log('Error sending email', err);
      });
  }

  return {
    notifier: function(type, user, notifierOptions) {
      let tokenLink;
      let email;
      switch (type) {
        case 'resendVerifySignup': //sending the user the verification email
          tokenLink = getLink('verify', user.verifyToken);
          email = {
            from: emailConfig.GMAIL,
            to: user.email,
            subject: 'Verify Signup',
            html: tokenLink
          };
          return sendEMail(email);
          break;

        case 'verifySignup': // confirming verification
          tokenLink = getLink('verify', user.verifyToken);
          email = {
            from: emailConfig.GMAIL,
            to: user.email,
            subject: 'Confirm Signup',
            html: 'Thanks for verify your email'
          };
          return sendEMail(email);
          break;

        case 'sendResetPwd':
          tokenLink = getLink('reset', user.resetToken);
          email = {};
          return sendEMail(email);
          break;

        case 'passwordChange':
          email = {};
          return sendEMail(email);
          break;

        case 'identifyChange':
          tokenLink = getLink('verifyChange', user.verifyToken);
          email = {};
          return sendEMail(email);
          break;

        default:
          break;
      }
    }
  };
};
