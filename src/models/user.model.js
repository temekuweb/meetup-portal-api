// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const user = new Schema(
    {
      username: { type: String, required: true, unique: true },
      fullname: { type: String, required: true },
      profile: {
        type: Schema.Types.ObjectId,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('user', user);
};
