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

You can visit the pages to use Pastecord with any web browser.
<br>

/ => Create pastes to get the share id's of them.



/search => Get the pastes with their paste id's.

### API

API Endpoints of Pastecord accepts data as application/x-www-form-urlencoded.
<br>






## Links
[Download as Zip](https://github.com/Rednexie/pastecord/archive/refs/heads/main.zip)


[Clone with git](https://gist.github.com/Rednexie/fb81fd8df10ca0dc2abaf24a0cfa2082)


[Run on Replit](https://repl.it/github/Rednexie/pastecord)


[Import into Glitch](https://glitch.com/edit/#!/import/git?url=https://github.com/Rednexie/pastecord)


[Create Github Codespace](https://github.com/codespaces/new?quickstart=1&name=guildedtemplate&repo=Rednexie/pastecord)


[Import into CodeSandbox](https://codesandbox.io/p/github/Rednexie/pastecord)


## Possible Updates

- Rate Limiting

- Delete and Update Pastes

- Authorization and accounts

- Logging

POST /api/ => Send a post request including a text field with a string value to create a paste.

POST /search/ => Send a post request including an id field with a string value to get a paste's content.


