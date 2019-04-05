const bodyScroll = (value) => {
  const body = global.document.getElementsByTagName('body')[0];

  if (value) {
    body.style.boxSizing = '';
    body.style.overflow = '';
  } else {
    body.style.boxSizing = 'border-box';
    body.style.overflow = 'hidden';
  }
};

export default bodyScroll;
