import BaseService from './BaseService';

class UsersService extends BaseService {

  // GET /users
  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/users`)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // GET /users/:id
  getUser(id) {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/users/${id}`)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // POST /users
  createUser(payload) {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/users`, payload)
        .then(resp => resolve(resp)).catch(reject)
    })
  }

  // PUT /users/:id
  updateUser(id, payload) {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/users/${id}`, payload)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // DELETE /users/:id
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/users/${id}`)
        .then(() => resolve("Usuário excluído com sucesso")).catch(reject)
    });
  }

}

export default UsersService;
