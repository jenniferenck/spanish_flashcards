DROP DATABASE IF EXISTS spanish_flashcards;
-- CREATE DATABASE spanish_flashcards;

CREATE TABLE users
(
    username TEXT PRIMARY KEY NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    last_login TIMESTAMP NOT NULL DEFAULT current_timestamp,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    high_score INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE cards
(
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    english TEXT NOT NULL,
    spanish TEXT NOT NULL,
    part_of_speech TEXT NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE user_saved_cards
(
    username TEXT NOT NULL REFERENCES users,
    card_id INTEGER NOT NULL REFERENCES cards (id)
);

INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('apple', 'manzana', 'noun', 'fruit');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('grape', 'uva', 'noun', 'fruit');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('banana', 'platano', 'noun', 'fruit');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('strawberry', 'fresca', 'noun', 'fruit');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('blueberry', 'arádano', 'noun', 'fruit');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('pineapple', 'piña', 'noun', 'fruit');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('peach', 'melocotón', 'noun', 'fruit');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('run', 'correr', 'verb', 'movement');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('walk', 'caminar', 'verb', 'movement');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('dance', 'bailar', 'verb', 'movement');
INSERT INTO cards
    (english, spanish, part_of_speech, category)
VALUES
    ('skip', 'saltar', 'verb', 'movement');

