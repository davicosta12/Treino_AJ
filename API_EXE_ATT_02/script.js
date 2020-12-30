const $table_body = document.getElementById('table-body');
const $btn_add = document.getElementById('btn_add');
const $value_inputs = document.getElementsByClassName('label-input');
const $contador = document.getElementById('span');
const $linear_barrer2 = document.getElementById('linear_barrer2');

const diversasValidacoes = ($value_inputs, $textarea = '') => {
  const listaDeCaracteresNome = $value_inputs[1].value.split('');
  const listaDeCaracteresEmail = $value_inputs[2].value.split('');

  for(elem of $value_inputs) if( elem.value === "" ) {
    alert("Existe(m) campo(s) vazio(s)");
    return true;
  }

  if( isNaN($value_inputs[0].value )) {
    alert("Escreva somente números no campo código!");
    return true;
  } 
    
  if(validaNome(listaDeCaracteresNome)) {
    alert("O campo nome aceita somente valores do tipo texto!");
    return true;
  }

  if(validaEmail(listaDeCaracteresEmail)) return true;

  if($textarea) if( $textarea.value === "" ) {
    alert("Existe(m) campo(s) vazio(s)");
    return true;
  }
}

const validaEmail = (listaDeCaracteres) => {
  for( caractere of listaDeCaracteres) {
    if(caractere === "@") return false; 
  }
  alert("O email necessita do caractere '@'!");
  return true;
}

const validaNome = (listaDeCaracteres) => {
  for(caractere of listaDeCaracteres) if( !isNaN(caractere) && caractere !== " " ) return true;
}

$btn_add.addEventListener('click', () => {
  enviaDado();
});

const enviaDado = () => {
  if(diversasValidacoes($value_inputs)) return;
  $linear_barrer2.classList.add('progress');
  $btn_add.classList.add('disabled');

  payload = {
    'id': $value_inputs[0].value, 
    'name': $value_inputs[1].value, 
    'email': $value_inputs[2].value,
    'obs': $textarea.value
  }

  createUser(payload)
  .then((data) => {
      iniciaComOsDados()
      .then( () => M.toast({html: "Usuário inserido com sucesso!", classes: 'rounded'} ));
    
    })
  .catch((error) => {
    $linear_barrer2.classList.remove('progress');    
    $btn_add.classList.remove('disabled');

    if(error.status === 404) M.toast({html: 'Código não localizado!', classes: 'rounded'});
    else if(error.response && error.response.data && error.response.data.message) M.toast({html: error.response.data.message, classes: 'rounded'});
    else M.toast({html: 'Ocorreu um erro ao processar as informações', classes: 'rounded'});
    })
  .then((message) => {
    // always executed 
  });
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
    }
    catch(error) {
      // handle error
      M.toast({html: 'Ocorreu um erro ao processar as informações', classes: 'rounded'});
    } 
    finally {
      // always executed
      apagaInputs($value_inputs);
      removeBarrerAndBtnAdd();
      resolve();
    }
  })
}

const get_edita = async () => {
  $linear_barrer.classList.add('progress');
  disabledInputs($input_modal);
  apagaInputs($input_modal);
  setAttributeDisabled($input_modal, $textarea);
  $textarea.value = '';
  $textarea.classList.add('disabled');

  try {
  // handle success
    const data = await getUser($btn_ID);
    const userlist = data
    const $obs = userlist.obs

    $input_modal[0].value = $btn_ID;
    $input_modal[1].value = $name;
    $input_modal[2].value = $email;

    $textarea.value = $obs;   

  }
  catch {
    // handle error
    M.toast({html: 'Ocorreu um erro ao processar as informações', classes: 'rounded'});

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
      iniciaComOsDados()
      .then(() => M.toast({html: data.message, classes: 'rounded'} ));
      
    })
    .catch((error) => { 
      $linear_barrer.classList.remove('progress');
      if(error.status === 404) M.toast({html: 'Código não localizado!', classes: 'rounded'});
      else M.toast({html: 'Ocorreu um erro ao processar as informações', classes: 'rounded'}); 
    })
    .then(() => {
      // always executed 
      $linear_barrer2.classList.remove('progress');
      resolve();
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
    .then(() => M.toast({html: message, classes: 'rounded'} ));

  })
  .catch((error) => {
    $linear_barrer2.classList.remove('progress');
    $btn_exclui.classList.remove('disabled');

    if(error.status === 404) M.toast({html: 'Código não localizado!', classes: 'rounded'});
    else M.toast({html: 'Ocorreu um erro ao processar as informações', classes: 'rounded'}); 
  })
  .then(() =>{

  })
}

const contaNumerolinhas = (userlist) => {
  $contador.textContent = ' ' + userlist.length;
}

const disabledInputs = () => {
  for(let item of $value_inputs) item.classList.add('disabled');
}

const removeDisabled = ($value_inputs) => {
  for(let item of $value_inputs) item.classList.remove('disabled');
}

const apagaInputs = ($value_inputs) => {
  for(let item of $value_inputs) item.value = '';
}

const removeBarrerAndBtnAdd = () => {
  $linear_barrer2.classList.remove('progress');    
  $linear_barrer.classList.remove('progress');
  $btn_add.classList.remove('disabled');
}

const removeDiversasClasses = () => {
  $linear_barrer.classList.remove('progress');
  $btn_edit_ok.classList.remove('disabled');
  removeDisabled($input_modal);
  $textarea.classList.remove('disabled');
}

/* ********************************  Botão Editar  ************************************  */

document.addEventListener('DOMContentLoaded', function () {
  var Modalelem = document.querySelector('.modal');
  window.instance = M.Modal.init(Modalelem);
  iniciaComOsDados();
});

const $btn_edita = document.getElementsByClassName('btn_edita');
const $input_modal = document.getElementsByClassName('label-input-modal');
const $btn_edit_ok = document.getElementById('modal-footer__btn');
const $textarea = document.getElementById('textarea1');
const $linear_barrer = document.getElementById('linear_barrer');
let $btn_ID;
let $name; 
let $email;

function openModal(event) {
  $btn_edit_ok.classList.add('disabled');
  $btn_ID = event.target.getAttribute("codigoID");
  $name = event.target.getAttribute("nome");
  $email = event.target.getAttribute("email");
  get_edita();
}

$btn_edit_ok.addEventListener('click', () => {
  $btn_ID = $input_modal[0].value;
  $name = $input_modal[1].value;
  $email = $input_modal[2].value;

  if(diversasValidacoes($input_modal, $textarea)) return;
  $btn_edit_ok.classList.add('disabled');
  setAttributeDisabled($input_modal, $textarea);
  atualizaDado()
  .then(() => window.instance.close());
});

const setAttributeDisabled = ($input_modal, $textarea) => {
  $input_modal[1].setAttribute("disabled", false);
  $input_modal[2].setAttribute("disabled", false);
  $textarea.setAttribute("disabled", false);

  for(input of $input_modal) input.setAttribute("placeholder", "");
  $textarea.setAttribute("placeholder", "");
}

const removeAttributeDisabled = ($input_modal, $textarea) => {
  $input_modal[1].removeAttribute('disabled');
  $input_modal[2].removeAttribute('disabled');
  $textarea.removeAttribute('disabled');

  $input_modal[0].setAttribute("placeholder", "Novo código");
  $input_modal[1].setAttribute("placeholder", "Digite outro nome");
  $input_modal[2].setAttribute("placeholder", "Digite um e-mail diferente");
  $textarea.setAttribute("placeholder", "Observações");
}




