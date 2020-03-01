var names = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "usb.gif",
  "water-can.jpg",
  "wine-glass.jpg",
];

//(1) get the images
var leftImage = document.getElementById('leftImage');
var imageCenter = document.getElementById('imageCenter');
var rightImage = document.getElementById('rightImage');

var imageSection = document.querySelector('#imagesSection');
//____________________________________________________________

//(2) add src,alt,title to the images to test if ever thing is working

// leftImage.src = `img/${names[0]}.jpg`;
// leftImage.alt = names[0];
// leftImage.title = names[0];

// imageCenter.setAttribute('src',`img/${names[1]}.jpg`);
// imageCenter.alt = names[0];
// imageCenter.title = names[0];

// rightImage.setAttribute('src',`img/${names[1]}.jpg`);
// rightImage.setAttribute('alt',names[1]);
// rightImage.setAttribute('title',names[1]);

//____________________________________________________________

//(3_1) create constructor function for the products
function Product(name) {
  this.name = name;
  this.clicks = 0;
  this.views = 0;
  this.imagePath = `img/${this.name}`;
  Product.all.push(this);
}

Product.all = [];
//______________________________________________________________
//(3_2) instantiate objects for all the products one shot
for (var i = 0; i < names.length; i++) {
  new Product(names[i]);
}


//(4) render 2 random images
var leftProduct, centerProduct, rightProduct;
function render() {
  leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  console.log(leftProduct);


  centerProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  console.log(centerProduct);

  rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  console.log(rightProduct);



  leftImage.setAttribute('src', leftProduct.imagePath);
  leftImage.setAttribute('alt',(leftProduct.name).split(".", 1));
  
  leftImage.setAttribute('title',(leftProduct.name).split(".", 1));

  imageCenter.setAttribute('src', centerProduct.imagePath);
  imageCenter.setAttribute('alt', (centerProduct.name).split(".", 1));
  imageCenter.setAttribute('title',(centerProduct.name).split(".", 1));



  rightImage.setAttribute('src', rightProduct.imagePath);
  rightImage.setAttribute('alt',(rightProduct.name).split(".", 1));
  rightImage.setAttribute('title',(rightProduct.name).split(".", 1));
}
render();







//(5) add the event listener to render new images
imageSection.addEventListener('click', handleClickOnProduct);
var totalClicks = 0;
function handleClickOnProduct(event) {
  if (totalClicks < 25) {
    if (event.target.id !== 'imagesSection') {
      if (event.target.id === 'leftImage') {
        leftProduct.clicks++;
      } else if (event.target.id === 'imageCenter') {
        centerProduct.clicks++;
      } else if (event.target.id === 'rightImage') {
        rightProduct.clicks++;
      }

      totalClicks++;
      leftProduct.views++;
      rightProduct.views++;
      centerProduct.views++;

      render();
    }
  } else {
    console.log('more than 25 clicks');
    imageSection.removeEventListener('click', handleClickOnProduct);
    render2();
  }
}

function render2() {
  var ulE1 = document.getElementById('summary');
  for (var i = 0; i < Product.all.length; i++) {
    var liE1 = document.createElement('li');
     Product.all[i].name=(Product.all[i].name).split(".")[0];
    liE1.textContent = `${Product.all[i].name} has ${Product.all[i].clicks} clicks and ${Product.all[i].views} views`;
    ulE1.appendChild(liE1);
  }
}


// (5) Where should we add the event listener(for the left or right/ to imagesSection will be better since we will have only one clickListener )
// 5a identify the  clicked image
// 5b keep track of how many times the image have been clicked and viewed?
// 5c re render the images


//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}