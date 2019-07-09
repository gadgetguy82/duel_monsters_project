export default {
  changeTurn(turn) {
    if (turn === "playerOne") {
      return "playerTwo";
    } else {
      return "playerOne";
    }
  },
  changePhase(phase) {
    switch (phase) {
      case "draw":
      phase = "standby";
      break;
      case "standby":
      phase = "first main";
      break;
      case "first main":
      phase = "battle";
      break;
      case "battle":
      phase = "second main";
      break;
      case "second main":
      phase = "end";
      break;
      case "end":
      phase = "draw"
    }
    return phase;
  }
}
