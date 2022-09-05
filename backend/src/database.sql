CREATE DATABASE leadfinder;

CREATE TABLE appusers(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    accountId VARCHAR(255) UNIQUE,
    isAccountOwner BOOLEAN
);


ALTER TABLE Customers
ADD Email varchar(255);