module.exports = (app, ensureAuthenticated) => {

  // -----------------------------------------------------------------------------
  //                                     GET
  // -----------------------------------------------------------------------------
  app.get("/dashboard", ensureAuthenticated, async (req, res) => {
    res.render('pages/dashboard');
  });
};