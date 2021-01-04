$btn_add.addEventListener('click', () => enviaDado())
const enviaDado = () => {
  if(isValid($value_inputs)) return;
  $linear_barrer2.classList.add('progress');
  $btn_add.classList.add('disabled');

  payload = {
    'id': $value_inputs[0].value, 
    'name': $value_inputs[1].value, 
    'email': $value_inputs[2].value,
    'obs': $textarea.value
  }

  createUser(payload)
    .then(() =>
      iniciaComOsDados().then( () => 
      insereToast('Usuário inserido com sucesso!')
      )
    )
    .catch((error) => {
      $linear_barrer2.classList.remove('progress');    
      $btn_add.classList.remove('disabled');

      if(error.status === 404)
        insereToast('Código não localizado') 
      else if (error.response && error.response.data && error.response.data.message)
        insereToast(error.response.data.message) 
      else
        insereToast('Ocorreu um erro ao processar as informações')
    })
}

const iniciaComOsDados = () => {
  return new Promise( async (resolve, reject) => {
    $linear_barrer2.classList.add('progress');
    try {
      const data = await getAllUsers();
      // handle success
      const userlist = data;
      contaNumerolinhas(userlist);
      $table_body.innerHTML = '';
      for(let item of userlist) {
          $table_body.innerHTML += `<td> ${item.id} </td>
                                    <td> ${item.name} </td>
                                    <td> ${item.email} </td>
                                    <td style=" background: none; border: none; "> 
                                      <button id="btn_exclui" onclick="deletaDado(event)" class="btn btn-secondary" codigoID="${item.id}">Excluir</button> 
                                    </td> 
                                    <td style=" background: none; border: none; ">  
                                      <button onclick="openModal(event)" data-target="modal1" class="btn_edita btn modal-trigger" 
                                      codigoID="${item.id}" nome="${item.name}" email="${item.email}">Editar</button> 
                                    </td>`;                                                      
      }
      resolve();
    }
    catch(error) {
      // handle error
      insereToast('Ocorreu um erro ao processar as informações') 
      reject(error);
    } 
    finally {
      // always executed
      apagaInputs($value_inputs);
      removeBarrerAndBtnAdd();
    }
  })
}

const get_edita = async ($ElementosUsuario) => {
  DiversasAplicacoes();
  try {
  // handle success
    const data = await getUser($btn_ID);
    const userlist = data
    const $obs = userlist.obs
    $textarea.value = $obs; 

    let i = 0;
    for(let elem of $input_modal) {
      elem.value = $ElementosUsuario[i];
      i++;
    }  
      
  }
  catch {
    // handle error
    insereToast('Ocorreu um erro ao processar as informações');
   
  }
  finally {
    // always executed
    removeDiversasClasses();
    removeAttributeDisabled($input_modal, $textarea);
  }
}

const atualizaDado = () => {
  return new Promise( (resolve, reject) => {
    $linear_barrer.classList.add('progress');
    payload = {
      'name': $name, 
      'email': $email,
      'obs': $textarea.value
    }

    updateUser($btn_ID, payload)
    .then((data) => {
      iniciaComOsDados().then(() => 
        insereToast(data.message)
      );
      resolve();
    })
    .catch(error => { 
      $linear_barrer.classList.remove('progress');
      validaError();
      reject(error);
    })
    .finally(() => {
      // always executed 
      $linear_barrer2.classList.remove('progress');
    });
  })
}

const deletaDado = async (event) => {
  $linear_barrer2.classList.add('progress');
  const $btn_content_ID = event.target.getAttribute("codigoID");
  const $btn_exclui = event.target;
  $btn_exclui.classList.add('disabled');
  for(elem of $btn_edita) if(elem.getAttribute("codigoID") === $btn_content_ID) elem.classList.add('disabled');
  
  deleteUser($btn_content_ID)
  .then((message) => {
    iniciaComOsDados()
    .then(() => insereToast(message))

  })
  .catch((error) => {
    $linear_barrer2.classList.remove('progress');
    $btn_exclui.classList.remove('disabled');
    validaError();
  })
}









