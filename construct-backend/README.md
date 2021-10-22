
# Useful links

* Knex Migration API: https://knexjs.org/#Migrations-API

# Getting Started with Postgraphile backend

Here we describe the steps to perform to run and setup development environment.

## Steps to take for Setting Up Environment

1. Make sure you have installed Docker and docker-compose and node >14
2. Install pgAdmin and PostgresSQL docker containers: `docker-compose up -d pgadmin postgres`
3. Create database `construct` in pgAdmin:
	* login to pgAdmin: `http://localhost:9999` connect to server `postgres` and create database `construct`
4. Install packages `npm install`
4. Create `.env` file in root of project folder with next data:
```
CLIENT=pg
PORT=8080
DATABASE=construct
PG_USER=postgres
PASSWORD=postgres
HOST=127.0.0.1
PG_PORT=5432
```
4. Run database migration with Knex `npx knex migrate:latest`
5. Run database seeds with Knex `npx knex seed:run`

If all went well, your environment is ready and you can start development work.


In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:3000/graphiql) to view it in the browser.

We are using Postgraphile interface. Changes in files are tracked by nodemon and reload is not required.

### `npm run start`

Runs the app in the development mode

