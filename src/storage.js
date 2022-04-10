const storage = {
  get() {
    return JSON.parse(localStorage.getItem('cbb-state'));
  },
  set(data) {
    localStorage.setItem(
      'cbb-state',
      JSON.stringify({ ...this.get(), ...data })
    );
  },
};

export default storage;
