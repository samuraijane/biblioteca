const GitHubStrategy = require('passport-github').Strategy
const passport = require('passport')
const User = require('../../models').User;

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.GH_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // check to see if user already exists in the database
    let user = await User.findOne({where: { gitHubID: parseInt(profile.id) }})

    if(!user) {
      user = await User.build({
        gitHubID: parseInt(profile.id),
        gitHubUsername: profile.username,
        createAt: new Date(),
        updatedAt: new Date()
      })
      await user.save();
    }
    cb(null, user)
  }
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const user = await User.findByPk(id)
  done(null, user);
});

module.exports = gitHubStrategy;