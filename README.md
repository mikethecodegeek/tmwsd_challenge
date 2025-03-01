# This message will self-destruct

A NodeJS programming challenge.

The goal here is to create a simple web application that allows someone to create a message, view that message at a unique URL, and destroy the message upon viewing it. Just like the title states, this message will self-destruct!

## Live Demo
https://protected-sands-08270.herokuapp.com/

## Step 1: Installation

Fork this repository, clone it, install dependencies, and run it.

``` bash
git clone https://github.com/mikethecodegeek/tmwsd_challenge
npm install
node app.js
```

Notes:
In order to run this app locally, you will need to have postgres installed as well as two databases: One the main app and one for testing.

Please see the example .envexample file for more information.

### Testing
This project includes a test suite. To run the tests, run the following command:

``` bash
npm test
```


## Step 2: Complete the Requirements

Complete the following requirements by using any database engine of your choice. Update this readme by checking the following boxes as you go.

- [ X ] As a user, I should see a form to create a new message on the homepage.
- [ X ] As a user, I should see a list of links for all created messages below the 'new message' form on the homepage.
- [ X ] As a user, when I click a link in the message list, I should be able to view the message at a unique URL.
- [ X ] As a user, when I open a message, the message should self-destruct (delete from the database).
- [ X ] As a user, I should no longer see messages on the homepage that have been viewed.

Bonus points for making it look pretty :sparkles:

## Step 3: Submit

When you are finished, [deploy your app to Heroku](https://devcenter.heroku.com/articles/git) and send an email with a link to the Heroku app and a link to your fork. Thanks!
