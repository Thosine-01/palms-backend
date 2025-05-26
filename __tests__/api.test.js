const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const SensorData = require("../models/SensorData");

// Setup Express app
const app = express();
app.use(express.json());

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

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await SensorData.deleteMany();
});

test("POST /data/:id - success case", async () => {
    const res = await request(app)
        .post("/data/sensor123")
        .send({ temperature: 25.5, methane: 10.2 });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Data saved successfully");

    const savedData = await SensorData.findOne({ id: "sensor123" });
    expect(savedData.temperature).toBe(25.5);
    expect(savedData.methane).toBe(10.2);
});

test("POST /data/:id - failure when data is invalid", async () => {
    const res = await request(app)
        .post("/data/sensor123")
        .send({ temperature: "not a number", methane: 10.2 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("temperature and methane must be numbers");
});
