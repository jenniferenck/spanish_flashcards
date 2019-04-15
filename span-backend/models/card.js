const db = require('../db');

class Card {
  static async searchCard(word, lang) {
    // get card by search criteria
    const searchResult = await db.query(
      `SELECT * FROM cards where ${lang} = $1`,
      [word]
    );
    return searchResult.rows;
  }

  static async addCard(word, lang) {
    // axios req to merriam webster to get word info
    // add to DB
  }

  //   query db for all cards
  static async getAllCards() {
    const cards = await db.query(`SELECT * FROM cards`);
    return cards.rows;
  }

  // filter cards by category
  static async getCardsByCategory(category) {
    const cards = await db.query(`SELECT * FROM cards WHERE category= $1`, [
      category
    ]);
    return cards.rows;
  }
}

module.exports = Card;
