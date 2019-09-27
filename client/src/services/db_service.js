const baseURL = 'http://localhost:3000/api/duel_monsters_game/';

export default {
  getAllCards() {
    return fetch(baseURL)
    .then(res => res.json());
  },
  
  getAllStoreCards(){
    return fetch(baseURL)
    .then(res => res.json());
  },

  postCard(body) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  },

  postCards(list) {
    return fetch(baseURL + 'all', {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  }
}
