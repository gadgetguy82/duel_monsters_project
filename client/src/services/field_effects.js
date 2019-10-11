export const addToCardBuffInArray = ({action, fieldCard}, event, array) => {
  const evtArray = event.split("-");
  const buff = evtArray[evtArray.length - 1];
  array.forEach(handCard => {
    if (handCard[fieldCard.affects.on] === fieldCard.affects[fieldCard.affects.on]) {
      if (action === "add") {
        handCard.buff[buff] = handCard.buff[buff] ? handCard.buff[buff] + parseInt(fieldCard.effect[event]) : parseInt(fieldCard.effect[event]);
      } else if (action === "remove") {
        handCard.buff[buff] -= parseInt(fieldCard.effect[event]);
      }
    }
  });
}

export const alterCardStatInArray = ({action, fieldCard}, event, array) => {
  const evtArray = event.split("-");
  const stat = evtArray[evtArray.length - 1];
  array.forEach(handCard => {
    if (handCard[fieldCard.affects.on] === fieldCard.affects[fieldCard.affects.on]) {
      if (action === "add") {
        handCard[stat] = parseInt(handCard[stat]) + parseInt(fieldCard.effect[event]);
      } else if (action === "remove") {
        handCard[stat] -= parseInt(fieldCard.effect[event]);
      }
    }
  });
}

export const addToCardBuff = ({action, fieldCard, currentCard}, event) => {
  const evtArray = event.split("-");
  const buff = evtArray[evtArray.length - 1];
  if (currentCard[fieldCard.affects.on] === fieldCard.affects[fieldCard.affects.on]) {
    if (action === "add") {
      currentCard.buff[buff] = currentCard.buff[buff] ? currentCard.buff[buff] + parseInt(fieldCard.effect[event]) : parseInt(fieldCard.effect[event]);
    }
  }
}

export const alterCardStat = ({action, fieldCard, currentCard}, event) => {
  const evtArray = event.split("-");
  const stat = evtArray[evtArray.length - 1];
  if (currentCard[fieldCard.affects.on] === fieldCard.affects[fieldCard.affects.on]) {
    if (action === "add") {
      currentCard[stat] = parseInt(currentCard[stat]) + parseInt(fieldCard.effect[event]);
    }
  }
}
