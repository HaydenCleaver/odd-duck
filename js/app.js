'use strict';

let votingRounds = 25;

let imageList = storagePull() || [];

let imageEls = document.querySelectorAll('img');

let chartEl = document.getElementById('myChart');
let ctx = chartEl.getContext('2d');


function Image(imgName){
  this.name = imgName.slice(0, imgName.indexOf('.'));
  this.clicks = 0;
  this.views = 0;
  this.id = imgName;
  this.src = `img/${imgName}`;
  this.seen = false;

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

if (!imageList.length){
  for (let i = 0; i < imgFiles.length; i++){
    new Image(imgFiles[i]);
  }
}
renderImage();

function randomImage() {
  let i = Math.floor(Math.random() * imageList.length);
  return imageList[i];
}

function renderImage() {

  let imgOne = randomImage();
  let imgTwo = randomImage();
  let imgThree = randomImage();

  while (imgOne.id === imgTwo.id || imgOne.id === imgThree.id || imgOne.seen === true){
    imgOne = randomImage();
  }

  while (imgTwo.id === imgThree.id || imgTwo.id === imgOne.id || imgTwo.seen === true){
    imgTwo = randomImage();
  }

  while (imgThree.id === imgOne.id || imgThree.id === imgTwo.id || imgThree.seen === true) {
    imgThree = randomImage();
  }

  imageEls[0].id = imgOne.id;
  imageEls[0].src = imgOne.src;
  imageEls[1].id = imgTwo.id;
  imageEls[1].src = imgTwo.src;
  imageEls[2].id = imgThree.id;
  imageEls[2].src = imgThree.src;

  console.log(imageEls);

  imgOne.views++;
  imgTwo.views++;
  imgThree.views++;

  for (let i = 0; i < imageList.length; i++){
    imageList[i].seen = false;
  }

  imgOne.seen = true;
  imgTwo.seen = true;
  imgThree.seen = true;

}

console.log(votingRounds);

function addListener(){
  imageEls.forEach(function(img){
    img.addEventListener('click', voteClick);
  });
}

addListener();


function voteClick(event){

  for (let i = 0; i < imageList.length; i++) {

    console.log(event.target.id, imageList[i].id);
    if (event.target.id === imageList[i].id){
      imageList[i].clicks++;
      votingRounds = votingRounds - 1;
      storagePush();
    }
  }
  console.log(votingRounds);

  if (votingRounds <= 0){
    imageEls.forEach(function(img){
      img.removeEventListener('click', voteClick)
    });

    alert('Voting is now over.');
  }

  renderImage();
  console.log(imageList);
}

function storagePush(){
  let stringConvert = JSON.stringify(imageList);
  console.log(stringConvert);
  return localStorage.setItem('images', stringConvert);
}

function storagePull(){
  let stringStore = localStorage.getItem('images');
  return JSON.parse(stringStore);
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
  }

  console.log(clickResults);
  if (votingRounds === 0){
    let votingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: imgFiles,
        datasets: [{
          label: '# of Votes',
          data: clickResults,
          backgroundColor: 'rgb(25, 119, 80)'
        }, {
          label: '# of Views',
          data: viewResults,
          backgroundColor: '#A63F37',
        }]
      },
    });
  }
}

function reset(){
  for (let i = 0; i < imageList.length; i++){
    localStorage.clear();
    imageList = [];
    votingRounds = 25;

    addListener();

    let chartDelete = document.getElementById('myChart');
    chartDelete.remove();

    alert('Please refresh page to begin voting again.');

  }
}



console.log(imageList);
