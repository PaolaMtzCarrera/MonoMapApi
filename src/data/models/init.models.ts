import mongoose from "mongoose";

const monomapSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    // isEmailSent: {
    //     type: Boolean,
    //     required: false,
    //     default: false
    // },
    genre: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

export const MonoMapModel = mongoose.model('MonoMap', monomapSchema);