CREATE TABLE main( 
    id SERIAL NOT NULL PRIMARY KEY,
    email varchar(100) unique,
    vorname varchar(100),
    nachname varchar(100),
    job varchar(100),
    admin BOOLEAN NOT NULL
);

CREATE TABLE programming(
    id int NOT NULL PRIMARY KEY,
    r BOOLEAN NOT NULL,
    knime BOOLEAN NOT NULL,
    python BOOLEAN NOT NULL,
    java BOOLEAN NOT NULL,
    js BOOLEAN NOT NULL,
    sql BOOLEAN NOT NULL,
    vba BOOLEAN NOT NULL,
    c BOOLEAN NOT NULL,
    c_ BOOLEAN NOT NULL,
    stata BOOLEAN NOT NULL,
    CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
);

CREATE TABLE datascience(
    id int NOT NULL PRIMARY KEY,
    datavis BOOLEAN NOT NULL,
    machinelearn BOOLEAN NOT NULL,
    nlp BOOLEAN NOT NULL,
    deeplearn BOOLEAN NOT NULL,
    ai BOOLEAN NOT NULL,
    CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
);

CREATE TABLE webdev(
    id int NOT NULL PRIMARY KEY,
    frontend BOOLEAN NOT NULL,
    backend BOOLEAN NOT NULL,
    CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
);

CREATE TABLE math(
    id int NOT NULL PRIMARY KEY,
    statistics BOOLEAN NOT NULL,
    logic BOOLEAN NOT NULL,
    CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
);

CREATE TABLE other(
    id int NOT NULL PRIMARY KEY,
    other varchar(200),
    CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
)