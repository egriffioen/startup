// debug.js 
const { MongoClient } = require('mongodb'); 
const config = require('./dbConfig.json'); 
const { userName, password, hostname } = config; 
const url = `mongodb+srv://${userName}:${password}@${hostname}`; 
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('startup'); 
const hikerLogCollection = db.collection('hikerLogs'); 
(async function fetchLogs() { 
    try { 
        await client.connect(); 
        const logs = await hikerLogCollection.find().toArray(); 
        console.log(logs); 
        await client.close(); 
    }   catch (error) { 
        console.error('Error fetching logs:', error);
    } 
})();