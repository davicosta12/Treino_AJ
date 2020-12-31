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

const validaEmail = (listaDeCaracteresEmail) => {
    for( caractere of listaDeCaracteresEmail) {
        if(caractere === "@") return false; 
    }
    alert("O email necessita do caractere '@'!");
    return true;
}

const validaNome = (listaDeCaracteresNome) => {
    for(caractere of listaDeCaracteresNome) if( !isNaN(caractere) && caractere !== " " ) return true;
}

const validaError = () => {
  if(error.status === 404) M.toast({html: 'Código não localizado!', classes: 'rounded'});
  else M.toast({html: 'Ocorreu um erro ao processar as informações', classes: 'rounded'}); 
}
