import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId){
  let sameProduct;
      products.forEach((prod) => {
          if(prod.id === productId){
              sameProduct = prod;
          }
      });

      return sameProduct;
}

class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(product1){
    this.id = product1.id;
    this.image=product1.image;
    this.name=product1.name;
    this.rating=product1.rating;
    this.priceCents=product1.priceCents;
  }

  getStarsURL(){
    return `images/ratings/rating-${this.rating.stars*10}.png`;
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }

  getExtraInfo(){
    return ``;
  }
}

class Clothing extends Product{
  sizeChartLink;
  
  constructor(productDetails){
    super(productDetails); //calls constructor of parent class
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  getExtraInfo(){
    return `<a
          href="${this.sizeChartLink}" target="_main" class="size-chart-link"> 
          Size Chart
          </a>`
  }
}

class Appliance extends Product{
  instructionsLink;
  warrantyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }
  getExtraInfo(){
    return `<a
          href="${this.instructionsLink}" target="_main" class="appliance-instruction-link"> 
          Instructions
          </a>
          <a
          href="${this.warrantyLink}" target="_main" class="appliance-warranty-link"> 
          Warranty
          </a>`
  }
}

export let products = [];
//response.json() is also asynchronous (returns a promise like fetch())
 //fetch() directly sends request to backend [basically does what GET and send were doing]
export function loadProductsFetch(){
  const promise = fetch( 'https://supersimplebackend.dev/products')
  .then((response) => {
    return response.json(); //[already did JSON.parse() so returns an object not a JSON string]
  
  }).then((prodData) => {
    products = prodData.map((productDetails) => { //add map code [for classes] in front [just like products array]
      if (productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      else{
        let tempProductDetails=''
        let temp = productDetails.keywords 
        temp.forEach((itemType) => {
          if(itemType === 'appliances'){
            tempProductDetails = itemType;
          }
        });
        if(tempProductDetails) return new Appliance(productDetails);
      }
      return new Product(productDetails); //each object is returned after being passed to the constructor
    });
    console.log('load products');
  });
  return promise;
}
/*
loadProductsFetch().then(() => { //returns a promise so we can add new steps here too
  console.log('next step');
});

*/

export function loadProducts(fun){ // this is a callback [function that will be called in the future]
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => { //make JSON -> object and add map code [for classes] in front [just like products array]
      if (productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      else{
        let tempProductDetails=''
        let temp = productDetails.keywords 
        temp.forEach((itemType) => {
          if(itemType === 'appliances'){
            tempProductDetails = itemType;
          }
        });
        if(tempProductDetails) return new Appliance(productDetails);
      }
      return new Product(productDetails); //each object is returned after being passed to the constructor
    });
    console.log('load products');
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products'); //load products info from backend
  xhr.send(); //send request
}

export function loadCartFetch(){
  const promise = fetch('https://supersimplebackend.dev/products')
  .then((respone) => {
    console.log('load cart');
  });
  return promise;
}

export function loadCart(fun){ // this is a callback [function that will be called in the future]
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log('load cart');
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart'); //load products info from backend
  xhr.send(); //send request
}

/* built-in date class
const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString());

const object2 = {
  a: 4,
  b: this.a //does not work because object has not been created
}

function logThis(){
  console.log(this);
}

logThis(); 
logThis.call('hello');
*/