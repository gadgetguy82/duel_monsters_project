use duel_monsters_game;
db.dropdatabase();

db.cards.insertMany([
  {
    name: "8-Claws Scorpion",
    attack: "300",
    defense:"200"
  },
  {
    name: "A Cat of Ill Omen",
    attack: "500",
    defense:"300"
  },
  {
    name: "A Man with Wdjat",
    attack: "1600",
    defense:"1600"
  }
]);
