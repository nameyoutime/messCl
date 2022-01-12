const { Schema } = require("mongoose");

const UserSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  message: [
    {text:String}

  ],
  isGroup:Boolean,
  // Subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});

module.exports = UserSchema;