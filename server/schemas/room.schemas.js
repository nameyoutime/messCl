const { Schema } = require("mongoose");

const RoomSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  message: [
    { message:String , user: { type: Schema.Types.ObjectId, ref: 'User' },time:String,index:Number}

  ],
  isGroup: { type: Boolean, default: false },
  
  // Subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});


module.exports = RoomSchema;