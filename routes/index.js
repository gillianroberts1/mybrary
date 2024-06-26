const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit().exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})

module.exports = router
