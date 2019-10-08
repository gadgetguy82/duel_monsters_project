const baseURL = 'http://localhost:3000/api/duel_monsters_game/';
function jsonData(body) {
  return {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  }
};

export default {
  getAllCards(route) {
    const path = route ? baseURL + route : baseURL;
    return fetch(path)
    .then(res => res.json());
  },

  postCard(body, route) {
    const path = route ? baseURL + route : baseURL;
    return fetch(path, jsonData(body)).then(res => res.json());
  },

  postCards(list, route) {
    const path = route ? baseURL + route + 'all' : baseURL;
    return fetch(path, jsonData(list)).then(res => res.json());
  },

  deleteCard(id, route) {
    const path = route ? baseURL + route : baseURL;
    return fetch(path + id, {
      method: 'DELETE'
    }).then(res => res.json());
  },

  updateCard(body, route) {
    const path = route ? baseURL + route : baseURL;
    return fetch(path + body._id, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());
  }
}
