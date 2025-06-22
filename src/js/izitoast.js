import 'izitoast/dist/css/iziToast.min.css';

export function getIziToastOptions({ message, isErrorType }) {
  return ({
    icon: isErrorType ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-check',
    iconColor: 'white',
    message,
    messageColor: 'white',
    position: 'topRight',
    timeout: 4000,
    color: isErrorType ? '#EF4040' : '#00BFFF',
    maxWidth: '500px',
  });
}