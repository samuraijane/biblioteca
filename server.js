require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const passport = require('passport');
const session = require('express-session')

const apiBooks = require('./api/apiBooks');
const apiHeartbeat = require('./api/apiHeartbeat');
const auth = require('./auth');
const gitHubStrategy = require('./auth/strategy/github');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(session({
  secret: "super secret",
  cookie: {maxAge: 60000}
}))
app.use(passport.initialize());
app.use(passport.session());

// strategies
passport.use(gitHubStrategy);

app.use('/css', express.static(__dirname + "/css"));
app.use('/js', express.static(__dirname + "/js"));

app.get('/', (req, res) => {
  res.render('pages/index')
});

apiBooks(app, fetch);
apiHeartbeat(app);
auth(app, passport);

app.listen(process.env.PORT, () => {
  console.log(`The server is running at port ${process.env.PORT}`);
});