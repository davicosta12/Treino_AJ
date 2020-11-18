(function(){
    'use strict'

    var arr = [];
    var $table_body = document.getElementById('table-body');
    var $trow_body = document.getElementsByTagName('tr');
    var $contador = document.getElementById('span');
    var $btn_add = document.getElementById('btn_add');
    var $btn_limpa = document.getElementById('btn_limpa');
    var $value_inputs = document.getElementsByClassName('label-input');

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
        
        console.log(arr);

        /* Verifica se existe um código parecido nos outros objects */ 
        for (var i=0; i<arr.length - 1; i++) {
            if( arr[i].codigo === arr[arr.length - 1].codigo ) {
                arr.pop(); // Retira o ultimo item do array
                alert('Valor de código já existe!');
                return 0;
            }
        }

        // Chama uma função que retorna uma mensagem que contém uma tr com suas respectivas tds
        $table_body.innerHTML += retornaMensagem(arr); 

        /* Chama o contador de tr */
        contaNumerolinhas();

        limpaConteudoInputs();

        /* Coloca o foco no campo código */
        $value_inputs[0].focus();
    }

    function retornaMensagem(arr) {
        var mensagem = '';
        mensagem = "<td>" + arr[arr.length - 1].codigo + "</td>" + "<td>" + arr[arr.length - 1].nome + "</td>" + 
                   "<td>" + arr[arr.length - 1].email + "</td>";
        return mensagem;
    }

    function contaNumerolinhas() {
        $contador.textContent = ' ' + $trow_body.length - 1;
    }

    $btn_limpa.addEventListener('click', limpaConteudoGeral);
    function limpaConteudoGeral() {
        $table_body.innerHTML = '';
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

    // Fix p/ evitar o refresh da página
    function onSubmit(event) {
        event.preventDefault();
    }  

})()

