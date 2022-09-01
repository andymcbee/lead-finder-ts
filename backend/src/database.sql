CREATE DATABASE leadfinder;

CREATE TABLE contact(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    website VARCHAR(255),
    email VARCHAR(255)
);