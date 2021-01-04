const isValid = ($value_inputs, $textarea = '') => {
    const listaDeCaracteresNome = $value_inputs[1].value.split('');
    const listaDeCaracteresEmail = $value_inputs[2].value.split('');
  
    for(elem of $value_inputs) if( elem.value === "" ) {
      insereToast("Existe(m) campo(s) vazio(s)") 
      return true;
    }
    
    if( isNaN($value_inputs[0].value )) {
      insereToast("Escreva somente números no campo código!") 
      return true;
    } 
      
    if(validaNome(listaDeCaracteresNome)) {
      insereToast("O campo nome aceita somente valores do tipo texto!") 
      return true;
    }
  
    if(validaEmail(listaDeCaracteresEmail)) return true;
  
    if($textarea) if( $textarea.value === "" ) {
      insereToast("Existe(m) campo(s) vazio(s)") 
      return true;
    }
  }

const validaEmail = (listaDeCaracteresEmail) => {
    for( caractere of listaDeCaracteresEmail) {
        if(caractere === "@") return false; 
    }
    insereToast("O email necessita do caractere '@'!")
    return true;
}

const validaNome = (listaDeCaracteresNome) => {
    for(caractere of listaDeCaracteresNome) if( !isNaN(caractere) && caractere !== " " ) return true;
}

const validaError = () => {
  if(error.status === 404) insereToast('Código não localizado!')
  else insereToast('Ocorreu um erro ao processar as informações') 
}
