export const addToCardBuffInArray = ({action, card}, event, array) => {
  const evtArray = event.split("-");
  const buff = evtArray[evtArray.length - 1];
  array.forEach(handCard => {
    if (handCard[card.affects.on] === card.affects[card.affects.on]) {
      if (action === "add") {
        handCard.buff[buff] = handCard.buff[buff] ? handCard.buff[buff] + parseInt(card.effect[event]) : parseInt(card.effect[event]);
      } else if (action === "remove") {
        handCard.buff[buff] -= parseInt(card.effect[event]);
      }
    }
  });
}

export const alterCardStatInArray = ({action, card}, event, array) => {
  const evtArray = event.split("-");
  const stat = evtArray[evtArray.length - 1];
  array.forEach(handCard => {
    if (handCard[card.affects.on] === card.affects[card.affects.on]) {
      if (action === "add") {
        handCard[stat] = parseInt(handCard[stat]) + parseInt(card.effect[event]);
      } else if (action === "remove") {
        handCard[stat] -= parseInt(card.effect[event]);
      }
    }
  });
}

export const addToCardBuff = ({action, card}, event, handCard) => {
  const evtArray = event.split("-");
  const buff = evtArray[evtArray.length - 1];
  if (handCard[card.affects.on] === card.affects[card.affects.on]) {
    if (action === "add") {
      handCard.buff[buff] = handCard.buff[buff] ? handCard.buff[buff] + parseInt(card.effect[event]) : parseInt(card.effect[event]);
    }
  }
}

export const attToCardStat = ({action, card}, event, handCard) => {
  const evtArray = event.split("-");
  const stat = evtArray[evtArray.length - 1];
  if (handCard[card.affects.on] === card.affects[card.affects.on]) {
    if (action === "add") {
      handCard[stat] = parseInt(handCard[stat]) + parseInt(card.effect[event]);
    }
  }
}
