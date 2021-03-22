# Intricately - Senior Frontend Developer Test

This is a test project for the Senior Frontend Developer role from Intricately.

## Summary

- [About](#about-the-app)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Testing](#testing)
- [How to play](#how-to-play)
- [Things I would do](#improvements)
- [Built with](#built-with)
- [Authors](#authors)

### About the App
This is an app that simulates a game of cards, where you input some cards on your hand
and one rotation card, returning the following:

- The cards in your hand, ordinated by the stronger to the weakest,
  considering the value of the rotation card;

- The stronger card in your hand, considering the value of the rotation card;

- The possibilities of "full houses" (if any) considering all the cards in
  your hand beside the rotation card.

### Prerequisites

In order to correctly run this software in your machine, you need to have installed:

    Node.js 12+

### Installing

Follow this steps to install and run the project.

Clone this repo:

    git clone https://github.com/raphaeljp/intricately.git

Navigate into the repo directory:

    cd intricately

Install the project dependencies:

    npm i

Run the server:

    npm run serve

Open your browser in the localhost domain:

    http://localhost:8080/

Now you have a working copy of the software up and running in your local machine.

### Testing
In order to run the unit tests, just run the following command on the root folder
of the project:

    npm run test

### How to play
You need to follow all the steps in the [instalation](#installing) part of this document
in order to have an up and running version of this app in your machine.


Once you have the application running, the first page you will access is the "deck page",
where you must insert at least 1 card (maximum 10) and the rotation card.

After including the cards, click on the "submit" button and wait.

The App will redirect you to the playbook screen, where you'll have your "hand"
ranked from the strongest to the weakest card, a field informing your strongest
card, and a list of possible "full houses" (if any).

### Improvements
Things I'd do if this was a production app or if a had more time:

:ballot_box_with_check: Include more unit tests
:ballot_box_with_check: Include e2e tests
:ballot_box_with_check: Improve project responsiveness
:ballot_box_with_check: Improve transitions
:ballot_box_with_check: Add custom loaders for the cards on the second page

## Built With

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vuex](https://github.com/vuejs/vuex) - Centralized State Management for Vue.js
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

## Authors

- **Raphael Pereira** - [raphaeljp](https://github.com/raphaeljp)
