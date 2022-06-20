'use strict';

const rounds = 25;
const imageList = [];

let imageEls = document.querySelectorAll('img');
console.log(imageEls);



function Image(imgName){
  this.clicks = 0;
  this.views = 0;
  this.id = imgName;
  this.src = `img/${imgName}`;

  imageList.push(this);
}

let imgFiles = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg'
];

for (let i = 0; i < imgFiles.length; i++){
  new Image(imgFiles[i]);
}
console.log(imgFiles);

renderImage();

function randomImage() {
  let i = Math.floor(Math.random() * imageList.length);
  return imageList[i];
}

function renderImage() {

  let imgOne = randomImage();
  let imgTwo = randomImage();
  let imgThree = randomImage();

  while (imgOne.id === imgTwo.id || imgOne.id === imgThree.id){
    imgOne = randomImage();
  }

  while (imgTwo.id === imgThree.id){
    imgTwo = randomImage();
  }

  imageEls[0].id = imgOne.id;
  imageEls[0].src = imgOne.src;
  imageEls[1].id = imgTwo.id;
  imageEls[1].src = imgTwo.src;
  imageEls[2].id = imgThree.id;
  imageEls[2].src = imgThree.src;
  
  //Does this work because imgOne = randomImage(); = an image object created by constructor?
  imgOne.views++;
  imgTwo.views++;
  imgThree.views++;
}

imageEls.forEach(function(img){
  img.addEventListener('click', voteClick);
});

function voteClick(event){

  for (let i = 0; i < imageList.length; i++) {

    console.log(event.target.id, imageList[i].id);
    if (event.target.id === imageList[i].id){
      imageList[i].clicks++;
    }
  }
  renderImage();
  console.log(imageList);
}

console.log(imageList);
