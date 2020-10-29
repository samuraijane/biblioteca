
// This function has the signature of Express (aka Connect) middleware
// If the User is not logged in, they will get redirected to the login page
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/')
}

module.exports = (app) => {

  // -----------------------------------------------------------------------------
  //                                     GET -> rendered homepage
  // -----------------------------------------------------------------------------
  app.get("/dashboard", ensureAuthenticated, async (req, res) => {
    res.send("<h1>You're Logged in</h1>")
  });
};