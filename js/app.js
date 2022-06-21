'use strict';

let votingRounds = 25;
const imageList = [];

let imageEls = document.querySelectorAll('img');

let chartEl = document.getElementById('myChart');
let ctx = chartEl.getContext('2d');


function Image(imgName){
  this.name = imgName.slice(0, imgName.indexOf('.'));
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

renderImage();

function randomImage() {
  let i = Math.floor(Math.random() * imageList.length);
  return imageList[i];
}

function renderImage() {

  let currentImgOne = imageEls[0];
  let currentImgTwo = imageEls[1];
  let currentImgThree = imageEls[2];

  let imgOne = randomImage();
  let imgTwo = randomImage();
  let imgThree = randomImage();

  while (imgOne.id === imgTwo.id || imgOne.id === imgThree.id){
    imgOne = randomImage();
  }

  while (imgTwo.id === imgThree.id || imgTwo.id === imgOne.id){
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
console.log(votingRounds);
imageEls.forEach(function(img){
  img.addEventListener('click', voteClick);
});



function voteClick(event){

  for (let i = 0; i < imageList.length; i++) {

    console.log(event.target.id, imageList[i].id);
    if (event.target.id === imageList[i].id){
      imageList[i].clicks++;
      votingRounds = votingRounds - 1;
    }
  }

  console.log(votingRounds);

  if (votingRounds <= 0){
    imageEls.forEach(function(img){
      img.removeEventListener('click', voteClick);
    });
  }

  renderImage();
  console.log(imageList);
}

function votingResults(){

  let nameResults = [];
  let clickResults = [];
  let viewResults = [];

  for (let i = 0; i < imageList.length; i++){

    nameResults.push(imageList[i].name);
    clickResults.push(imageList[i].clicks);
    viewResults.push(imageList[i].views);

    let names = imageList[i].name;
    let clicks = imageList[i].clicks;
    let views = imageList[i].views;

    let result = (`${names} - Clicks: ${clicks}, Views: ${views}`);

    let containerEl = document.getElementById('votingResults');
    let resultEl = document.createElement('p');
    containerEl.appendChild(resultEl);
    resultEl.textContent = result;
  }

  console.log(clickResults);
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imgFiles,
      datasets: [{
        label: '# of Votes',
        data: clickResults,
        backgroundColor: 'Orange'
      }, {
        label: '# of Views',
        data: viewResults,
        backgroundColor: 'Blue',
      }]
    },
  });

}


console.log(imageList);
