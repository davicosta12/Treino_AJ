const insereToast = (string, toastObj) => {
    Object.assign(toastObj, { html: `${string}`, classes: 'rounded' }) 
    window.M.toast(toastObj);
  }

export default insereToast;