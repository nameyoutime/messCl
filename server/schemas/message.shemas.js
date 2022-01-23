const { Schema } = require("mongoose");

const MessageSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    image: String,
    reply: { type: Schema.Types.ObjectId, ref: 'Message' },
    date: Number
});

module.exports = MessageSchema;