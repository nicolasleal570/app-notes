const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
    // Modelo de datos para los usuarios
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Encriptando la password
userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10); // Creando un hash
    const hash = bcrypt.hash(password, salt); // Encriptando la password

    return hash;
};

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password); // Comparando la password encriptada y la original
};

module.exports = mongoose.model("User", userSchema);
