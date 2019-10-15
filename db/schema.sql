DROP DATABASE cancel;
CREATE DATABASE cancel;

CREATE TABLE songs(
id SERIAL PRIMARY KEY,
name text NOT NULL,
artist text NOT NULL
);

CREATE TABLE users(
id SERIAL PRIMARY KEY,
display_name text NOT NULL,
email text NOT NULL,
country text NOT NULL,
songs INT REFERENCES songs(id)
);



