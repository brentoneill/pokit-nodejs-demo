# poki
A fun exercise using PokitDok's open source NodeJS client library

## Setting up repo
Clone down the repo by running ```git clone https://github.com/brentoneill/poki.git``` from your desired directory

## Installing deps
Run ```npm install && bower install``` from your terminal

## Serve up locally
Run ```node server.js``` and navigate to ```http://localhost:5000``` in your browser

## Config variables
Due to the nature of the config variables, `config.js` is included in the `.gitignore`.

Take the create `example-config.js` file and fill in the variables:
- `pokitDok.clientId` with your PokitDok API client ID
- `pokitDok.clientSecret` with your PokitDok API client secret

Then rename that file to `config.js` so that it can be required without error in `server.js`
