const express = require('express');
const uuid = require('uuid');
const app = express();

app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let users = {};
let hikerStatus = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;



apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
  });
  
  // GetAuth login an existing user
  apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      if (req.body.password === user.password) {
        user.token = uuid.v4();
        res.send({ token: user.token });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth logout a user
  apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// GetHikerStatus
apiRouter.get('/hikerStatus', (_req, res) => {
    res.send(hikerStatus);
  });
  
// UpdateHikerStatus
apiRouter.post('/status', (req, res) => {
    hikerStatus = updateHikerStatus(req.body, hikerStatus);
    res.send(hikerStatus);
  });

  function updateHikerStatus(newStatus, hikerStatus) {
    // Check if the user already exists in the list
    const existingStatusIndex = hikerStatus.findIndex(status => status.name === newStatus.name);
    if (existingStatusIndex !== -1) {
      // Update existing hiker status
      hikerStatus[existingStatusIndex] = newStatus;
    } else {
      // Add new hiker status
      hikerStatus.push(newStatus);
    }
    return hikerStatus;
  }



