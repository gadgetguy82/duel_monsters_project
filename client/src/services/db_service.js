const host = process.env.HOST || 'http://localhost'
const port = process.env.PORT || 3000;
const baseURL = `${host}:${port}/api/duel_monsters_game/`;

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
    const path = route ? baseURL + route + 'all' : baseURL + 'all';
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
  },

  writeFile(route) {
    const path = route ? baseURL + route + 'write' : baseURL + 'write';
    return fetch(path)
    .then(res => res.json());
  },

  readFile(route) {
    const path = route ? baseURL + route + 'read' : baseURL + 'read';
    return fetch(path)
    .then(res => res.json());
  },

  downloadImages(body, route) {
    const path = route ? baseURL + route + 'download/' + body.indices : baseURL + 'download';
    return fetch(path)
    .then(res => res.json());
  },

  getImage(id, folder, route) {
    const path = route ? baseURL + route + 'image/' + folder : baseURL + 'image';
    return fetch(path + id);
  }
}
