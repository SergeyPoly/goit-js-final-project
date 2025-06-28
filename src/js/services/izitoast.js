import iziToast from 'izitoast';

function showMessage(message, isError) {
  iziToast.show({
    icon: isError ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-check',
    iconColor: 'white',
    message,
    messageColor: 'white',
    position: 'topRight',
    timeout: 5000,
    color: isError ? '#EF4040' : '#00BFFF',
    maxWidth: '500px',
  });
}

export function showSuccessMessage(message) {
  showMessage(message, false);
}

export function showErrorMessage(message) {
  showMessage(message, true);
}
