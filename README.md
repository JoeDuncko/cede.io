# cede.io
A true time tower defense browser game

http://cede.io/ (the home page) is hosted via GitHub Pages in the `gh-pages` branch of this repository

http://cedegame.com/ (the game itself) is hosted via Heroku and worked on in the `master` branch of this repository

## To install on Mac w/ homebrew

- Install homebrew http://brew.sh/
- Clone the repository
- Install mongodb via homebrew https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew
- Install node via homebrew `brew install node`
- Make sure your npm permissions are set up correctly https://docs.npmjs.com/getting-started/fixing-npm-permissions
- Create up a `.env` file in the repository based off the included `.envexample` file
- Navigate to the repository in your terminal
- Run `npm install` to install all requirements
- In a separate terminal, start MongoDB via `mongod`
- Go back to the terminal that's inside the repository, and run `npm start`
- cede.io should now be running on localhost:3000

## Notes

- To make SASS files, run `make sass` while you have `node-sass` installed globally
    - Install `node-sass` globally via `npm install node-sass -g`

## To install on Heroku

- Create a Heroku app
- Add a mLab MongoDB Heroku add-on to the app
- Add a `SESSION_SECRET` to your Heroku app's environment variables
- Push the repository to Heroku
- That's it!
