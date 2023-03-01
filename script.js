import 'core-js/stable';

import 'regenerator-runtime/runtime';
const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let count = 5;

let initialLoad = true;

const apiKey = '0G6kQeQMBpX79Wlr8F-f-OnQzVhxb5DA0pHpIs2Qblo';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const initalLoadcount = function (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
};

let photos = [];

let loadImg = 0;
let ready = false;
let totalImages = 0;

const addImages = function () {
  loadImg++;

  if (loadImg === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

const setAttribute = function (el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
};

const getPhotos = function () {
  loadImg = 0;
  totalImages = photos.length;
  photos.forEach(photo => {
    const item = document.createElement('a');

    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');

    setAttribute(img, {
      src: photo.urls.regular,
      description: photo.alt_description,
      alt: photo.alt_description,
    });

    img.addEventListener('load', addImages);

    item.appendChild(img);
    imgContainer.appendChild(item);
  });
};

const loadImages = async function () {
  try {
    const req = await fetch(apiUrl);
    photos = await req.json();

    getPhotos();

    if (initialLoad) {
      initalLoadcount(30);
    }
    initialLoad = false;
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    console.log('scroll');
    ready = false;
    loadImages();
  }
});

loadImages();
