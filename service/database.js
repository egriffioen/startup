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

// async function getHikerLogs(userName) {
//   return await hikerLogCollection.find({userName}).toArray()
// }

// async function getHikerLogs(userName) { 
//   try { 
//     console.log(`Querying hiker logs for userName: ${userName}`); 
//     // Add logging 
//     const logs = await hikerLogCollection.find({ userName }, { projection: { _id: 0, hikeLog: 1 } }).toArray();
//     console.log(`Found logs: ${JSON.stringify(logs)}`); // Add logging 
//     return logs; 
//   } catch (error) { 
//     console.error('Error querying hiker logs:', error); // Add error logging 
//     throw error; 
//   } 
// }


// async function saveHikerLog(userName, newHike) {
//   const userLogs = await hikerLogCollection.findOne({userName});
//   if (userLogs) {
//     await hikerLogCollection.updateOne(
//       {userName},
//       {$push: {hikerLog: newHike}}
//     );
//   } else {
//     await hikerLogCollection.insertOne({userName, hikerLog: [newHike]});
//   }
  
// }

// Save new hike logs for a user
async function saveHikerLog(userName, hikeLog) {
  
  // Find the user by username and update their hike log array
  const result = await hikerLogCollection.updateOne(
    { userName }, // Match the user by username
    { $push: { hikeLog: { $each: [hikeLog] } } }, // Add the new hike log(s) to the existing array
    {upsert: true}
  );

  return result;
}

// Fetch hike log based on username (this is used in the /logs route)
async function getHikerLogs(userName) {
  // Find the user and only return the `hikeLog` field, excluding the `_id`
  const user = await hikerLogCollection.findOne(
    { userName }, // Match by the username
    //{ projection: { _id: 0, hikeLog: 1 } } // Only return `hikeLog`, exclude `_id`
    //{ hikeLog }
  );
  
  return user ? user.hikeLog : [];
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
