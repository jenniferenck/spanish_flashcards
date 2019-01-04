const express = require('express');
const router = new express.Router();

const {
  register,
  login,
  toggleFavorite,
  getAllCards,
  getUserInfo
} = require('../models/user');

// const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

/** Routes for the user: */

// Display user registration page:
router.get('/register', async function(req, res, next) {
  try {
    return res.render('user_registration.html');
  } catch (error) {
    return next(error);
  }
});

// Display user login page:
router.get('/login', async function(req, res, next) {
  try {
    return res.render('user_login.html');
  } catch (error) {
    return next(error);
  }
});

// New user registration - returns all user info:
router.post('/register', async function(req, res, next) {
  try {
    const { username, password, email } = req.body;
    console.log('username from body....', username, password, email);
    const { token } = await register(username, password, email);

    // NEED TO WORK ON THIS!
    res.set({ Authorization: token });
    res.header('Authorization', token);
    console.log(username);

    return res.redirect(`/users/${username}`);
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
    const { token } = await login(username, password);
    // determine who to send token to next route

    res.header('Authorization', token);
    console.log(res);
    return res.redirect(`/users/${username}`);
  } catch (error) {
    return next(error);
  }
});

// View profile with all saved cards (view by category)
router.get('/:username', async function(req, res, next) {
  try {
    const username = req.params.username;
    console.log(username);

    // send these requests out at same time:
    const cards = await getAllCards(username);
    const { last_login, current_streak, longest_streak } = await getUserInfo(
      username
    );

    return res.render('user_dash.html', {
      last_login,
      current_streak,
      longest_streak,
      username: username,
      cards
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

module.exports = router;
