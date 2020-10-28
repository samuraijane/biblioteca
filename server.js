require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

const apiBooks = require('./api/apiBooks');
const apiHeartbeat = require('./api/apiHeartbeat');

const app = express();

app.use(bodyParser.json());

app.use('/css', express.static(__dirname + "/css"));
app.use('/js', express.static(__dirname + "/js"));
app.use('/', express.static(__dirname + "/public"));

apiBooks(app, fetch);
apiHeartbeat(app);

app.listen(process.env.PORT, () => {
  console.log(`The server is running at port ${process.env.PORT}`);
});