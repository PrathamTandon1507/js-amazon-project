import {myCart as cart} from '../data/cart.js'; //.. to get out of current folder, then go to data/cart.js
import {products} from '../data/products.js'

let prodHTML ='';
products.forEach((prod) => { //products is an array of objects containing info about all products
    //Just add unique data for each image using objects, now you wont have to type all the html code for each element, you are generating this code using JS
    prodHTML +=  `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${prod.image}"> 
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${prod.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${prod.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${prod.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(prod.priceCents/100).toFixed(2)}
          </div>

          <div class="js-product-quantity-container">
            <select class="js-select-item-${prod.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${prod.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button
          button-primary js-button "
          data-product-id = "${prod.id}"> 
            Add to Cart
          </button>
        </div>` //data-product-id stores product id
})

function addToCart(productId){
      let isPresent;
      cart.forEach((val) =>{ //check if element is already present in cart
        if(val.productId === productId){
          isPresent = val;
        } 
      });
      //const productContainer = item.closest('.product-container'); //select current product from product container
      const quant = Number(document.querySelector(`.js-select-item-${productId}`).value); //select particular attribute of current product

      if(isPresent){
        isPresent.quantity += quant; //increment quantity if already present
      }
      else{
        cart.push({        //add to cart if not present
          productId: productId,
          quantity : quant
        });
      }
}

function updateCartQuantity(){
  let cartQuant = 0;
      cart.forEach((cartItem) => {
        cartQuant += cartItem.quantity;
      });
      document.querySelector('.js-quantity').innerHTML = cartQuant;
}

function showAddedMessage(productId){
  const displayAdd = document.querySelector(`.js-added-to-cart-${productId}`);
      displayAdd.classList.add('show');
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        displayAdd.classList.remove('show')
      }, 2000);
}

let timeoutID; //maintain the value of timeoutID between clicks, define it here so it doesnt get redefined everytime
document.querySelector('.js-products-grid').innerHTML = prodHTML; //display the html using DOM
document.querySelectorAll('.js-button')
  .forEach((cartItem) => {
    cartItem.addEventListener('click', () => { //on click
      const productId = cartItem.dataset.productId; //kebab case -> camel case IMPORTANT**
      addToCart(productId);
      updateCartQuantity();
      showAddedMessage(productId);
    })
  });