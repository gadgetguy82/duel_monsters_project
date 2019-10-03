<template lang="html">
  <div id='home'>
    <div id="background">
      <h1>Duel Monsters Card Game</h1>
      <p>Select 'update database' for the most current card collection</p>
      <button v-on:click='fetchData'>Update Database</button>
      <h2>--How to Play--</h2>
      <ul>
        <li>Click the update database button above to store a local copy of the cards</li>
        <li>Player one starts first, click on the Start button to begin</li>
        <li>Clicking the button changes the phases during your turn</li>
        <li>In the draw phase player one can start drawing cards from their playing deck</li>
        <li>You can skip the standby phase for now as effects/spells/traps are not in game yet</li>
        <li>In the first main phase you can summon monsters out to the monster zone</li>
        <li>Once summoned you should set each monster to attack/defence</li>
        <li>In the battle phase select one of your attack monsters to attack the opponent</li>
        <li>Starting player cannot attack on his first turn</li>
        <li>In the second main phase you can summon more monsters out to the monster zone</li>
        <li>Click the end phase to end your turn</li>
        <li>Pass play to your opponent</li>
        <li>Play until someone loses. Once a player’s Life Points reach zero, they lose the duel.</li>
        <li>Click begin game below to start a match</li>
      </ul>
      <button><router-link :to="{ name: 'game-board'}" v-if="normalCards.length > 0"> Start Game!</router-link></button>
    </div>
  </div>
</template>

<script>
import DBService from '@/services/db_service';

export default {
  name: 'home',
  props: ['normalCards'],
  data() {
    return {
      allCards: []
    }
  },
  methods: {
    fetchData() {
      fetch('https://db.ygoprodeck.com/api/v5/cardinfo.php')
      .then(res => res.json()).then(cardData => {
        this.allCards = cardData;
        DBService.postCards(this.allCards);
      });
    }
  }
}
</script>

<style lang="css" scoped>
#background {
  color: #FF8C00;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  background-color: rgba(0, 0, 0, 0.8);
  height: fit-content;
  width: fit-content;
  margin: auto;
  padding: 10px;
}

p, li {
  margin: 5px;
  font-size: 18px;
  list-style-type: decimal;
}

button {
  margin: 5px;
  font-size: 16px;
  border-radius: 5px;
  text-decoration: none;
}
</style>
