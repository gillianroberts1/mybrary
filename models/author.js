const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

authorSchema.pre('deleteOne', { document: true }, async function(next) {
  try {
    console.log('Pre-delete hook executing for author:', this._id);
    const books = await Book.find({ author: this._id });
    console.log('Associated books:', books);
    if (books.length > 0) {
      console.log('Author has associated books. Deletion aborted.');
      return next(new Error('This author has books still'));
    }
    console.log('Author has no associated books. Proceeding with deletion.');
    next();
  } catch (error) {
    console.error('Error in pre-delete hook:', error);
    next(error);
  }
});

module.exports = mongoose.model('Author', authorSchema)