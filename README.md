# Pastecord
A fullstack web application to make discord store the texts you share.


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


POST /api/ => Send a post request including a text field with a string value to create a paste.

POST /search/ => Send a post request including an id field with a string value to get a paste's content.


## Setup Instructions

You have to install [Node](https://nodejs.org) to run Pastecord.(and also npm)

```bash
sudo apt install nodejs npm -y
```



Firstly, you have to get the repository to your computer or a cloud device. You can do this by choosing one of the options below.


After getting the code downloaded, you have to open a terminal in the main directory of the project. On windows, this can be done by typing cmd to the file path and pressing enter after opening the folder with file explorer. Or if you are on a linux environment (this also works for windows powershell etc.) you can just use the cd command to get into the project folder.


Example:
```bash
git clone https://github.com/Rednexie/pastecord
cd pastecord
```


After opening a terminal, you should install the required node.js modules with npm:

```bash
npm i
```


*You need a discord server and a discord bot(preferably with admin privileges). You can then copy and paste the channel id's and your bot's application token inside config.json or .env*


And lastly when the installation is done, you can go ahead and run the project:

```
node .
```




## Links
[Download as Zip](https://github.com/Rednexie/pastecord/archive/refs/heads/main.zip)


[Clone with git](https://gist.github.com/Rednexie/fb81fd8df10ca0dc2abaf24a0cfa2082)


[Run on Replit](https://repl.it/github/Rednexie/pastecord)


[Import into Glitch](https://glitch.com/edit/#!/import/git?url=https://github.com/Rednexie/pastecord)


[Create Github Codespace](https://github.com/codespaces/new?quickstart=1&name=pastecord&repo=Rednexie/pastecord)


[Import into CodeSandbox](https://codesandbox.io/p/github/Rednexie/pastecord)


## Possible Updates

- Rate Limiting

- Delete and Update Pastes

- Authorization and accounts

- Logging



