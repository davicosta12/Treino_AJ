const contaNumerolinhas = userlist => {
    $contador.textContent = ' ' + userlist.length;
  }
  
  const disabledInputs = () => {
    for(let item of $value_inputs) item.classList.add('disabled');
  }
  
  const removeDisabled = $value_inputs => {
    for(let item of $value_inputs) item.classList.remove('disabled');
  }
  
  const apagaInputs = $value_inputs => {
    for(let item of $value_inputs) item.value = '';
  }
  
  const removeBarrerAndBtnAdd = () => {
    $linear_barrer2.classList.remove('progress');    
    $linear_barrer.classList.remove('progress');
    $btn_add.classList.remove('disabled');
  }
  
  const removeDiversasClasses = () => {
    $linear_barrer.classList.remove('progress');
    $btn_edit_ok.classList.remove('disabled');
    removeDisabled($input_modal);
    $textarea.classList.remove('disabled');
  }

  const DiversasAplicacoes = () => {
    $linear_barrer.classList.add('progress');
    disabledInputs($input_modal);
    apagaInputs($input_modal);
    setAttributeDisabled($input_modal, $textarea);
    $textarea.value = '';
    $textarea.classList.add('disabled');
  }

  const preencheArray = ($input_modal, $textarea) => {
    const arrayElements = [];
    for(let elem of $input_modal ) arrayElements.push(elem);
    arrayElements.push($textarea);
    return arrayElements;
  }