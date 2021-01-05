const API_URL = 'http://127.0.0.1:5000';

// GET /users
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
  axios.get(`${API_URL}/users`)
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}

// GET /users/:id
const getUser = id => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/users/${id}`)
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}

// POST /users
const createUser = payload => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/users`, payload)
    .then(resp => resolve(resp))
    .catch(error => reject(error))
  })
}

// PUT /users/:id
const updateUser = (id, payload) => {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URL}/users/${id}`, payload)
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}

// DELETE /users/:id
const deleteUser = id => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/users/${id}`)
    .then(() => resolve("Usuário excluído com sucesso"))
    .catch(error => reject(error))
  });
}

export default getAllUsers;
