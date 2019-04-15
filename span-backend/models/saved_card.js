class SavedCard {
  // Add a card to saved list
  static async addOrRemoveCard(word, lang, username) {
    // check db if card is already a favorite
    // if in db, remove
    // if not in db, insert with username
  }

  static async getAllCards(username, category) {
    //   query db for all cards
    // shuffle cards
    // return array of objects with all cards
  }

  static async getCardsByCategory(username, category) {
    //   query db for all cards by category name
    // return object with all cards in an array of objects
  }
}
