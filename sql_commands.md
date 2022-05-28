# SQL commands used to set up database
## Create table
```
CREATE TABLE main(
    ID int NOT NULL,
    email varchar(100) unique,
    vorname varchar(100),
    nachname varchar(100),
    PRIMARY KEY (ID)
);
```