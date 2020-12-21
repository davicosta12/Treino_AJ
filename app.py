from flask import Flask, jsonify, request, Response
app = Flask(__name__)

users = [
  { 'id': 1, 'name': 'David Carvalho', 'email': 'david.carvalho@ajdesenvolvimento.com.br' },
]

@app.route('/users', methods=['GET', 'POST'])
def get_insert_users():
  if request.method == 'GET':
    return jsonify(users)

  if request.method == 'POST':
    body = request.form.to_dict(flat=False)
    users.append({
      'id': int(body['id'][0]),
      'name': body['name'][0],
      'email': body['email'][0],
    })
    return jsonify({ "message": "Incluído com sucesso" }), 201


@app.route('/users/<id>', methods=['PUT', 'DELETE'])
def update_delete_user(id=None):
  if request.method == 'PUT':
    body = request.form.to_dict(flat=False)
    for user in users:
      if (user['id'] == int(id)):
        user.update({
          'name': body['name'][0],
          'email': body['email'][0]
        })
        return jsonify({ "message": "Alterado com sucesso" }), 201
    return jsonify({ "message": "ID não localizado" }), 404

  if request.method == 'DELETE':
    for user in users:
      if (user['id'] == int(id)):
        users.remove(user)
        return ('', 204)
    return jsonify({ "message": "ID não localizado" }), 404