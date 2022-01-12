const { Schema } = require("mongoose");

const UserSchema = new Schema({
  displayName: String,
  email: String,
  photoURL: String,
  uid: String,
  friends: [{
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    friend: { type: Schema.Types.ObjectId, ref: 'User' }, _id : false 
  }],
  req: [
    { type: Schema.Types.ObjectId, ref: 'User' } 
  ]
  // Subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});

module.exports = UserSchema;