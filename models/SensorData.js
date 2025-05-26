const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
    id: { type: String, required: true },
    temperature: { type: Number, required: true },
    methane: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SensorData", SensorDataSchema);
