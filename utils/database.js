'use strict';

// Database management utilities

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Change this to your MongoDB URL
const dbName = 'yourDatabase'; // Change this to your database name

const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to database');
        return client.db(dbName);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        throw error;
    }
}

async function closeDB() {
    await client.close();
    console.log('Database connection closed');
}

module.exports = { connectDB, closeDB };