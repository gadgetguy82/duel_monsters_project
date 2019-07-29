<template lang="html">
  <div v-on:click="checkBattleHand" :class= "{ 'yellow-player' : player === 'one', 'blue-player' : player === 'two' }">
    <div class="card-container" v-for="(card,index) in battleArray" :key="index">
      <playing-card :card="card" v-on:click.native="addToBattleResult(card)"></playing-card>
      <button v-if="card" v-on:click="setAttack(card)" :class="{ 'selected' : card.position === 'atk', 'unselected' : card.position === 'def'}">attack</button>
      <button v-if="card" v-on:click="setDefence(card)" :class="{ 'selected' : card.position === 'def', 'unselected' : card.position === 'atk'}">defend</button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: "battlehand",
  props: ['player', 'phase', 'turn', 'eventBus'],
  data(){
    return {
      battleArray: [],
      emptyHand: {
        name: "null_card",
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
        this.eventBus.$emit("monster-zone", "full");
      } else {
        this.eventBus.$emit("monster-zone", "space");
      }
    }
  },
  mounted(){
    this.eventBus.$on('normal-summon', card => {
      this.battleArray.push(card);
    });

    this.eventBus.$on('lose', result => {
      const index = this.battleArray.findIndex(battleCard => battleCard === result.card);
      this.battleArray.splice(index, 1);
    });
  },
  methods: {
    addToBattleResult(card) {
      if (this.phase === "Battle") {
        this.eventBus.$emit('select-battlecard', card);
      }
    },

    setAttack(card) {
      if (this.player === this.turn && (this.phase === "First Main" || this.phase === "Second Main")) {
        card.position = "atk";
      }
    },
    setDefence(card) {
      if (this.player === this.turn && (this.phase === "First Main" || this.phase === "Second Main")) {
        card.position = "def";
      }
    },

    checkBattleHand() {
      if (this.battleArray.length === 0 ) {
        this.eventBus.$emit('empty-battlehand', this.emptyHand);
      }
    }
  },
  components: {
    "playing-card" : Card
  }
}
</script>

<style lang="css" scoped>

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
