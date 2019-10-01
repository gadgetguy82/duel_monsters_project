const mainPhases = ["First Main", "Second Main"];

export default {

  changeTurn(turn) {
    if (turn === "one") {
      return "two";
    } else {
      return "one";
    }
  },

  changePhase(phase) {
    switch (phase) {
      case "Start":
      phase = "Draw";
      break;
      case "Draw":
      phase = "Standby";
      break;
      case "Standby":
      phase = "First Main";
      break;
      case "First Main":
      phase = "Battle";
      break;
      case "Battle":
      phase = "Second Main";
      break;
      case "Second Main":
      phase = "End";
      break;
      case "End":
      phase = "Start"
    }
    return phase;
  },

  checkTurn({player}, {turn}) {
    return player === turn;
  },

  checkChangeTurn({player}, {turn}) {
    return !checkTurn({player}, {turn} && phase === "Start")
  },

  checkDrawPhase({player}, {turn, phase}) {
    return checkTurn({player}, {turn} && phase === "Draw");
  },

  checkStandbyPhase({player}, {turn, phase}) {
    return checkTurn({player}, {turn} && phase === "Standby");
  },

  checkMainPhase({player}, {turn, phase}) {
    return checkTurn({player}, {turn} && mainPhases.includes(phase));
  },

  checkBattlePhase({player}, {turn, phase}) {
    return checkTurn({player}, {turn} && phase === "Battle");
  },

  checkEndPhase({player}, {turn, phase}) {
    return checkTurn({player}, {turn} && phase === "End");
  },

  compareStats(card1, card2) {
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
  },

  checkDamage(card1, card2) {
    const result = this.compareStats(card1, card2);
    if (result.cards[0].position === "def") {
      result.damage = 0;
    }
    return result;
  },

  removeCard(card, array) {
    const index = array.findIndex(arrayCard => arrayCard === card);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }
}
