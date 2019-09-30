<template lang="html">
  <div class="monster-container" :class= "{ 'yellow' : player === 'one', 'blue' : player === 'two' }" v-on:click="checkMonsterZone">
    <div class="monster-zone" v-for="(card,index) in monsterZone" :key="index">
      <playing-card :card="card" v-on:click.native="handleClick(card)"></playing-card>
      <div class="button-container">
        <button v-if="card" v-on:click="setAttack(card)" :class="{ 'selected' : card.position === 'atk', 'unselected' : card.position === 'def'}">attack</button>
        <button v-if="card" v-on:click="setDefence(card)" :class="{ 'selected' : card.position === 'def', 'unselected' : card.position === 'atk'}">defend</button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'monster-zone',
  props: ['player', 'gameState', 'eventBus'],
  components: {
    "playing-card" : Card
  },
  data(){
    return {
      mainPhases: ["First Main", "Second Main"],
      monsterZone: [],
      noCard: {
        name: "null_card",
        atk: 0,
        def: 0,
        card_images: [{ img_url_small: "" }],
        position: "atk"
      },
      summoningCard: null,
      tributeAmount: 0,
      tributes: []
    }
  },
  mounted(){
    this.eventBus.$on("normal-summon", card => {
      this.monsterZone.push(card);
    });

    this.eventBus.$on("lose", result => {
      GameLogic.removeCard(result.card, this.monsterZone);
    });

    this.eventBus.$on("tribute-summon", summonData => {
      this.summoningCard = summonData.card;
      this.tributeAmount = summonData.amount;
    });
  },
  watch: {
    monsterZone() {
      if (this.monsterZone.length === 5) {
        this.eventBus.$emit("monster-zone", "full");
      } else {
        this.eventBus.$emit("monster-zone", "space");
      }
    }
  },
  methods: {
    handleClick(card) {
      if (this.mainPhases.includes(this.gameState.phase)) {
        if (this.tributes.length < this.tributeAmount) {
          this.tributes.push(card);
          if (this.tributes.length === this.tributeAmount) {
            for (let monster of this.tributes) {
              GameLogic.removeCard(monster, this.monsterZone);
            }
            this.monsterZone.push(this.summoningCard);
            this.eventBus.$emit("tributes-selected", this.tributes);
            this.eventBus.$emit("tribute-success", this.summoningCard);
            this.tributes = [];
            this.tributeAmount = 0;
            this.summoningCard = null;
          }
        }
      } else if (this.gameState.phase === "Battle") {
        this.eventBus.$emit("select-monster-card", card);
      }
    },

    setAttack(card) {
      if (this.player === this.gameState.turn && this.mainPhases.includes(this.gameState.phase)) {
        card.position = "atk";
      }
    },

    setDefence(card) {
      if (this.player === this.gameState.turn && this.mainPhases.includes(this.gameState.phase)) {
        card.position = "def";
      }
    },

    checkMonsterZone() {
      if (this.monsterZone.length === 0 ) {
        this.eventBus.$emit("empty-monster-zone", this.noCard);
      }
    }
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

.monster-zone {
  margin: 2px 6px;
  opacity: 1;
}

.monster-container {
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 180px;
  width: 575px;
  display: flex;
  opacity: 0.7;
}

.blue {
  background-image: url('../../public/img/yugioh_obelisk.jpg');
}

.yellow {
  background-image: url('../../public/img/yugioh_ra.jpg');
}
</style>
