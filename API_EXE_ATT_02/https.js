// GET /users
function getAllUsers() {
    return new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:5000/users')
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
    })
  }

// GET /users/:id
function getUser(id) {
    return new Promise((resolve, reject) => {
    axios.get(`http://127.0.0.1:5000/users/${id}`)
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
    })
}

// POST /users
function createUser(payload) {
  return new Promise((resolve, reject) => {
    axios.post('http://127.0.0.1:5000/users', payload)
    .then(resp => resolve(resp))
    .catch(error => reject(error))
  })
}

// PUT /users/:id
function updateUser(id, payload) {
  return new Promise((resolve, reject) => {
    axios.put(`http://127.0.0.1:5000/users/${id}`, payload)
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}

// DELETE /users/:id
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    axios.delete(`http://127.0.0.1:5000/users/${id}`)
    .then(resp => resolve("Usuário excluído com sucesso"))
    .catch(error => reject(error))
  });
}
