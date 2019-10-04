<template lang="html">
  <div id="development">
    <div class="development-container">
      <game-button :text="'Update Normal Monster Cards'" :colour="'yellow'" v-on:click.native="updateNormalMonsterCards"></game-button>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';
import DBService from '@/services/db_service';

export default {
  name: 'development',
  props: ['allCards', 'normalCards'],
  components: {
    "game-button": GameButton
  },
  data() {
    return {
      totalCards: this.allCards.length,
      normalMonsterCards: this.normalCards,
      effectMonsterCards: [],
      flipEffectMonsterCards: [],
      fusionMonsterCards: [],
      ritualMonsterCards: [],
      ritualEffectMonsterCards: [],
      spellCards: [],
      trapCards: [],
      typeCount: {}
    }
  },
  mounted() {
    this.allCards.forEach(card => {
      if (card.type === "Effect Monster") {
        this.effectMonsterCards.push(card);
      } else if (card.type === "Flip Effect Monster") {
        this.flipEffectMonsterCards.push(card);
      } else if (card.type === "Fusion Monster") {
        this.fusionMonsterCards.push(card);
      } else if (card.type === "Ritual Monster") {
        this.ritualMonsterCards.push(card);
      } else if (card.type === "Ritual Effect Monster") {
        this.ritualEffectMonsterCards.push(card);
      } else if (card.type === "Spell Card") {
        this.spellCards.push(card);
      } else if (card.type === "Trap Card") {
        this.trapCards.push(card);
      }

      if (this.typeCount.hasOwnProperty(card.type)) {
        this.typeCount[card.type]++;
      } else {
        this.typeCount[card.type] = 1;
      }
    });

    console.log(this.totalCards);
    console.log(this.typeCount);
  },
  methods: {
    updateNormalMonsterCards() {
      DBService.postCards(this.normalMonsterCards, "normal_monster_cards/all");
    }
  }
}
</script>

<style lang="css" scoped>
</style>
