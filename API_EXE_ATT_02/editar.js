document.addEventListener('DOMContentLoaded', () => {
  var Modalelem = document.querySelector('.modal');
  window.instance = M.Modal.init(Modalelem);
  iniciaComOsDados();
});

function openModal(event) {
  $btn_edit_ok.classList.add('disabled');
  $btn_ID = event.target.getAttribute("codigoID");
  $name = event.target.getAttribute("nome");
  $email = event.target.getAttribute("email");
  const $ElementosUsuario = [$btn_ID, $name, $email];
  get_edita($ElementosUsuario);
}

$btn_edit_ok.addEventListener('click', () => {
  const listDados = [$btn_ID, $name, $email];
  for(let i = 0; i < listDados.length; i++) listDados[i] = $input_modal[i];
  
  if(diversasValidacoes($input_modal, $textarea)) return;
  $btn_edit_ok.classList.add('disabled');
  setAttributeDisabled($input_modal, $textarea);
  atualizaDado()
  .then(() => window.instance.close());
});

const diversosAtributos = [
  {message: 'Novo código', status: ''},
  {message: 'Digite outro nome', status: 'disabled' },
  {message: 'Digite um e-mail diferente', status: 'disabled'},
  {message: 'Observações', status: 'disabled'},
];



const setAttributeDisabled = ($input_modal, $textarea) => {
  const arrayElements = preencheArray($input_modal, $textarea);
  const arrayFiltrado = arrayElements.filter((elem, index) => {
    return index !== 0;
  })

  for(let elem of arrayFiltrado) elem.setAttribute("disabled", false);
  for(let elem of arrayElements) elem.setAttribute("placeholder", "");

}

const removeAttributeDisabled = ($input_modal, $textarea) => {
  const arrayElements = preencheArray($input_modal, $textarea);
  let i = 0;
  for(let elem of arrayElements ) { 
    elem.setAttribute("placeholder", diversosAtributos[i].message);
    elem.removeAttribute(diversosAtributos[i].status) 
    i++;
  }
}