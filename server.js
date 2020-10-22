const express = require('express');

const app = express();

app.get('/heartbeat', (req, res) => {
  res.json({
    is: "working"
  })
});

app.listen(3001, () => {
  console.log('The server is running at port 3001');
});