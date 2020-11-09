module.exports = (app, fetch) => {
  const ApiBook = require('../models').ApiBook;

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
      .then(result => result.json())
      .then(data => saveBook(data, bookID))
      .then(message => res.json({message}))
      .catch(err => res.json({ERROR: `The following error has occurred: ${err}`}));
    }

    async function saveBook(data, id) {
      const book = await ApiBook.findOne({where: { apiBookID: id }});
      if(!book && id === data.key.substr(data.key.lastIndexOf('/') + 1)) {
        await ApiBook.create({
          apiBookID: id,
          apiSource: 'Open Library API',
          createAt: new Date(),
          updatedAt: new Date()
        })
        return `The book with ID ${id} has been successfully saved to your library.`;
      } else {
        return `The book with ID ${id} is already a part of your library.`;
      }
    }

  });

};