const loadingEl = document.querySelector('.loading');

const handleLoad = init => {
  // Load Game Font
  WebFont.load({
    google: {
      families: ['Play:700'],
    },
    active() {
      loadingEl.style.display = 'none';
      init();
    },
    inactive() {
      loadingEl.style.display = 'none';
      alert(
        "Couldn't load game's fonts. Please make sure you have a sustainable internet connection and try again."
      );
      location.reload();
    },
  });
};

export default handleLoad;
