# 📡 Sensor Data API

An Express.js server that stores environmental sensor data (`temperature` and `methane`) linked to an `id` into a MongoDB database using Mongoose.

---

## 🔧 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/palms-bio/palms-backend.git
cd palms-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/palms-db
```

If you're using MongoDB Atlas, replace MONGODB_URI with your cloud connection string.

## 🚀 Running the Server

```bash
npm run dev
# or
npm start
```

Server will run on: http://localhost:3000

## 📥 API Endpoints

### ➕ POST /api/sensor-data

Store sensor data.

Request Body (JSON):

```json
{
    "temperature": 25.5,
    "methane": 10.2
}
```

Response (Success):

```json
{
    "_id": "65f2e8b7c261e6001234abcd",
    "temperature": 25.5,
    "methane": 10.2,
    "timestamp": "2024-03-13T12:34:56.789Z"
}
```

Response (Error):

```json
{
    "error": "Temperature and methane values are required"
}
```

### 📋 GET /api/sensor-data

Retrieve all sensor data records, sorted by timestamp in descending order.

Response (Success):

```json
[
    {
        "_id": "65f2e8b7c261e6001234abcd",
        "temperature": 25.5,
        "methane": 10.2,
        "timestamp": "2024-03-13T12:34:56.789Z"
    }
    // ... more records
]
```

## 🧪 Testing the API

You can test the API using the provided test script:

```bash
npm run test:demo
```

Or use cURL:

```bash
# POST request
curl -X POST http://localhost:3000/api/sensor-data \
  -H "Content-Type: application/json" \
  -d '{"temperature": 22.4, "methane": 8.9}'

# GET request
curl http://localhost:3000/api/sensor-data
```

## 📁 Project Structure

```
.
├── .env                 # Environment variables
├── server.js           # Main server file
├── test.js            # API test script
├── package.json       # Project configuration
└── README.md         # This file
```

## ✅ Requirements

-   Node.js >= 14
-   MongoDB (local or Atlas)
-   npm or yarn

## 📦 Dependencies

-   express: Web framework
-   mongoose: MongoDB object modeling
-   dotenv: Environment variable management
-   cors: Cross-origin resource sharing
-   nodemon: Development server with auto-reload
-   axios: HTTP client (for testing)
