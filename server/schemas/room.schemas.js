const { Schema } = require("mongoose");

const UserSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  message: [
    { message:String , user: { type: Schema.Types.ObjectId, ref: 'User' }, _id : false  }

  ],
  isGroup: Boolean,
  // Subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});

module.exports = UserSchema;