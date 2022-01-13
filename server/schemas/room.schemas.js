const { Schema } = require("mongoose");

const RoomSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isGroup: { type: Boolean, default: false },
});


module.exports = RoomSchema;