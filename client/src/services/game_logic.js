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
  }
}
