export async function toggleModal(state, modalMenu) {
  if (state === 'open') {
    const scrollbarWidth = getScrollbarWidth();

    document.body.classList.add('modal-open');
    modalMenu.classList.remove('hidden');
    modalMenu.classList.add('is-open');

    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  }
  if (state === 'close') {
    modalMenu.classList.remove('is-open');

    setTimeout(() => {
      modalMenu.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.documentElement.style.removeProperty("--scrollbar-width");
    }, 250);
  }
}

const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;