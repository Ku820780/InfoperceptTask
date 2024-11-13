import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Pass mongoose to mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',     // Field to auto-increment
    id: 'ticketNums',        // Counter ID in the database
    start_seq: 500           // Starting sequence value
});

export const Note = mongoose.model('Note', noteSchema);
