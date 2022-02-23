CREATE DATABASE oderp;

-- \c into oderp

CREATE TABLE projects(
    project_id BIGSERIAL NOT NULL PRIMARY KEY,
    project_name VARCHAR(50) NOT NULL,
    project_description VARCHAR(500),
    project_due DATE NOT NULL
);

CREATE TABLE resources(
    resource_id BIGSERIAL NOT NULL PRIMARY KEY,
    resource_name VARCHAR(50) NOT NULL,
    resource_description VARCHAR(255),
    resources_amount NUMERIC
);

CREATE TABLE offices(
    office_id BIGSERIAL NOT NULL PRIMARY KEY,
    offce_name VARCHAR(50) NOT NULL,
    office_place VARCHAR(255) NOT NULL
);