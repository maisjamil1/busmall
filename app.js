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

// get the images from html__________________________________

var leftImage = document.getElementById('leftImage');
var imageCenter = document.getElementById('imageCenter');
var rightImage = document.getElementById('rightImage');

var imageSection = document.querySelector('#imagesSection');

//(3_1) create constructor function for the products____________________________________
function Product(name) {
  this.name = name;
  this.clicks = 0;
  this.views = 0;
  this.imagePath = `img/${this.name}`;
  Product.all.push(this);
}

Product.all = [];

//make objects for all the products________________________________________________________
for (var i = 0; i < names.length; i++) {
  new Product(names[i]);
}

//render for random images__________________________________________________________________
var leftProduct, centerProduct, rightProduct;

function render() {
  leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  
  centerProduct = Product.all[randomNumber(0, Product.all.length - 1)];
 
  rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
 
//similar images are not allowed so i need 'while'____________________________________________
  while( (leftProduct === centerProduct) || (leftProduct === rightProduct) || (centerProduct === rightProduct)){
    render(); 
  }

  //i will use split to remove the extension from the name
  leftImage.setAttribute('src', leftProduct.imagePath);
  leftImage.setAttribute('alt',(leftProduct.name).split(".", 1));//or mabye i can create an array for the extensions [jpg,png,gif]
  leftImage.setAttribute('title',(leftProduct.name).split(".", 1));

  imageCenter.setAttribute('src', centerProduct.imagePath);
  imageCenter.setAttribute('alt', (centerProduct.name).split(".", 1));
  imageCenter.setAttribute('title',(centerProduct.name).split(".", 1));



  rightImage.setAttribute('src', rightProduct.imagePath);
  rightImage.setAttribute('alt',(rightProduct.name).split(".", 1));
  rightImage.setAttribute('title',(rightProduct.name).split(".", 1));
};
render();

//add the event listener________________________________________________________
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

//helper functions____________________________________________________________-
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}