/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { task, list } from './index';

export function dragDrop() {
  task.forEach((item) => {
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = dragAfterElement(list, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement === null) {
      list.appendChild(draggable);
    }
    list.insertBefore(draggable, afterElement);
  });


  function dragAfterElement(listContainer, y) {
    const draggableElements = [...listContainer.querySelectorAll('.item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const rectangle = child.getBoundingClientRect();
      const offset = y - rectangle.top - rectangle.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return {
          offset,
          element: child,
        };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}