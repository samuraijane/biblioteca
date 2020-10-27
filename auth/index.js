module.exports = (app) => {

  // -----------------------------------------------------------------------------
  //                                     GET
  // -----------------------------------------------------------------------------
  app.get('/auth/github', (req, res) => {
    console.log('also trying to login');
    res.json({
      data: "trying to login"
    })
  });
};