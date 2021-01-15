const errorHandler = (err, message = null) => {
  console.error(err);
  const defaultMessage = 'Ocorreu um erro ao processar as informações';
  window.toast({ html: `${message || defaultMessage}`, classes: 'rounded' });
}

export default errorHandler;