const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('startup');
const userCollection = db.collection('user');
const hikerStatusCollection = db.collection('hikerStatus');
const hikerLogCollection = db.collection('hikerLog');

//Test the connection
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({email: email});
}

function getUserByToken(token) {
  return userCollection.findOne({token: token});
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return user;
}

async function getHikerStatus() {
  return await hikerStatusCollection.find().toArray(); 
} 

async function updateHikerStatus(newStatus) { 
  const { name } = newStatus; 
  const result = await hikerStatusCollection.updateOne( 
    { name }, 
    { $set: newStatus }, 
    { upsert: true } 
  ); 
  return result; 
}

async function getHikerLogs(userName) {
  return await hikerLogCollection.find({userName}).toArray()
}

async function saveHikerLog(userName, hikeLog) {
  await hikerLogCollection.updateOne(
    {userName},
    {$set: {hikeLog}},
    {upsert: true}
  );
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getHikerStatus,
  updateHikerStatus,
  getHikerLogs,
  saveHikerLog,
};
