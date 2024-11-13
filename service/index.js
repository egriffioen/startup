const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let hikerlevels = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.get('*', (_req, res) => {
  res.send({ msg: 'Startup service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

