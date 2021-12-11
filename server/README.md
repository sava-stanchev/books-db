### Setup

You need to install all the packages in the root folder: `npm i`.

- `npm start` - will run the code in *development* mode, meaning every change done to the code will trigger the program to restart and reflect the changes made

<br>

### Structure

- `src/index.js` - the entry point of the project
- `src/middleware` - contains all custom middleware
- `src/validators` - contains objects (called schemas) for validating body/query objects
- `src/data` - contains the connection settings and functions for CRUD over everything in the database
- `src/services` - where all services are
- `src/auth` - contains all authentication setup and middleware

<br>

### MySQL Workbench

The database for this project can be found in the **database** folder.