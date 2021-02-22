const checkValidation = ($value_inputs) => {
  console.log($value_inputs)
  if ($value_inputs.length === 0) {
    const message = "Existe(m) campo(s) vazio(s)"
    return { notValid: true, message };
  }
  for (let caractere of $value_inputs)
    if (!isNaN(caractere) && caractere !== " ") {
      const message = "O campo nome aceita somente valores do tipo texto!"
      return { notValid: true, message };
    }
  return false;
}
export default checkValidation;
