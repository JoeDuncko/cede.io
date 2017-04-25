# cede.io

## Introduction

cede.io is a true time tower defense browser game.

http://cede.io/ (the home page) is hosted via GitHub Pages in the gh-pages branch of the repository at https://github.com/JoeDuncko/cede.io .

http://cedegame.com/ (the game itself) is hosted via Heroku and worked on in the master branch of the repository at https://github.com/JoeDuncko/cede.io .

The player is tasked with protecting a "base" in the middle of a grid from enemies that move closer to the "base" every real-time minute - even when the player is not actively playing the game. The player can place "towers" on the grid to attack enemies at any time - however, the towers only attack as part of the game loop that runs every real-time minute.

This game was mostly inspired by a desire to bring something like the meaningful true-time strategy of [Travian](http://www.travian.com/) to those not willing to spend a literal 300 days playing through an entire round.

This document documents the game in its current state for my senior project at Youngstown State university. It was written in April 2017.

Note that while this document is available on GitHub, it will probably not be kept up to date.

## Technology

### Backend

The backend is written in Node.js and uses several packages from NPM. Here are the highlights:

- Express.js - framework for building a REST API
- Jade - template engine (backend)
- Mongoose - MongoDB validation, casting and business logic for Node.js
- node-schedule - a flexible cron-like and not-cron-like job scheduler for Node.js
- passport - Simple, unobtrusive authentication for Node.js
- pathfinding - a path-finding library for Node.js
- socket.io - web socket library, backend

cede.io uses MongoDB for its database.

### Frontend

- React - JavaScript framework
- JSX - template engine (frontend)
- socket.io - web socket library, frontend
- Babel - transpiler, using for JSX (currently running on the client side every time the game is loaded)
- SASS - CSS transpiler

## Other

ESLint - Static analysis tool for checking for common programming errors and enforcing coding styles
GitHub - Git repository hosting

## Folder structure

```
├── LICENSE - Apache license file
├── Makefile - Has some tools for compiling SASS
├── README.md - Contains getting started information
├── app.js - Main node.js file
├── bin
│   └── www - Express settings
├── entities - Contains basic information of objects in the game
│   ├── enemies - Contains basic information of enemies in the game
│   │   ├── enemy_base.js - Base enemy object - not used at the moment by anything directly, but is an example of what an enemy should look like
│   │   └── enemy_close_range.js - basic enemy stats
│   ├── modes - Contains basic information of game modes
│   │   ├── mode_base.js - Base game mode object - not used at the moment by anything directly, but is an example of what a game mode should look like
│   │   └── mode_survival.js - basic game mode stats
│   └── towers - Contains basic information of towers in the game
│       ├── tower_base.js - Base tower object - not used at the moment by anything directly, but is an example of what a tower should look like
│       └── tower_close_range.js - basic tower stats
├── gameloop.js - contains the game loop information, which runs every minute
├── models - Contains mongoose models for the MongoDB database
│   ├── game.js - Contains how a game should look in the MongoDB database
│   └── user.js - Contains how a user should look in the MongoDB database
├── node_modules - Stores all the NPM modules specified by package.json
├── package.json - Specifies all modules used in the project, pulled from NPM when you run `npm install`
├── passport - All the files used by Passport.js
├── public - Frontend, publicly accessible files
│   ├── images - Contains images used in the game
│   ├── scripts- Contains all JavaScript files
│   │   ├── GameScreen - Contains all files for the game screen
│   │   ├── gamesList - Contains all files for the game list screen
│   └── stylesheets - Contains all SASS stylesheets and their CSS counterparts
├── realtime - Contains all backend socket.io logic
├── routes - Contains all backend routes information, also has API documentation
├── source-images - All images used in the game, before being processed to be used on the web
├── views - All views for the backend to present
└── writeup.md - This text
```
## Setting up a cede.io development environment, on Mac with Homebrew

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

## Setting up a cede.io production environment via Heroku

- Create a Heroku app
- Add a mLab MongoDB Heroku add-on to the app
- Add a `SESSION_SECRET` to your Heroku app's environment variables
- Push the repository to Heroku
- That's it!

## A closer look at the game loop

At any time a player may place a tower, however everything else happens every minute on the minute in the following order, as per the game loop.

- Each of your towers attack an enemy next to them, if there is one
- Go through the list of enemies and remove any that have 0 or less health
- For each list of living enemies
  - If that enemy is about to step on a tower, have it attack that tower, else
  - If that enemy is about to step on the base, have it attack the base, else
  - If that enemy is able to walk towards the base, it should
- If the base has 0 or less health, mark the game as over and quit, else
- Give the player more resources and update the player's game client side via socket.io

## Challenges

### Moving to React

Originally I wanted to write my frontend in Backbone, an older (ie, mature) JavaScript framework that we use at Drund (where I work). It is normally used with Require, a way to organize dependencies in JavaScript, making something similar to classes. However, I quickly found that Require was difficult to get working, especially when JQuery was thrown in the mix. When I finally got it working, I was mostly put off by the framework, as I then had to choose a template engine (or use underscore, which is built in but seems to not usually be used). Looking back, I could have moved to [Marionette](https://marionettejs.com/) at this point, a more structured version of Backbone, in order to give myself less choices, but at the time I was reading and hearing a lot about Facebook's React, and even went to a talk on it. After some consulting with some friends, I decided that moving to React would a) simplify my set up b) be a good learning experience for me, especially because implementing a React Native (a mobile framework based on React) version of the game was something that sounded appealing. It only took me a couple hours to get started with React, as Facebook's documentation on it is wonderful. I'm very happy I did.

### Working with the game loop

It took me way more time than it should have to realize that I didn't have the game loop fully figured out when I finally got to writing it. It took me several hours of planning to settle on a game play model I could actually use an implement in a sane way. From there, I realized that the game loop quickly got out of hand - as a single function, it was simply too much. To combat this, I made many notes as I wrote the game loop, and refactored it a couple times to keep it as straightforward as possible. I actually made the decision to keep it a single function, at least to begin with, to keep this simplicity and allow it to be read from top to bottom.

One of the biggest issues with the game loop is that I didn't make any tests for it. This was for several reasons: a) I still do not have that much experience writing unit tests, and I didn't want to spend time learning how to write ones that made sense when I felt like I barely understood how I was going to go about writing the game loop and b) as I learned more about how the libraries I used in my game loop worked, I changed my requirements of the game slightly to accommodate (as both the developer and designer, you can do that). However, I constantly felt like I was going to break something in the loop as I worked with it. Even as I write this, I'm a little afraid to touch the game loop in fear of breaking something unknowingly.

My next step when working with this game is definitely going to be writing tests, at least for the game loop, and then probably for the API.

## Upcoming features

A game is never complete. When I get the time, I'd love to get the game in front of people and try to iterate how the game play works. Even though I don't think it's very fun now, I think it can be with some tweaking. I think that some of the things that could be added to make it more fun are more complex game modes (I kept it very simple for my minimum viable product), multiplayer, different/expanding map sizes and putting thing on the map like resources, and adding text alerts when your base gets attacked. However, before those are implemented, I'd like to implement the ability to change passwords and the ability to log in / sign up with Facebook or Google accounts, which both should have been included in the game to begin with but weren't because I was having trouble wrapping my head completely around Passport. Lastly, porting the game over to React Native, and thus iOS and Android, would be an awesome experience that I would like to try some time in the near future. 
