import * as constants from './constants.js';
import * as helpers from './helpers.js'

class GameLogic {

  static isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  static changePhase(gameState) {
    switch (gameState.phase) {
      case "Start":
      gameState.phase = constants.DRAW;
      break;
      case "Draw":
      gameState.phase = "Standby";
      break;
      case "Standby":
      gameState.phase = "First Main";
      break;
      case "First Main":
      gameState.phase = "Battle";
      break;
      case "Battle":
      gameState.phase = "Second Main";
      break;
      case "Second Main":
      gameState.phase = "End";
      break;
      case "End":
      gameState.turn = helpers.changeTurn(gameState.turn);
      gameState.phase = "Start";
    }
    return gameState;
  }

  static checkTurn({turn}, {player}) {
    return helpers.checkTurn({turn}, {player});
  }

  static checkChangeTurn({turn, phase}, {player}) {
    return !helpers.checkTurn({turn}, {player}) && phase === "Start";
  }

  static checkStartPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === "Start";
  }

  static checkDrawPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === "Draw";
  }

  static checkStandbyPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === "Standby";
  }

  static checkMainPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && constants.MAIN_PHASES.includes(phase);
  }

  static checkBattlePhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === "Battle";
  }

  static checkEndPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === "End";
  }

  static compareStats(card1, card2) {
    if ((card1 !== null) && (card2 !== null)) {
      const card1BattleStat = card1.position === "atk" ? parseInt(card1.atk) : parseInt(card1.def)
      const card2BattleStat = card2.position === "atk" ? parseInt(card2.atk) : parseInt(card2.def)
      let damage = 0;
      let losingCards = [];

      if (card1BattleStat > card2BattleStat) {
        damage = card2BattleStat - card1BattleStat;
        losingCards.push(card2);
      } else if (card1BattleStat < card2BattleStat) {
        damage = card1BattleStat - card2BattleStat;
        losingCards.push(card1);
      } else {
        losingCards.push(card1);
        losingCards.push(card2);
      }
      return {
        cards: losingCards,
        damage: damage
      }
    }
  }

  static checkDamage(card1, card2) {
    const result = this.compareStats(card1, card2);
    if (result.cards[0].position === "def") {
      result.damage = 0;
    }
    return result;
  }

  static removeCard(card, array) {
    const index = array.findIndex(arrayCard => arrayCard === card);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }
}

export default GameLogic;
