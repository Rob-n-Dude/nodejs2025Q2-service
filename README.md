# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop).

## Environment Configuration

Before running the application, you need to create a `.env` file in the root directory of the project.  
Copy the contents of the `.env.example` file into the newly created `.env` file and provide the necessary values.

## Downloading

```bash
git clone https://github.com/Rob-n-Dude/nodejs2025Q2-service.git
```

## Installing NPM modules

```bash
npm install
```

## Running application locally

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

# Running the Application with Docker

## Building and Starting Containers
- Make sure Docker is installed and running on your machine.
- Build and start the containers using the following command:

```bash
docker-compose up --build
```

- The application will be available on the configured port (default: 4000).

## Stopping Containers 
To stop the running containers, use:

```bash
docker-compose down
```

## Working with Containers
- To access the running nestjs_app container (e.g., for debugging or running commands inside it):

```bash
docker exec -it nestjs_app sh
```

- To view logs for a specific container (e.g., for nestjs_app):

```bash
docker logs -f nestjs_app
```

# Database Migrations
## Running Migrations

Migrations should be executed inside the Docker container to ensure the correct environment and database connection. Follow these steps:

- Access the nestjs_app container:
```bash
docker exec -it nestjs_app sh
```
- Run the migration command:
```bash
npm run migration:run
```

## Reverting Migrations
To revert the last migration, run the following command inside the container:
```bash
npm run migration:revert
```

## Creating Migrations
To create a new migration, use:
```bash
npm run migration:create -- <migration-name>
```
Replace <migration-name> with the desired name for your migration file.

# Security Check
To scan the project for known vulnerabilities, run the following command:
```bash
npm run scan
```
This will perform a security audit of your dependencies and notify you of any issues.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Troubleshoot
  - issue: unable to install dependencies
  - solution: try to use `yarn` instead of npm, or 'install' command with flags `--force` for `--legacy-peer-deps`
  
