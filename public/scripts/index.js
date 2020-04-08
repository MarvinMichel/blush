/* eslint-env browser */
/* Made by Jade */
const filterButton = document.querySelector('button');
const sliders = document.querySelectorAll('.sliders');
const section = document.querySelector('section');
const extraFilters = document.querySelector('.extra');
const basicFilters = document.querySelector('.basics');
const titel = document.querySelector('h1');
const clickAway = document.querySelector('.clickaway')

sliders.forEach(slider => {
  slider.querySelector('input').addEventListener('input', (e) => {
    slider.querySelector('span').innerHTML = e.target.value;
  });
});

section.classList.add('away');
extraFilters.classList.add('away');
basicFilters.classList.add('away');
titel.classList.add('away');

filterButton.addEventListener('click', () => {
  event.preventDefault();
  section.classList.remove('away');
  section.classList.toggle('apear');
  filterButton.classList.toggle('away');
  extraFilters.classList.toggle('apear');
  basicFilters.classList.toggle('apear');
  titel.classList.toggle('apear');
  console.log('yeaaahh');
});

clickAway.addEventListener('click', () => {
  event.preventDefault();
  section.classList.remove('apear');
  section.classList.toggle('away');
  filterButton.classList.remove('away')
  extraFilters.classList.remove('apear');
  extraFilters.classList.toggle('away');
  basicFilters.classList.remove('apear');
  basicFilters.classList.toggle('away');
  titel.classList.remove('apear');
  titel.classList.toggle('away');

})

const showButton = () => {
  const test = document.querySelector('input[id=man]');
  test.checked = true;
  const tesT = document.querySelector('input[id=neeroken]');
  tesT.checked = true;
  const tesTT = document.querySelector('input[id=maaktnietuitkinderen]');
  tesTT.checked = true;
};

showButton();
/* Made by Jade */
