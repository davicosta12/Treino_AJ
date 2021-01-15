const showAlert = message => {
  window.toast({ html: `${message}`, classes: 'rounded' });
}

export default showAlert;