module.exports = (app, ensureAuthenticated) => {

  // -----------------------------------------------------------------------------
  //                                     GET
  // -----------------------------------------------------------------------------
  app.get("/search", ensureAuthenticated, async (req, res) => {
    res.render('pages', {template: 'search'});
  });
};