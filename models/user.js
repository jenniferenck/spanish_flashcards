/** User class for spanish_flashcards */

/**Error handling */
// const APIError = require('../helpers/APIError');
const db = require('../db');

// For hashing pwd
const bcrypt = require('bcrypt');
const { SECRET_KEY, BCRYPT_WORK_ROUNDS } = require('../config');

const jwt = require('jsonwebtoken');

/** time formating */
const moment = require('moment');
moment().format();

class User {
  /** Register a new user:
   * search for pre-exisitng user and then add to db if unique username
   */
  static async register(username, password, email) {
    const search = await searchUser(username);

    if (search.rows.length > 0) {
      throw new Error(
        'The username you entered already exists, please try another'
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_ROUNDS);
    console.log('hashed pwd....', hashedPassword);

    const result = await db.query(
      `INSERT INTO users (
        username,
          password,
          email) VALUES ($1, $2, $3) RETURNING *`,
      [username, hashedPassword, email]
    );

    const token = jwt.sign({ username }, SECRET_KEY);

    return {
      token: token
    };
  }

  /** Login a user
   * check username, then password are correct
   * return all user info... may need to also get all saved cards
   */
  static async login(username, enteredPassword) {
    const search = await searchUser(username);
    if (search.rows.length === 0) {
      throw new Error({ message: 'Invalid user/password, please try again' });
    }

    let {
      password,
      last_login,
      current_streak,
      longest_streak
    } = search.rows[0];

    console.log('current_streak......', current_streak);

    if (await bcrypt.compare(enteredPassword, password)) {
      const token = jwt.sign({ username }, SECRET_KEY, {});
      const newLoginDate = new Date();
      console.log('new date generated....', newLoginDate);

      // check last login spread
      const daysSinceLastLogin = calcDaysSinceLastLogin(
        last_login,
        newLoginDate
      );

      //   update current streak
      if (daysSinceLastLogin > 1) {
        current_streak = 0;
      }
      if (daysSinceLastLogin === 1) {
        current_streak += 1;
      }

      //   update longest streak (if applicable)
      if (current_streak > longest_streak) {
        longest_streak = current_streak;
      }

      // 5. update timestamp for last login field
      await db.query(
        `UPDATE users SET last_login = $1, current_streak = $2, longest_streak = $3 WHERE username = $4 RETURNING *`,
        [newLoginDate, current_streak, longest_streak, username]
      );

      // 7. compare current streak with longest streak
      return {
        token: token,
        last_login,
        current_streak,
        longest_streak
      };
    }
    throw new Error({ message: 'Invalid user/password, please try again' });
  }

  static async toggleFavorite(word, lang, username) {
    //   get id from card DB
    let id = await db.query(`SELECT id FROM cards WHERE ${lang} = $1`, [word]);

    if (id.rows.length === 0) {
      throw new Error({
        message: 'this word does not exist in the database, try another word'
      });
    }

    console.log('card id.....', id.rows[0].id);
    id = id.rows[0].id;

    // see if card has been favorited...
    const search = await db.query(
      `SELECT username, card_id FROM user_saved_cards WHERE card_id = $1 AND username = $2`,
      [id, username]
    );
    console.log(search);

    if (search.rows.length === 0) {
      // add to DB
      await db.query(
        `INSERT INTO user_saved_cards (username, card_id) VALUES ($1, $2)`,
        [username, id]
      );
      console.log(`${word} added to favorites`);
      return 'added';
    } else {
      // remove from DB
      await db.query(
        `DELETE from user_saved_cards WHERE username = $1 AND card_id = $2`,
        [username, id]
      );
      return 'removed';
    }
  }
  static async getAllCards(username) {
    // ensure correct user
    const cards = await db.query(
      `SELECT c.id, c.english, c.spanish, c.part_of_speech, c.category
    FROM cards AS c
    JOIN user_saved_cards AS uc ON c.id = uc.card_id WHERE username = $1`,
      [username]
    );
    return cards.rows;
  }

  static async getUserInfo(username) {
    const search = await db.query(
      `SELECT username, password, last_login, current_streak, longest_streak FROM users WHERE username = $1`,
      [username]
    );
    return search.rows[0];
  }
} // END USER CLASS

// helpers:

//   1. Look up a current user:
async function searchUser(username) {
  const search = await db.query(
    `SELECT username, password, last_login, current_streak, longest_streak FROM users WHERE username = $1`,
    [username]
  );
  return search;
}

function calcDaysSinceLastLogin(lastLogin, newLoginDate) {
  const newDate = moment(newLoginDate);
  // console.log('newDate......', newDate);
  const oldDate = moment(lastLogin);
  // console.log('oldDate......', oldDate);

  const difference = newDate.diff(oldDate, 'days');
  console.log('difference........', difference);
  return difference;
}

module.exports = User;
