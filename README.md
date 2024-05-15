# Pastecord
A fullstack web application to share text snippets.


Pastecord is a web application is both available with a nice-looking frontend and json rest api.


## Features

- Desktop and mobile responsiveness.

- Extremely fast server, since its built using Fastify.

- No storage or database required, it stores the 'pastes' in discord's servers.

- Configured to work on docker containers.

- Compatible with all versions of Node.js since v16.11.0

## Usage

### Web

/ => Create pastes to get the share id's of them.



/search => Get the pastes with their paste id's.

### API

API Endpoints of Pastecord accepts data as application/x-www-form-urlencoded.





POST /api/ => Send a post request including a text field with a string value to create a paste.

POST /search/ => Send a post request including an id field with a string value to get a paste's content.


