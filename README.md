# JavaScript Stack Boilerplate

[![Dependencies](https://img.shields.io/david/verekia/js-stack-boilerplate.svg)](https://david-dm.org/verekia/js-stack-boilerplate)
[![Dev Dependencies](https://img.shields.io/david/dev/verekia/js-stack-boilerplate.svg)](https://david-dm.org/verekia/js-stack-boilerplate?type=dev)

This is the final boilerplate code of the [JavaScript Stack from Scratch](https://github.com/verekia/js-stack-from-scratch) tutorial.

## Getting started with this repository

- [Download](https://github.com/verekia/js-stack-boilerplate/archive/master.zip) the repository
- Edit `package.json` with your own info
- Copy `.env-sample` to `.env`

Then, _if you do not want to use Heroku and its CLI_:
- Delete the `Procfile` file
- Replace the `prod:start-local` NPM script in `package.json` by: `yon docker && node lib/_server/server.js`
- Delete the `heroku-` NPM scripts

And for everyone:

- Run `yarn` and `yarn start`, then open your browser on `http://localhost:8000` – That's it!
- Delete the content of this `README.md` file

## Demo

Check out the [live demo](https://js-stack.herokuapp.com/).

## Credits

Created by [@verekia](https://twitter.com/verekia) – [verekia.com](http://verekia.com/).

License: MIT
