import * as constants from './constants.js';
import * as helpers from './helpers.js'

class GameLogic {

  static isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  static changePhase(gameState) {
    switch (gameState.phase) {
      case constants.START:
      gameState.phase = constants.DRAW;
      break;
      case constants.DRAW:
      gameState.phase = constants.STANDBY;
      break;
      case constants.STANDBY:
      gameState.phase = constants.FIRST_MAIN;
      break;
      case constants.FIRST_MAIN:
      gameState.phase = constants.BATTLE;
      break;
      case constants.BATTLE:
      gameState.phase = constants.SECOND_MAIN;
      break;
      case constants.SECOND_MAIN:
      gameState.phase = constants.END;
      break;
      case constants.END:
      gameState.turn = helpers.changeTurn(gameState.turn);
      gameState.phase = constants.START;
    }
    return gameState;
  }

  static checkTurn({turn}, {player}) {
    return helpers.checkTurn({turn}, {player});
  }

  static checkChangeTurn({turn, phase}, {player}) {
    return !helpers.checkTurn({turn}, {player}) && phase === constants.START;
  }

  static checkStartPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === constants.START;
  }

  static checkDrawPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === constants.DRAW;
  }

  static checkStandbyPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === constants.STANDBY;
  }

  static checkMainPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && constants.MAIN_PHASES.includes(phase);
  }

  static checkBattlePhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === constants.BATTLE;
  }

  static checkTarget({turn, phase}, {player}) {
    return !helpers.checkTurn({turn}, {player}) && phase === constants.BATTLE;
  }

  static checkEndPhase({turn, phase}, {player}) {
    return helpers.checkTurn({turn}, {player}) && phase === constants.END;
  }

  static compareStats(card1, card2) {
    if ((card1 !== null) && (card2 !== null)) {
      const card1BattleStat = card1.position === constants.ATTACK ? parseInt(card1.atk) : parseInt(card1.def)
      const card2BattleStat = card2.position === constants.ATTACK ? parseInt(card2.atk) : parseInt(card2.def)
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
    if (result.cards[0].position === constants.DEFEND) {
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
