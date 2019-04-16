DROP DATABASE IF EXISTS flashcards;
-- CREATE DATABASE flashcards;

CREATE TABLE users
(
    username TEXT PRIMARY KEY NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    last_login TIMESTAMP NOT NULL DEFAULT current_timestamp,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE libraries
(
    name TEXT UNIQUE,
    description TEXT,
    last_active_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (name)
);

CREATE TABLE cards
(
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    front_side TEXT NOT NULL,
    back_side TEXT NOT NULL,
    hint TEXT,
    library TEXT NOT NULL,
    last_active_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
    flagged BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (library) REFERENCES libraries (name) ON DELETE CASCADE
);

INSERT INTO libraries(name, description)
VALUES('english-spanish', 'english to spanish vocabulary practice');
INSERT INTO libraries(name, description)
VALUES('frontend coding vocab', 'frontend/javascript syntax practice');
INSERT INTO libraries(name, description)
VALUES('computer science vocab', 'computer science fundamentals - DSA');

INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('apple', 'manzana', 'fruit', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('grape', 'uva', 'fruit', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('banana', 'platano', 'fruit', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('strawberry', 'fresca', 'fruit', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('blueberry', 'arádano', 'fruit', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('pineapple', 'piña', 'fruit', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('peach', 'melocotón', 'fruit', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('run', 'correr', 'movement', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('walk', 'caminar', 'movement', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('dance', 'bailar', 'movement', 'english-spanish');
INSERT INTO cards
    (front_side, back_side, hint, library)
VALUES
    ('skip', 'saltar', 'movement', 'english-spanish');

