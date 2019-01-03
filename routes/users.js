const express = require('express');
const router = new express.Router();

const {
  register,
  login,
  toggleFavorite,
  getAllCards
} = require('../models/user');

// const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

/** Routes for the user: */

// New user registration - returns all user info:
router.post('/register', async function(req, res, next) {
  try {
    const { username, password, email } = req.body;
    const {
      token,
      last_login,
      current_streak,
      longest_streak
    } = await register(username, password, email);

    return res.json({
      login_token: token,
      last_login: last_login,
      current_streak: current_streak,
      longest_streak: longest_streak
    });
  } catch (error) {
    // may need to change this to an API error...
    return next(error);
  }
});

// Login - returns all user info:
// Should we return all card info?
router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const { token, last_login, current_streak, longest_streak } = await login(
      username,
      password
    );

    return res.json({
      login_token: token,
      last_login: last_login,
      current_streak: current_streak,
      longest_streak: longest_streak
    });
  } catch (error) {
    return next(error);
  }
});

// Add card to favorites:
router.post('/:username/favorite', async function(req, res, next) {
  try {
    const username = req.params.username;
    const { word, lang } = req.body;

    const action = await toggleFavorite(word, lang, username);
    return res.json(`${word} successfully ${action}`);
  } catch (error) {
    return next(error);
  }
});

// View profile with all saved cards (view by category)
router.get('/:username', async function(req, res, next) {
  // query for all saved cards by username
  try {
    const username = req.params.username;
    console.log(username);
    const cards = await getAllCards(username);

    return res.json({ cards: cards });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
