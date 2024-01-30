const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject Information"
        },
    ],
});

const Class = mongoose.model("Class Information", classSchema);

module.exports = Class;
