const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
    // Modelo de datos para las notas
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = mongoose.model("Note", noteSchema);
