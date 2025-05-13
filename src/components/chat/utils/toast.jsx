import { Toast } from '@chatui/core';
import { mountComponent } from './mountComponent';

function show(content, type, duration) {
  mountComponent(<Toast content={content} type={type} duration={duration} />);
}

export const toast = {
  show,
  success(content, duration) {
    show(content, 'success', duration);
  },
  fail(content, duration) {
    show(content, 'error', duration);
  },
  loading(content, duration) {
    show(content, 'loading', duration);
  },
};
