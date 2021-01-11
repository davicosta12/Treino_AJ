const isValid = ($value_inputs, $textarea = '') => {
    const listaDeCaracteresNome = $value_inputs[1].value.split('');
    const listaDeCaracteresEmail = $value_inputs[2].value.split('');

    console.log($textarea)
  
    for(let elem of $value_inputs) if( elem.value === "" ) {
      alert("Existe(m) campo(s) vazio(s)") 
      return true;
    }

    if( isNaN($value_inputs[0].value )) {
        alert("Escreva somente números no campo código!") 
        return true;
      } 
        
      if(validaNome(listaDeCaracteresNome)) {
        alert("O campo nome aceita somente valores do tipo texto!") 
        return true;
      }
    
      if(validaEmail(listaDeCaracteresEmail)) return true;
    
      if($textarea) if( $textarea[0].value === "" ) {
        alert("Existe(m) campo(s) vazio(s)") 
        return true;
      }

}

const validaEmail = (listaDeCaracteresEmail) => {
    for(let caractere of listaDeCaracteresEmail) {
        if(caractere === "@") return false; 
    }
    alert("O email necessita do caractere '@'!")
    return true;
}

const validaNome = (listaDeCaracteresNome) => {
    for(let caractere of listaDeCaracteresNome) if( !isNaN(caractere) && caractere !== " " ) return true;
}

export default isValid;