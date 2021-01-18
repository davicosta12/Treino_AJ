const isNotValid = ($value_inputs) => {
  const $textarea = $value_inputs[3]
  console.log($value_inputs)
  for (let elem of $value_inputs) if (elem === "") {
    const message = "Existe(m) campo(s) vazio(s)"
    return [true, message];
  }
  if (isNaN($value_inputs[0])) {
    const message = "Escreva somente números no campo código!"
    return [true, message];
  }
  if (isNotNameValid($value_inputs[1])) {
    const message = "O campo nome aceita somente valores do tipo texto!"
    return [true, message];
  }
  if (isNotEmailValid($value_inputs[2])) {
    const message = "O email necessita do caractere '@'!"
    return [true, message];
  }
  if ($textarea === '' || $textarea === null) {
    const message = "Existe(m) campo(s) vazio(s)"
    return [true, message];
  }
  
  return  false;
}

const isNotEmailValid = (listaDeCaracteresEmail) => {
  for (let caractere of listaDeCaracteresEmail) {
    if (caractere === "@") return  false;
  }
  
  return  true;
}
const isNotNameValid = (listaDeCaracteresNome) => {
  for (let caractere of listaDeCaracteresNome) if (!isNaN(caractere) && caractere !== " ") return true;
  return  false;
}

export default isNotValid;
