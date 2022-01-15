CREATE DATABASE oderp;

-- \c into oderp

CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255),
    project_description VARCHAR(500)
);