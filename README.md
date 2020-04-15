# Pokemon Battle

Pokemon Battle is an ap that allows users to choose teams and have turn based Pokemon battles with each other.

[Back End Github](https://github.com/tdonovan79/pokemon-battle-backend)<br/>
[Live App](https://tdonovan79.github.io/pokemon_battle_frontend/)
[Video Demo](https://www.youtube.com/watch?v=5qEZd4CFnn8&feature=youtu.be)

## Features
  1. User login - When users enter their name to login, if the user has already been created, then they will be logged in as that user. If there is no user, matching that name, a new one will be created.
  2. Selecting Pokemon - 151 Pokemon appear on the sidebar. This data is fetched from Poke API. When a user selects a Pokemon and adds it to their team, another request is made to Poke API to get that Pokemon's full set of sprites, types and movesets.
  3. Selecting opponent - After clicking the "start battle" button, the user will be brought to a opponent selection page. Clicking on each opponent will show their current team.
  4. Battle - Each turn during the battle, the user will have the choice to "fight" which will inflict a random amount of damage between 1 and 20 to the opponent's active Pokemon, to "heal" which will heal a random amount of damage between 1 and 20 to the current player's Pokemon, or to "switch" where the current player can switch their current Pokemon for another on their team. Pokemon will faint when they reach 0 HP. The first player tohave all of their Pokemon faint will lose the battle.

## Dev Tools
- Front End:
  - `Javascript` - the app is built using Vanila Javscript with Object-Oriented Javascript principles
  - `Poke API` - used to fetch Pokemon information
  - `Github Pages` - used to deploy front end of app

- Back End:
  - `Ruby on Rails` - main framework used building out back end of app
  - `PostgreSQL` - database management system 
  - `Heroku` - used to deploy back end of app
