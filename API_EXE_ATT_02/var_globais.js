/************************************* Variáveis do script.js ***********************************************/

const $table_body = document.getElementById('table-body');
const $btn_add = document.getElementById('btn_add');
const $value_inputs = document.getElementsByClassName('label-input');
const $contador = document.getElementById('span');
const $linear_barrer2 = document.getElementById('linear_barrer2');
const toastObj = { 
  html: '', 
  classes: 'rounded',
};

/************************** Variáveis do evento editar ****************************************/

const $btn_edita = document.getElementsByClassName('btn_edita');
const $input_modal = document.getElementsByClassName('label-input-modal');
const $btn_edit_ok = document.getElementById('modal-footer__btn');
const $textarea = document.getElementById('textarea1');
const $linear_barrer = document.getElementById('linear_barrer');
let $btn_ID;
let $name; 
let $email;



