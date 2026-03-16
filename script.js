document.addEventListener("DOMContentLoaded", function () {

  const totalBackgrounds = 17; // You have 17 gifs
  const randomNumber = Math.floor(Math.random() * totalBackgrounds) + 1;

  const heroBanner = document.getElementById("hero-banner");

  if (heroBanner) {
    heroBanner.style.backgroundImage = `url('imgs/background${randomNumber}.gif')`;
  }

});