import 'core-js/stable';
import 'regenerator-runtime/runtime';
const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

const count = 30;
const apiKey = '0G6kQeQMBpX79Wlr8F-f-OnQzVhxb5DA0pHpIs2Qblo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

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

const getImages = function () {
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
      alt: photo.alt_description,
      title: photo.alt_description,
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

    getImages();
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;

    loadImages();
  }
});

loadImages();
