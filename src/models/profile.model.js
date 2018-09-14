// profile-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  require('mongoose-schema-jsonschema')(mongooseClient);
  const { Schema } = mongooseClient;
  const profile = new Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true }
  }, {
    timestamps: true
  });
  const Model = mongooseClient.model('profile', profile);
  return { Model, Schema: profile };
};
