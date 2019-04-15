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

/** GET: Display user registration page:
 *
 * currently rendered via templates - NEED TO UPDATE W/ REACT
 */

router.get('/register', async function(req, res, next) {
  try {
    return res.render('user_registration.html');
  } catch (error) {
    return next(error);
  }
});

/** GET: Display user login page:
 *
 * currently rendered via templates - NEED TO UPDATE W/ REACT
 */
router.get('/login', async function(req, res, next) {
  try {
    return res.render('user_login.html');
  } catch (error) {
    return next(error);
  }
});

/** POST: New user registration -
 *
 * returns token in JSON for front-end to manipulate:
 * */
router.post('/register', async function(req, res, next) {
  try {
    const { username, password, email } = req.body;
    console.log('username from body....', username, password, email);
    const { token } = await register(username, password, email);

    return res.JSON({ token: token });
  } catch (error) {
    // may need to change this to an API error...
    return next(error);
  }
});

/** POST: login user -
 *
 * returns token in JSON for front-end to manipulate:
 *
 * when FRONT-END submits a form, page will refresh - HOW do we go to the next page?
 * */
router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const { token } = await login(username, password);

    return res.JSON({ token: token });
  } catch (error) {
    return next(error);
  }
});

/** GET: user info, including saved cards -
 *
 * returns...
 *
 *
 * */
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
