# Project Trybe Futebol Clube - ENG version

## Description
This project is a complete web application developed in a monorepo, aiming to simulate a football club management system, where we can:
- View the standings of all teams and filter them
- Register new matches
- Modify ongoing matches
- Finish matches
- Perform login with users of different permission levels

The entire project, along with its services, runs within Docker containers, orchestrated by a Docker Compose located at the root of the project (Docker and Docker Compose version 1.29 or higher installed on your machine are required to run the project).

The database seeds have already been provided in `./app/backend/src/database/seeders`

## Technologies Used
- TypeScript
- Node.js
- Express
- Sequelize
- MySLQ
- Eslint
- JWT (JSON Web Token)
- React.js
- HTML/CSS

## How to Run
1. Clone the repository: `git clone https://github.com/victor-s-salles/project-trybe-futebol-clube.git`
2. Navigate to the project directory: `cd project-trybe-futebol-clube`
3. Install the dependencies: `npm install`
4. Run Docker Compose: `docker-compose up -d`

The website will be available at [http://localhost:3000](http://localhost:3000).

Backend application tests have been developed; you can run them by using the `npm test` command within the backend directory.
