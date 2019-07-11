<template lang="html">
  <div v-on:click="checkBattleHand" :class= "{ 'yellow-player' : player === 'one', 'blue-player' : player === 'two' }">
    <div class="card-container" v-for="(card,index) in battleArray" :key="index">
      <playing-card :card="card" v-on:click.native="addToBattleResult(card)"></playing-card>
      <button v-if="card" v-on:click="setAttack(card)" :class="{ 'selected' : card.position === 'atk', 'unselected' : card.position === 'def'}">attack</button>
      <button v-if="card" v-on:click="setDefence(card)" :class="{ 'selected' : card.position === 'def', 'unselected' : card.position === 'atk'}">defend</button>
    </div>
  </div>
</template>
<!-- class="battle-hand-container" -->
<script>
import { eventBus1, eventBus2 } from '@/main.js';
import Card from '@/components/Card'

export default {
  name: "battlehand",
  props: ['player', 'phase', 'turn'],
  data(){
    return {
      battleArray: [],
      emptyHand: {
        atk: 0,
        def: 0,
        card_images: [{ img_url_small: "" }],
        position: "atk"
      }
    }
  },
  watch: {
    battleArray: function() {
      if (this.battleArray.length === 5) {
        if (this.player === "one") {
          eventBus1.$emit("monster-zone", "full");
        } else {
          eventBus2.$emit("monster-zone", "full");
        }
      } else {
        if (this.player === "two") {
          eventBus1.$emit("monster-zone", "space");
        } else {
          eventBus2.$emit("monster-zone", "space");
        }
      }
    }
  },
  mounted(){
    if (this.player === "one") {
      eventBus1.$on('select-card', card => {
        if (this.battleArray.length < 5) {
          this.battleArray.push(card);
        }
      })
    } else {
      eventBus2.$on('select-card', card => {
        if (this.battleArray.length < 5) {
          this.battleArray.push(card);
        }
      })
    };

    if (this.player === "one") {
      eventBus1.$on('lose', result => {
        const index = this.battleArray.findIndex( battleCard => battleCard === result.card);
        this.battleArray.splice(index, 1);
      })
    } else {
      eventBus2.$on('lose', result => {
        const index = this.battleArray.findIndex( battleCard => battleCard === result.card);
        this.battleArray.splice(index, 1);
      })
    };


  },
  methods: {
    addToBattleResult(card) {
      if (this.player === "one" && this.player === this.turn && this.phase === "Battle") {
        eventBus1.$emit('select-battlecard', card);
      } else if (this.player === "two" && this.player === this.turn && this.phase === "Battle") {
        eventBus2.$emit('select-battlecard', card);
      }
    },

    setAttack(card) {
      card.position = "atk";
    },
    setDefence(card) {
      card.position = "def";
    },

    checkBattleHand() {
      if (this.battleArray.length === 0 ) {
        if (this.player === "one") {
          eventBus1.$emit('empty-battlehand', this.emptyHand);
        } else {
          eventBus2.$emit('empty-battlehand', this.emptyHand);
        }
      }
    }
  },
  components: {
    "playing-card" : Card
  }
}
</script>

<style lang="css" scoped>
  /* .battle-hand-container{
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    height: 180px;
    width: 575px;
    display: flex;
  } */
  .selected {
    background-color: green;
  }

  .unselected {
    background-color: white;
  }

  .card-container {
    margin: 2px 6px;
    opacity: 1;
  }

  .blue-player {
    background-image: url('../../public/img/yugioh_obelisk.jpg');
    background-size: cover;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    height: 180px;
    width: 575px;
    display: flex;
    opacity: 0.7;
  }

  .yellow-player {
    background-image: url('../../public/img/yellow_battle_hand_image.jpg');
    background-size: cover;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    height: 180px;
    width: 575px;
    display: flex;
    opacity: 0.7;
  }
</style>
