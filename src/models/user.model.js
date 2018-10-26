// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  
  const user = new Schema(
    {
    email:    { unique: [true, 'Email already exists'],    
      type: String,  
      Required:  [true, 'Email address cannot be left blank.'],
      validate: [ validateEmail, 'Please fill a valid email address'],
                  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      },
  
    password: { type: String , 
                required: [true,  'Password cannot be left blank']}
    },
    
    {
      timestamps: true
    }
  );

  return mongooseClient.model('user', user);
};
