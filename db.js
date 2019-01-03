const { Client } = require('pg');

const client = new Client({
  connectionString: `postgresql:///spanish_flashcards`
});

client.connect();

module.exports = client;
