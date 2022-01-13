const { Schema } = require("mongoose");

const MessageSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String,
    time: String,
    index: Number,
});

module.exports = MessageSchema;