export function findIndex(indexes) {
  let index;
  do {
    index = Math.floor(Math.random() * 7);
  } while (indexes.includes(index));
  return index;
}

export const storage = {
  get() {
    return JSON.parse(localStorage.getItem('cbb-state'));
  },
  set(data) {
    localStorage.setItem('cbb-state', JSON.stringify(data));
  },
};
