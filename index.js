const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SensorData = require("./models/SensorData");

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
    .connect(String(process.env.MONGODB_URI), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post("/data/:id", async (req, res) => {
    const { temperature, methane } = req.body;
    const { id } = req.params;

    if (typeof temperature !== "number" || typeof methane !== "number") {
        return res
            .status(400)
            .json({ error: "temperature and methane must be numbers" });
    }

    try {
        const newData = new SensorData({ id, temperature, methane });
        await newData.save();
        res.status(201).json({ message: "Data saved successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save data" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
