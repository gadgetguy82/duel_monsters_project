<template lang="html">
  <div id="development">
    <div class="development-container">
      <div class="button-container">
        <game-button :text="'Update Normal Monster Cards'" :colour="'yellow'" v-on:click.native="updateNormalMonsterCards"></game-button>
        <game-button :text="'Update Effect Monster Cards'" :colour="'orange'" v-on:click.native="updateEffectMonsterCards"></game-button>
        <game-button :text="'Update Flip Effect Monster Cards'" :colour="'orange'" v-on:click.native="updateFlipEffectMonsterCards"></game-button>
        <game-button :text="'Update Fusion Monster Cards'" :colour="'violet'" v-on:click.native="updateFusionMonsterCards"></game-button>
        <game-button :text="'Update Ritual Monster Cards'" :colour="'light-blue'" v-on:click.native="updateRitualMonsterCards"></game-button>
        <game-button :text="'Update Ritual Effect Monster Cards'" :colour="'light-blue'" v-on:click.native="updateRitualEffectMonsterCards"></game-button>
        <game-button :text="'Update Spell Cards'" :colour="'green'" v-on:click.native="updateSpellCards"></game-button>
        <game-button :text="'Update Trap Cards'" :colour="'purple'" v-on:click.native="updateTrapCards"></game-button>
      </div>
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
      normalMonsterCards: this.normalCards, // Normal Monster: 647
      effectMonsterCards: [], // Effect Monster: 3755
      flipEffectMonsterCards: [], // Flip Effect Monster: 164
      fusionMonsterCards: [], // Fusion Monster: 328
      ritualMonsterCards: [], // Ritual Monster: 15
      ritualEffectMonsterCards: [], // Ritual Effect Monster: 79
      spellCards: [], // Spell Card: 1872
      trapCards: [], // Trap Card: 1509
      typeCount: {}

      // Gemini Monster: 43
      // Link Monster: 259
      // Normal Tuner Monster: 10
      // Pendulum Effect Fusion Monster: 4
      // Pendulum Effect Monster: 205
      // Pendulum Flip Effect Monster: 1
      // Pendulum Normal Monster: 35
      // Pendulum Tuner Effect Monster: 6
      // Skill Card: 37
      // Spirit Monster: 30
      // Synchro Monster: 304
      // Synchro Pendulum Effect Monster: 4
      // Synchro Tuner Monster: 17
      // Token: 107
      // Toon Monster: 15
      // Tuner Monster: 326
      // Union Effect Monster: 32
      // XYZ Monster: 390
      // XYZ Pendulum Effect Monster: 5
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
    },

    updateEffectMonsterCards() {
      DBService.postCards(this.normalMonsterCards, "effect_monster_cards/all");
    },

    updateFlipEffectMonsterCards() {
      DBService.postCards(this.normalMonsterCards, "flip_effect_monster_cards/all");
    },

    updateFusionMonsterCards() {
      DBService.postCards(this.normalMonsterCards, "fusion_monster_cards/all");
    },

    updateRitualMonsterCards() {
      DBService.postCards(this.normalMonsterCards, "ritual_monster_cards/all");
    },

    updateRitualEffectMonsterCards() {
      DBService.postCards(this.normalMonsterCards, "ritual_effect_monster_cards/all");
    },

    updateSpellCards() {
      DBService.postCards(this.normalMonsterCards, "spell_cards/all");
    },

    updateTrapCards() {
      DBService.postCards(this.normalMonsterCards, "trap_cards/all");
    },
  }
}
</script>

<style lang="css" scoped>
.button-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}
</style>
