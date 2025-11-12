require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log(" MongoDB Connected Successfully!");

        // Database reference
        const database = client.db("pawmart");
        const listingsCollection = database.collection("listings");
        const ordersCollection = database.collection("orders");

        console.log(" PawMart Database Ready!");

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}
run().catch(console.dir);

// Routes
app.get('/', (req, res) => {
    res.json({
        message: ' PawMart Server is Running!',
        database: 'Connected to MongoDB Atlas',
        status: 'Active'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});