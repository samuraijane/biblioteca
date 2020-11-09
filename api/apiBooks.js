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

  // -----------------------------------------------------------------------------
  //                                     POST
  // -----------------------------------------------------------------------------
  app.post("/api/books/:id", async (req, res) => {
    const { bookID } = req.body;
    if (!bookID) {
      res.json({error: "A value for 'bookID' must be present but it is missing."})
    } else {
      fetch(`http://openlibrary.org/works/${bookID}.json`)
      .then(res.json({message: `The book with ID ${bookID} has been found at the Open Library API.`}))
      .catch(err => res.json({ERROR: `The following error has occurred: ${err}`}));
    }
  });

};