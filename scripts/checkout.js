import {cart, removeCartItem} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let cartHTML = '';
let i=0;
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let sameProduct;
    products.forEach((prod) => {
        if(prod.id === productId){
            sameProduct = prod;
        }
    });

    cartHTML += 
    `<div class="cart-item-container js-cart-item-${sameProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${sameProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${sameProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(sameProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${sameProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}"> 
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
          //NOTE : The radio selectors need to have different names so that we can use them uniquely for each product [same name = 1 common checkbox]
});

document.querySelector('.js-order-summary').innerHTML = cartHTML;
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId; 
            removeCartItem(productId);
            document.querySelector(`.js-cart-item-${productId}`).remove(); //delete the element from HTML
        })
    });
