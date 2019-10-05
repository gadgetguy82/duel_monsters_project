<template lang="html">
  <div id="development">
    <div class="development-container">
      <div class="button-update-container">
        <game-button :text="'Update first set of cards'" :colour="'brown'" v-on:click.native="updateFirstSetOfCards"></game-button>
        <game-button :text="'Update second set of cards'" :colour="'brown'" v-on:click.native="updateSecondSetOfCards"></game-button>
        <game-button :text="'Update third set of cards'" :colour="'brown'" v-on:click.native="updateThirdSetOfCards"></game-button>
        <game-button :text="'Update fourth set of cards'" :colour="'brown'" v-on:click.native="updateFourthSetOfCards"></game-button>
      </div>
      <div class="button-container">
        <game-button :text="'Effect'" :colour="'orange'" v-on:click.native=""></game-button>
        <game-button :text="'Fusion'" :colour="'violet'" v-on:click.native=""></game-button>
        <game-button :text="'Gemini'" :colour="'orange'" v-on:click.native=""></game-button>
        <game-button :text="'Link'" :colour="'dark-blue'" v-on:click.native=""></game-button>
        <game-button :text="'Pendulum'" :colour="'green'" v-on:click.native=""></game-button>
        <game-button :text="'Ritual'" :colour="'light-blue'" v-on:click.native=""></game-button>
        <game-button :text="'Spirit'" :colour="'orange'" v-on:click.native=""></game-button>
        <game-button :text="'Synchro'" :colour="'white'" v-on:click.native=""></game-button>
        <game-button :text="'Toon'" :colour="'orange'" v-on:click.native=""></game-button>
        <game-button :text="'Tuner'" :colour="'orange'" v-on:click.native=""></game-button>
        <game-button :text="'Union'" :colour="'orange'" v-on:click.native=""></game-button>
        <game-button :text="'XYZ'" :colour="'black'" v-on:click.native=""></game-button>
        <game-button :text="'Token'" :colour="'gray'" v-on:click.native=""></game-button>
        <game-button :text="'Skill'" :colour="'light-blue'" v-on:click.native=""></game-button>
        <game-button :text="'Spell'" :colour="'green'" v-on:click.native=""></game-button>
        <game-button :text="'Trap'" :colour="'purple'" v-on:click.native=""></game-button>
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
      normalMonsters: this.normalCards, // Normal Monster: 647 - 647 yellow/black
      effectMonsters: [], // Effect Monster: 3919 - 3919 orange/black
      fusionMonsters: [], // Fusion Monster: 328 - 332 violet/black
      geminiMonsters: [], // Gemini Monster: 43 - 43 orange/black
      linkMonsters: [], // Link Monster: 259 - 259 dark-blue/white
      pendulumMonsters: [], // Pendulum Monster: 251 - 256 green/black
      ritualMonsters: [], // Ritual Monster: 94 - 94 light-blue/black
      spiritMonsters: [], // Spirit Monster: 30 - 30 orange/black
      synchroMonsters: [], // Synchro Monster: 325 - 321 white/black
      toonMonsters: [], // Toon Monster: 15 - 15 orange/black
      tunerMonsters: [], // Tuner Monster: 336 - 336 orange/black
      unionMonsters: [], // Union Effect Monster: 32 - 32 orange/black
      xyzMonsters: [], // XYZ Monster: 395 - 390 black/white
      tokenCards: [], // Token: 107 - 107 gray/black
      skillCards: [], // Skill Card: 37 - 37 light-blue/black
      spellCards: [], // Spell Card: 1872 - 1872 green/white
      trapCards: [], // Trap Card: 1509 - 1509 purple/white
      typeCount: {},
      spellTypeCount: {}
    }
  },
  mounted() {
    this.allCards.forEach(card => {
      if (card.type === "Effect Monster" || card.type === "Flip Effect Monster") {
        this.effectMonsters.push(card);
      } else if (card.type.includes("Fusion Monster")) {
        this.fusionMonsters.push(card);
      } else if (card.type.includes("Gemini")) {
        this.geminiMonsters.push(card);
      } else if (card.type.includes("Link")) {
        this.linkMonsters.push(card);
      } else if (card.type.includes("Pendulum")) {
        this.pendulumMonsters.push(card);
      } else if (card.type.includes("Ritual")) {
        this.ritualMonsters.push(card);
      } else if (card.type.includes("Spirit")) {
        this.spiritMonsters.push(card);
      } else if (card.type.includes("Synchro")) {
        this.synchroMonsters.push(card);
      } else if (card.type.includes("Toon")) {
        this.toonMonsters.push(card);
      } else if (card.type.includes("Tuner")) {
        this.tunerMonsters.push(card);
      } else if (card.type.includes("Union")) {
        this.unionMonsters.push(card);
      } else if (card.type.includes("XYZ")) {
        this.xyzMonsters.push(card);
      } else if (card.type.includes("Token")) {
        this.tokenCards.push(card);
      } else if (card.type === "Skill Card") {
        this.skillCards.push(card);
      } else if (card.type === "Spell Card") {
        this.spellCards.push(card);
        if (this.spellTypeCount.hasOwnProperty(card.race)) {
          this.spellTypeCount[card.race]++;
        } else {
          this.spellTypeCount[card.race] = 1;
        }
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
    console.log(this.spellTypeCount);
  },
  methods: {
    updateFirstSetOfCards() {
      this.updateEffectMonsterCards();
    },

    updateSecondSetOfCards() {
      this.updateNormalMonsterCards();
      this.updateFusionMonsterCards();
      this.updateGeminiMonsterCards();
      this.updateLinkMonsterCards();
      this.updatePendulumMonsterCards();
      this.updateRitualMonsterCards();
    },

    updateThirdSetOfCards() {
      this.updateSpiritMonsterCards();
      this.updateSynchroMonsterCards();
      this.updateToonMonsterCards();
      this.updateTunerMonsterCards();
      this.updateUnionMonsterCards();
      this.updateXyzMonsterCards();
    },

    updateFourthSetOfCards() {
      this.updateTokenCards();
      this.updateSkillCards();
      this.updateSpellCards();
      this.updateTrapCards();
    },

    updateNormalMonsterCards() {
      DBService.postCards(this.normalMonsters, "normal_monsters/all");
    },

    updateEffectMonsterCards() {
      DBService.postCards(this.effectMonsters, "effect_monsters/all");
    },

    updateFusionMonsterCards() {
      DBService.postCards(this.fusionMonsters, "fusion_monsters/all");
    },

    updateGeminiMonsterCards() {
      DBService.postCards(this.geminiMonsters, "gemini_monsters/all");
    },

    updateLinkMonsterCards() {
      DBService.postCards(this.linkMonsters, "link_monsters/all");
    },

    updatePendulumMonsterCards() {
      DBService.postCards(this.pendulumMonsters, "pendulum_monsters/all");
    },

    updateRitualMonsterCards() {
      DBService.postCards(this.ritualMonsters, "ritual_monsters/all");
    },

    updateSpiritMonsterCards() {
      DBService.postCards(this.spiritMonsters, "spirit_monsters/all");
    },

    updateSynchroMonsterCards() {
      DBService.postCards(this.synchroMonsters, "synchro_monsters/all");
    },

    updateToonMonsterCards() {
      DBService.postCards(this.toonMonsters, "toon_monsters/all");
    },

    updateTunerMonsterCards() {
      DBService.postCards(this.tunerMonsters, "tuner_monsters/all");
    },

    updateUnionMonsterCards() {
      DBService.postCards(this.unionMonsters, "union_monsters/all");
    },

    updateXyzMonsterCards() {
      DBService.postCards(this.xyzMonsters, "xyz_monsters/all");
    },

    updateTokenCards() {
      DBService.postCards(this.tokenCards, "token_cards/all");
    },

    updateSkillCards() {
      DBService.postCards(this.skillCards, "skill_cards/all");
    },

    updateSpellCards() {
      DBService.postCards(this.spellCards, "spell_cards/all");
    },

    updateTrapCards() {
      DBService.postCards(this.trapCards, "trap_cards/all");
    },
  }
}
</script>

<style lang="css" scoped>
.button-update-container {
  display: flex;
  flex-direction: row;
}
</style>
