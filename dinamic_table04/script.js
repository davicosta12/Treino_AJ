var arr = [];
var $table_body = document.getElementById('table-body');
var $trow_body = document.getElementsByTagName('tr');
var $contador = document.getElementById('span');
var $btn_add = document.getElementById('btn_add');
var $btn_limpa = document.getElementById('btn_limpa');
var $value_inputs = document.getElementsByClassName('label-input');
var $btn_content;
var index_tr;

limpaConteudoGeral();
    
$btn_add.addEventListener('click', addItemNaTabela);
function addItemNaTabela() {

    /* Se existir um campo vazio, mostre um alert e retorne 0 */ 
    for( var i=0; i<$value_inputs.length; i++ ) {
        if( !$value_inputs[i].value) {
            alert('Preencha todos os campos!');
            return 0;
        }    
    }

    /* Os campos nome e email não podem aceitar valores do tipo number */ 
    if( !isNaN($value_inputs[1].value) || !isNaN($value_inputs[2].value) ) {
        alert('Os campos nome e email aceitam somente valores do tipo string! ');
        return 0;
    } 

    /* Preenche o array com objects (contém os valores dos inputs) e limpa o array global */
    arr.push(Object.assign({}, {codigo: $value_inputs[0].value},{nome: $value_inputs[1].value}, {email: $value_inputs[2].value}));  
            
    /* Verifica se existe um código parecido nos outros objects */ 
    for (var i=0; i<arr.length - 1; i++) {
        if( arr[i].codigo === arr[arr.length - 1].codigo ) {
            arr.pop(); // Retira o ultimo item do array
            alert('Valor de código já existe!');
            return 0;
        }
    }

    // Chama uma função que retorna uma mensagem que contém uma tr com suas respectivas tds
    $table_body.innerHTML += retornaMensagem(); 
    console.log($table_body);
    console.log(arr); 

    /* Chama o contador de tr */
    contaNumerolinhas();

    limpaConteudoInputs();

    /* Coloca o foco no campo código */
    $value_inputs[0].focus();

}

function retornaMensagem() {
    var mensagem = '';
    mensagem =  "<td class='td_body'>" + arr[arr.length - 1].codigo + "</td>" + 
                "<td class='td_body'>" + arr[arr.length - 1].nome + "</td>" + 
                "<td class='td_body'>" + arr[arr.length - 1].email + "</td>" + 
                '<td style=" background: none; border: none; ">' + 
                '<button onclick="escolheARR(event)" class="button btnApagaLinha" codigoID="' + arr[arr.length - 1].codigo + '">Excluir</button>' + 
                '</td>' +
                '<td style=" background: none; border: none; ">' + 
                '<button id="myBtn" onclick="openModal(event)" class="button" codigoID="' + arr[arr.length - 1].codigo + 
                '" nomeID= "' + arr[arr.length - 1].nome + '" emailID= "' + arr[arr.length - 1].email + '" >Editar</button>' +
                '</td>';
                               
    return mensagem;
}

function escolheARR(event) {
    $btn_content = parseInt(event.target.getAttribute("codigoID"));
    index_tr = procuraIndexDoArr();
    apagatr();
    filtraArray();
}

function procuraIndexDoArr() {
    for( var i=0; i<arr.length; i++) 
        if( $btn_content === parseInt(arr[i].codigo)) return i;
}

function apagatr() {
    $table_body.removeChild($table_body.childNodes[index_tr]);
    contaNumerolinhas();
}

function filtraArray() {
    arr = arr.filter(function( el ){
        return parseInt(el.codigo) !== $btn_content;
    });   
}

function contaNumerolinhas() {
    $contador.textContent = ' ' + $trow_body.length - 1;
}

$btn_limpa.addEventListener('click', limpaConteudoGeral);
function limpaConteudoGeral() {
    $table_body.innerHTML = '';
    console.log($table_body);
    console.log(arr);
    arr = [];
    limpaConteudoInputs();

    /* O conteúdo do span volta a ser  0 */ 
    $contador.textContent = 0;

    /* Coloca o foco no campo código */
    $value_inputs[0].focus();

}

function limpaConteudoInputs() {
    for( var i=0; i<$value_inputs.length; i++) $value_inputs[i].value = '';
}
   


/* Modal Box */ 

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    for( var i=0; i<$input_modal.length; i++) $input_modal[i].value = '';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
    }      
}



/*  BOTÃO EDITAR  */ 

var $btn_edit_content;
var $tds_body = document.getElementsByClassName('td_body');
var $btn_edit_ok = document.getElementById('modal-footer__btn');
var $input_modal = document.getElementsByClassName('label-input-modal');
var armazena_codigo;
var guarda_linha;
var array_tds;

// When the user clicks on the button, open the modal
function openModal(event) {
    modal.style.display = "block";
    $input_modal[1].focus();
    $btn_edit_content = parseInt(event.target.getAttribute("codigoID"));

    for( var i = 0; i<arr.length; i++ ) 
        if( $btn_edit_content === parseInt(arr[i].codigo)) {
            $input_modal[0].value = arr[i].codigo;
            $input_modal[1].value = arr[i].nome;
            $input_modal[2].value = arr[i].email;
            guarda_linha = arr[i];
            armazena_codigo = parseInt(arr[i].codigo);
            break;
        } 
}

$btn_edit_ok.addEventListener('click', mudaInputs);
function mudaInputs() {

    if( !isNaN($input_modal[1].value) || !isNaN($input_modal[2].value) ) {
        alert('Os campos nome e email aceitam somente valores do tipo string! ');
        return 0;
    }
    
    colocaNovosvalores();

    for( var i = 0; i<arr.length; i++ ) 
        if( guarda_linha === arr[i] ) {
            arr[i].nome = $input_modal[1].value;
            arr[i].email = $input_modal[2].value;
            break;
    }

    guarda_linha = {};
    armazena_codigo = null;
    array_tds = [];
    modal.style.display = "none";
}

function colocaNovosvalores() { 
    for( var i = 1; i<=$trow_body.length-1; i++ ) 
        if (parseInt($trow_body[i].firstElementChild.textContent) === armazena_codigo) {
            array_tds = $trow_body[i].children;
            array_tds[1].textContent = $input_modal[1].value;
            array_tds[2].textContent = $input_modal[2].value;
            break;
        } 
}

// Fix p/ evitar o refresh da página
function onSubmit(event) {
    event.preventDefault();
} 



