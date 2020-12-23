const $table_body = document.getElementById('table-body');
const $btn_add = document.getElementById('btn_add');
const $value_inputs = document.getElementsByClassName('label-input');
const $contador = document.getElementById('span');
 
$btn_add.addEventListener('click', () => {
    enviaDado();
});

const enviaDado = () => {
    axios.post('http://127.0.0.1:5000/users', {
        id: $value_inputs[0].value, 
        name: $value_inputs[1].value, 
        email: $value_inputs[2].value
        })
        .then((response) => {
            iniciaComOsDados()
          })
          .catch((error) => {
            if(error.status === 404) alert('Código não localizado!');
            else alert('Ocorreu um erro ao processar as informações');
          });
}

const iniciaComOsDados = () => {
    axios.get('http://127.0.0.1:5000/users')
      .then((resp) => {
        // handle success
        const userlist = resp.data;
        contaNumerolinhas(userlist);
        apagaInputs();
        
        $table_body.innerHTML = '';
        for(let item of userlist) {
            $table_body.innerHTML += `<td> ${item.id} </td>
                                      <td> ${item.name} </td>
                                      <td> ${item.email} </td>
                                      <td style=" background: none; border: none; "> 
                                        <button onclick="deletaDado(event)" class="btn btn-secondary" codigoID="${item.id}">Excluir</button> 
                                      </td> 
                                      <td style=" background: none; border: none; ">  
                                        <button onclick="openModal(event)" data-target="modal1" class="btn modal-trigger" 
                                        codigoID="${item.id}" nome="${item.name}" email="${item.email}">Editar</button> 
                                      </td>`;                                                      
        }               
      })
      .catch((error) => {
        // handle error
        if(error.status === 404) alert('Código não localizado!');
        else alert('Ocorreu um erro ao processar as informações');
      })
      .then(() => {
        // always executed
      });
}

const deletaDado = (event) => {
    const $btn_content_ID = event.target.getAttribute("codigoID");

    axios.delete(`http://127.0.0.1:5000/users/${$btn_content_ID}`)
        .then((response) => {
            iniciaComOsDados();
          })
          .catch((error) => { 
            if(error.status === 404) alert('Código não localizado!');
            else alert('Ocorreu um erro ao processar as informações'); 
          });
}

const atualizaDado = () => {
    axios.put(`http://127.0.0.1:5000/users/${$btn_ID}`, {
        name: $name, 
        email: $email
    })
    .then((response) => {
        iniciaComOsDados();
    })
    .catch((error) => { 
        if(error.status === 404) alert('Código não localizado!');
        else alert('Ocorreu um erro ao processar as informações'); 
    });
}

const contaNumerolinhas = (userlist) => {
    $contador.textContent = ' ' + userlist.length;
}

const apagaInputs = () => {
    for(let item of $value_inputs) item.value = '';
}

/* ********************************  Botão Editar  ************************************  */

const elems = document.querySelectorAll('.modal');
const $input_modal = document.getElementsByClassName('label-input-modal');
const $btn_edit_ok = document.getElementById('modal-footer__btn');
let $btn_ID;
let $name; 
let $email;

function openModal(event) {
    const instances = M.Modal.init(elems);
    $btn_ID = event.target.getAttribute("codigoID");
    $name = event.target.getAttribute("nome");
    $email = event.target.getAttribute("email");

    $input_modal[0].value = $btn_ID;
    $input_modal[1].value = $name;
    $input_modal[2].value = $email;
}

$btn_edit_ok.addEventListener('click', () => {
    $btn_ID = $input_modal[0].value;
    $name = $input_modal[1].value;
    $email = $input_modal[2].value;
    atualizaDado();
});


