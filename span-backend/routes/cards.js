const express = require('express');
const router = new express.Router();
const axios = require('axios');
const { WEBSTER_URL } = require('../config');

const {
  searchCard,
  addCard,
  getAllCards,
  getCardsByCategory
} = require('../models/card');

// Display all cards
router.get('/', async function(req, res, next) {
  //   const lang = req.params.lang;
  const cards = await getAllCards();

  return res.json({ cards: cards });
});

// Search cards by name
router.get('/search', async function(req, res, next) {
  const word = req.query.word;
  const lang = req.query.lang;
  const category = req.query.category;

  //   get an array of objects
  const searchResult = await searchCard(word, lang);

  if (searchResult.length === 0) {
    //   make axios request to merriam webster
    const translation = await axios.get(WEBSTER_URL);
    console.log('translation....', translation.data[0].shortdef);
  }

  return res.json(searchResult);
});

// Display cards by category
router.get('/:category', async function(req, res, next) {
  const category = req.params.category;
  const cards = await getCardsByCategory(category);

  return res.json({ cards: cards });
});

module.exports = router;
