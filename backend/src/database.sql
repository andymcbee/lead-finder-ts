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




CREATE TABLE contacts(
    id SERIAL PRIMARY KEY NOT NULL,
    parentAccountId VARCHAR NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    website VARCHAR(255),
    email VARCHAR(255),
    emailstatus VARCHAR(255)
);


