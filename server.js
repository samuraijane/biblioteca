const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/heartbeat', (req, res) => {
  res.json({
    is: "working"
  })
});

app.listen(3001, () => {
  console.log('The server is running at port 3001');
});