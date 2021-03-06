'use strict';

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
var triesdifre=[];


// // get the images from html__________________________________

var leftImage = document.getElementById('leftImage');
var imageCenter = document.getElementById('imageCenter');
var rightImage = document.getElementById('rightImage');

var imageSection = document.querySelector('#imagesSection');

// //(3_1) create constructor function for the products____________________________________
function Product(name) {
  this.name = name;
  this.clicks = 0;
  this.views = 0;
  this.imagePath = `img/${this.name}`;
  Product.all.push(this);
}

Product.all = [];


// //make objects for all the products________________________________________________________
for (var i = 0; i < names.length; i++) {
  new Product(names[i]);
}

// //render for random images__________________________________________________________________
var leftProduct, centerProduct, rightProduct;

function render() {
  leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  
  centerProduct = Product.all[randomNumber(0, Product.all.length - 1)];
 
  rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];

 
// ________________________________________________________
 
//similar images are not allowed so i need 'while'____________________________________________
  while( (leftProduct === centerProduct) || (leftProduct === rightProduct) || (centerProduct === rightProduct) || triesdifre.includes(leftProduct.imagePath)|| triesdifre.includes(centerProduct.imagePath)|| triesdifre.includes(rightProduct.imagePath))
  {
    leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  
  centerProduct = Product.all[randomNumber(0, Product.all.length - 1)];
 
  rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  }
  

  //________________________________________________________

//   //i will use split to remove the extension from the name
  leftImage.setAttribute('src', leftProduct.imagePath);
  leftImage.setAttribute('alt',(leftProduct.name).split(".", 1));//or mabye i can create an array for the extensions [jpg,png,gif]
  leftImage.setAttribute('title',(leftProduct.name).split(".", 1));

  imageCenter.setAttribute('src', centerProduct.imagePath);
  imageCenter.setAttribute('alt', (centerProduct.name).split(".", 1));
  imageCenter.setAttribute('title',(centerProduct.name).split(".", 1));



  rightImage.setAttribute('src', rightProduct.imagePath);
  rightImage.setAttribute('alt',(rightProduct.name).split(".", 1));
  rightImage.setAttribute('title',(rightProduct.name).split(".", 1));

triesdifre=[leftProduct.imagePath,centerProduct.imagePath,rightProduct.imagePath];
///او بصير اعمل 
// triesdifre[0]=leftProduct.imagePath;
// triesdifre[1]=centerProduct.imagePath;
// triesdifre[2]=rightProduct.imagePath;

};
render();

// //add the event listener________________________________________________________
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
    updateProduct();
    render2();
  }
}



// //helper functions____________________________________________________________
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// //____________________________________________________________________________


var names$$$=[];
var clicks$$$=[];
var views$$$=[];


function render2() {
  var ulE1 = document.getElementById('summary');
    for (var i = 0; i < Product.all.length; i++) {
      var liE1 = document.createElement('li');
       Product.all[i].name=(Product.all[i].name).split(".")[0];
      liE1.textContent = `${Product.all[i].name} has ${Product.all[i].clicks} clicks and ${Product.all[i].views} views`;
      ulE1.appendChild(liE1);
    }



  for(var i=0;i<Product.all.length;i++){
    var currentStatus=Product.all[i]
    names$$$.push((currentStatus.name).split('.',1));
    clicks$$$.push(currentStatus.clicks);
    views$$$.push(currentStatus.views);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:names$$$,
        datasets: [{
            label: '# of Clicks',
            data: clicks$$$,
            backgroundColor: 
                '  rgba(36, 32, 32, 0.664)',
                
    
            borderColor: [
            
                'rgb(255, 159, 64)'
            ],
            borderWidth: 1
        },
        {
          label: '# of Views',
          data: views$$$,
          backgroundColor: 
              'rgb(5, 191, 216)',
              
  
          borderColor: [
          
              'rgb(255, 159, 64)'
          ],
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  
}


 

 
 
// update Product
function updateProduct() {
  var productString = JSON.stringify(Product.all);
  localStorage.setItem('products', productString);
}


//get all products
function getProducts() {
  var productString = localStorage.getItem('products');
  console.log(productString);
  if(productString) {
    Product.all = JSON.parse(productString);
    console.log(Product.all);
    render2();

  }
}
getProducts();












































//teeeeeeeeeeeeeest
// var arr1=['f1','f2','f3'];

//  var arr2=['f1','f2','f3'];
 
//  var vf2=arr2.toString();
//  var vf1=arr1.toString();
 
//   if(arr1==arr2){
//     console.log('true');
    
//   }else{
//     console.log('wrong');
    
//   }



  // var arr1=['f1','f2','f3'];

// var arr2=['f1','f2','f3'];

// var vf2=arr2.toString();
// var vf1=arr1.toString();

//  if(vf1===vf2){
//    console.log('true');
   
//  }else{
//    console.log('wrong');
   
//  }









