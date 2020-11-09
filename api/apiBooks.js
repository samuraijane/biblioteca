module.exports = (app, fetch) => {

  // -----------------------------------------------------------------------------
  //                                     POST
  // -----------------------------------------------------------------------------
  app.post("/api/books", async (req, res) => {
    const { author, title } = req.body;
    const params = `${title ? "title=" + title : ''}${author ? "&author=" + author : ''}`;
    if (!params) {
      res.json({error: "A value for 'title' or 'author' must be present but neither one has a value."})
    } else {
      fetch(`http://openlibrary.org/search.json?${params}&limit=10`)
      .then(result => result.json())
      .then(data => res.json(data));
    }
  });
};