# Duel Monsters Project

This is our JavaScript project built to help our group learn and solidify our knowledge in the use of the express and Vue frameworks along with the non-relational database MongoDB. We were given a selection of three briefs to base our project on. Our group opted to implement a card/dice game. We chose the Yu-Gi-Oh card trading game to implement for our project.

Our MVP was to have a basic version of the game working where only the normal monster cards could be used to perform attacks on your opponent's card or life-points. The game is fairly simple in this scenario as we would only need to compare the attack and defence stats of the cards to determine the result of each battle. The winner of the game would be the one who could reduce their opponent's life-points down to zero first. We had only one week to complete the project before we presented it to an audience. The components we had here were only the player's deck, their current hand, the monster zone, the graveyard, the player's life-points, the phase button, and the battle area. The game would only be playable on the same machine and so control would have to be passed back and forth on each player's turn.

The project is still an ongoing one, and as such a lot of refactoring has taken place since the presentation. More components are being added which will handle all the cards that have special effects which were left out of the basic version of the game. More functionality will be added to handle the effects of these cards. The socket.io and socket.io-client packages have also been added to the project. Hopefully soon we will have multiple users being able to connect to the server and be paired up in rooms to partake in matches against each other.

The components that have been added are the spell/trap zone, field card zone, extra deck, side deck, and extra monster zone. The latter three components will not be functional until the majority of the card effects have been implemented.

## Instructions to run project

You will need to have mongodb, node.js, and npm installed on the machine you are using.

After downloading the files in the repository you will need to run npm install first inside the server directory and then the client directory to make sure you have all the necessary packages installed.

```bash
cd server
npm install
```

followed by

```bash
cd ../client
npm install
```

Once the node packages are installed we will need to run the database, the server, and the client in the background.

First run the mongod command in the terminal

```bash
mongod
```

Open a new terminal window/tab.
Go back into the server directory and run

```bash
npm run start
```

Open another terminal window/tab.
Go into the client directory and run

```bash
npm run serve
```

Finally open a web browser of your choice and enter localhost:8080 in the address bar.
