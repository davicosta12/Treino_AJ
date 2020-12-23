from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

users = [
  { 'id': 1, 'name': 'David Carvalho', 'email': 'david.carvalho@ajdesenvolvimento.com.br', 'obs': '' },
]

@app.route('/users', methods=['GET', 'POST'])
def get_insert_users():
  time.sleep(1)

  if request.method == 'GET':
    items = map(lambda item: { 
      'id': item['id'],
      'name': item['name'],
      'email': item['email'],
    }, users)
    return jsonify(list(items))

  if request.method == 'POST':
    body = request.get_json()

    for user in users:
      if (user['id'] == int(body.get('id'))):
        return jsonify({ "message": "Código já existente" }), 400

    obj = {
      'id': int(body.get('id')),
      'name': body.get('name'),
      'email': body.get('email'),
      'obs': body.get('obs'),
    }

    users.append(obj)
    return jsonify(obj), 201


@app.route('/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def get_update_delete_user(id=None):
  time.sleep(1)

  if request.method == 'GET':
    for user in users:
      if (user['id'] == int(id)):
        return jsonify(user)
    return jsonify({ "message": "ID não localizado" }), 404

  if request.method == 'PUT':
    body = request.get_json()
    for user in users:
      if (user['id'] == int(id)):
        user.update({
          'name': body.get('name'),
          'email': body.get('email'),
          'obs': body.get('obs'),
        })
        return jsonify({ "message": "Alterado com sucesso" }), 201
    return jsonify({ "message": "ID não localizado" }), 404

  if request.method == 'DELETE':
    for user in users:
      if (user['id'] == int(id)):
        users.remove(user)
        return ('', 204)
    return jsonify({ "message": "ID não localizado" }), 404