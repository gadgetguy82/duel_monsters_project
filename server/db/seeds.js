use duel_monsters_game;
db.dropDatabase();

db.storeCards.insertMany([
  {
    name: "Simon the hobbit",
    attack: "234",
    defence: "345",
    price: "5"
  },
  {
  name: "Harry Fasbender",
  attack: "450",
  defence: "345",
  price: "7"
  },
  {
  name: "Scary Stef",
  attack: "600",
  defence: "50"
  price: "6"
  },
  {
  name: "Peter the Axe Murderer",
  attack: "900",
  defence: "760",
  price: "9"
  },
 {name: "D'n'D Kyle",
 attack: "900",
 defence: "1100",
 price: "6"
  }




])
