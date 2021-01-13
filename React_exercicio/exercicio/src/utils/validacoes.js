import showAlert from './showAlert';

const isNotValid = ($value_inputs) => {
  console.log($value_inputs)
  for (let elem of $value_inputs) if (elem === "") {
    showAlert("Existe(m) campo(s) vazio(s)")
    return true;
  }
  if (isNaN($value_inputs[0])) {
    showAlert("Escreva somente números no campo código!")
    return true;
  }
  if (isNotNameValid($value_inputs[1])) {
    showAlert("O campo nome aceita somente valores do tipo texto!")
    return true;
  }
  if (isNotEmailValid($value_inputs[2])) return true;
  
  return false;
}

const isNotValidTextArea = ($textarea) => {
  if ($textarea === '' || $textarea === null) {
    showAlert("Existe(m) campo(s) vazio(s)")
    return true;
  }
  return false;
}

const isNotEmailValid = (listaDeCaracteresEmail) => {
  for (let caractere of listaDeCaracteresEmail) {
    if (caractere === "@") return false;
  }
  showAlert("O email necessita do caractere '@'!")
  return true;
}
const isNotNameValid = (listaDeCaracteresNome) => {
  for (let caractere of listaDeCaracteresNome) if (!isNaN(caractere) && caractere !== " ") return true;
  return false;
}

export { isNotValid, isNotValidTextArea };
