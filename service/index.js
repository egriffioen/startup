const express = require('express');
const uuid = require('uuid');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Endpoint to fetch the logged-in user's info
secureApiRouter.get('/auth/user', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    res.send({ name: user.email.split('@')[0] }); // Assuming the username is part of the email
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// GetHikerStatus from the database
secureApiRouter.get('/hikerStatus', async (req, res) => {
  const hikerStatus = await DB.getHikerStatus();
  res.send(hikerStatus);
});

// UpdateHikerStatus in the database
secureApiRouter.post('/status', async (req, res) => {
  console.log('Received hiker status update:', req.body);
  await DB.updateHikerStatus(req.body);
  const hikerStatus = await DB.getHikerStatus();
  res.send(hikerStatus);
});

// GetHikerLog
secureApiRouter.get('/logs', async (req, res) => {
  const userName = req.query.userName;
  try {
    console.log('Received request for logs');
    const hikerLogs = await DB.getHikerLogs(userName);
    console.log('Found logs:', hikerLogs);
    res.send(hikerLogs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Save a New Log in the Database
secureApiRouter.post('/hikeLog', async (req, res) => {
  const { userName, hikeLog } = req.body;
  console.log('Received hiker log:', req.body);
  await DB.saveHikerLog(userName, hikeLog);
  res.status(200).send({ msg: 'Hiker log saved successfully' });
});

app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
