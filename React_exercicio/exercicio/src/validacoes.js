import insereToast from './insereToast'

const isValid = ($value_inputs) => {
    console.log($value_inputs)
    for(let elem of $value_inputs) if( elem === "" ) {
      insereToast("Existe(m) campo(s) vazio(s)") 
      return true;
    }
    if( isNaN($value_inputs[0])) {
      insereToast("Escreva somente números no campo código!") 
        return true;
      }   
      if(validaNome($value_inputs[1])) {
        insereToast("O campo nome aceita somente valores do tipo texto!") 
        return true;
      }
      if(validaEmail($value_inputs[2])) return true;

}

const isValidTextArea = ($textarea) => {
  if( $textarea === '' || $textarea === null ) {
    insereToast("Existe(m) campo(s) vazio(s)") 
    return true;
  }
}
                 
const validaEmail = (listaDeCaracteresEmail) => {
    for(let caractere of listaDeCaracteresEmail) {
        if(caractere === "@") return false; 
    }
    insereToast("O email necessita do caractere '@'!")
    return true;
}
const validaNome = (listaDeCaracteresNome) => {
    for(let caractere of listaDeCaracteresNome) if( !isNaN(caractere) && caractere !== " " ) return true;
}

export {isValid, isValidTextArea};
