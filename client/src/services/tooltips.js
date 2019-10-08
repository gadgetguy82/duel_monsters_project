export const phases = {
  start: "Click the Start button to begin your turn",
  draw: "Both players draw 5 cards at the beginning of the game as their starting hand. You draw a card from your deck at the beginning of your turn, during the Draw Phase. The player who goes first can't draw.",
  standby: "Certain effects activate during the Standby Phase. Otherwise, just ignore it.",
  firstMain: "The Main Phase is the most important part of the turn, being the phase in which you will take most of your actions. In this phase, monsters can be summoned, effects can be activated, a monster’s battle position can be manually changed, and spells and traps can be activated or set.",
  battle: "You can attack using Attack Position monsters you control during the Battle Phase. Entering the Battle Phase is optional. If you do not enter the Battle Phase, you move on to the End Phase and you do not enter Main Phase 2. The player who goes first cannot conduct the Battle Phase.",
  secondMain: "After Battle Phase, you enter Main Phase 2. In this phase, the same actions as in Main Phase 1 can be performed, except you cannot change the battle position of a card that attacked during the Battle Phase. You cannot enter this phase if you have not entered the Battle Phase.",
  end: "The End Phase is the end of your turn. Certain effects may activate in this phase. After this, it becomes the next player’s turn.",
};

export const actions = {
  summon: "To summon a monster card select whether to summon in attack/defence position using the buttons below your hand. If you do not select one then the monster will be summoned in attack position by default. Choose which monster zone you wish to summon the monster card.",
  tribute: "This monster is higher than level 4 and will require tributes, you will need to send monsters from your field to the graveyard. Levels 5 and 6 require one tribute, and Levels 7 and higher require two. A Normal Summon involving tributes is also called a Tribute Summon.",
  discard: "You have too many cards in your hand. You must discard cards to the graveyard until you only have 6 cards remaining"
};

export const hints = {
  hover: "If you hover over your cards for a short while, a larger image will show on this info box"
}
