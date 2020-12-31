const diversasValidacoes = ($value_inputs, $textarea = '') => {
    const listaDeCaracteresNome = $value_inputs[1].value.split('');
    const listaDeCaracteresEmail = $value_inputs[2].value.split('');
  
    for(elem of $value_inputs) if( elem.value === "" ) {
      M.toast({html: "Existe(m) campo(s) vazio(s)", classes: 'rounded'});
      return true;
    }
  
    if( isNaN($value_inputs[0].value )) {
      M.toast({html: "Escreva somente números no campo código!", classes: 'rounded'});
      return true;
    } 
      
    if(validaNome(listaDeCaracteresNome)) {
      M.toast({html: "O campo nome aceita somente valores do tipo texto!", classes: 'rounded'});
      return true;
    }
  
    if(validaEmail(listaDeCaracteresEmail)) return true;
  
    if($textarea) if( $textarea.value === "" ) {
      M.toast({html: "Existe(m) campo(s) vazio(s)", classes: 'rounded'});
      return true;
    }
  }

const validaEmail = (listaDeCaracteresEmail) => {
    for( caractere of listaDeCaracteresEmail) {
        if(caractere === "@") return false; 
    }
    M.toast({html: "O email necessita do caractere '@'!", classes: 'rounded'});
    return true;
}

const validaNome = (listaDeCaracteresNome) => {
    for(caractere of listaDeCaracteresNome) if( !isNaN(caractere) && caractere !== " " ) return true;
}

const validaError = () => {
  if(error.status === 404) M.toast({html: 'Código não localizado!', classes: 'rounded'});
  else M.toast({html: 'Ocorreu um erro ao processar as informações', classes: 'rounded'}); 
}
