import { doRotationBackToTopButton, setActiveView } from '../actions';

const sectionActiveClass = 'js-section-active';
let rotated = false;
let active = 0;

export const getSectionVisibleInViewPort = () => {
  const section = global.document.getElementsByClassName('section');
  const { length } = section;

  for (let i = 0; i < length; i += 1) {
    const el = section[i];

    if (el.classList.contains(sectionActiveClass)) {
      return el;
    }
  }
};

export const setSectionVisibleInViewPort = (dispatch) => {
  const section = global.document.getElementsByClassName('section');
  const { length } = section;

  for (let i = 0; i < length; i += 1) {
    const el = section[i];
    const rect = el.getBoundingClientRect();

    const windowHeight = (window.innerHeight || document.documentElement.clientHeight) / 2;
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= windowHeight);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    if (vertInView && horInView) {
      const index = i + 1;

      if (active !== index) {
        el.classList.add(sectionActiveClass);
        dispatch(setActiveView(el.id));
      }

      if (index === length && !rotated) {
        dispatch(doRotationBackToTopButton(true));
        rotated = true;
      } else if (index === Math.floor(length / 2) && rotated) {
        dispatch(doRotationBackToTopButton(false));
        rotated = false;
      }

      active = index;

    } else {
      el.classList.remove(sectionActiveClass);
    }
  }
};

export const scrollTo = (id) => {
  let scrollTop;

  if (id === 'next') {
    const sectionActive = document.getElementsByClassName(sectionActiveClass);
    const isActiveNextSibling = sectionActive[0].nextElementSibling.classList.contains('section');

    if (isActiveNextSibling) {
      scrollTop = sectionActive[0].nextElementSibling.offsetTop - 70;
    } else {
      scrollTop = sectionActive[0].nextElementSibling.nextElementSibling.offsetTop - 70;
    }
  } else if (id === 'top') {
    scrollTop = 0;
  } else {
    scrollTop = document.getElementById(id).offsetTop - 70;
  }

  window.scroll({ top: scrollTop, left: 0, behavior: 'smooth' });
};
