CREATE DATABASE oderp;

-- \c into oderp

CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255),
    project_description VARCHAR(500),
    project_due DATE NOT NULL
);

CREATE TABLE resources(
    resource_id SERIAL PRIMARY KEY,
    resource_name VARCHAR(255),
    resource_description VARCHAR(255),
    resources_amount NUMERIC
);

CREATE TABLE offices(
    office_id SERIAL PRIMARY KEY,
    offce_name VARCHAR(255),
    office_place VARCHAR(255)
);