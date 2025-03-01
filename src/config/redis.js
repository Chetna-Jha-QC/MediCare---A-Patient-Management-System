const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
    url: process.env.REDIS_URL,
});

client .connect().then(() => {
    console.log("Connected to Redis Successfully");
}). catch((error) => {
    console.error("Redis Connection Error", error);
});

module.exports = client;