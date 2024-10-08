import { addToCart, calculateCartQuantity} from '../data/cart.js'; //.. to get out of current folder, then go to data/cart.js
import {products, loadProducts} from '../data/products.js'

loadProducts(renderProductsGrid);

function renderProductsGrid(){ //this function will be used in products.js because we need to wait for the repsonse form backend to come before loading this code. The products array would be empty if we dont wait for the response

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
                src="${prod.getStarsURL()}">
              <div class="product-rating-count link-primary">
                ${prod.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${prod.getPrice()}
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

            ${prod.getExtraInfo()} 

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

  function updateCartQuantity(){
    let cartQuant = calculateCartQuantity();

    document.querySelector('.js-quantity').innerHTML = cartQuant;
  }

  updateCartQuantity();

  function showAddedMessage(productId){
    const displayAdd = document.querySelector(`.js-added-to-cart-${productId}`);
        displayAdd.classList.add('show');
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          displayAdd.classList.remove('show')
        }, 800);
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
}