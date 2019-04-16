const { Client } = require('pg');

const client = new Client({
  connectionString: `postgresql:///flashcards`
});

client.connect();

module.exports = client;
