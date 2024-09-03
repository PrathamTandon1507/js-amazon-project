import {cart, removeCartItem, updateDeliveryOption} from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' //default export [when we want to only import one thing]

function renderOrderSummary(){
    let cartHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let sameProduct;
        products.forEach((prod) => {
            if(prod.id === productId){
                sameProduct = prod;
            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;
        let sameDeliveryItem;

        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){
                sameDeliveryItem = option;
            }
        });
        const today = dayjs(); //todays day/date info
        const deliveryDate = today.add(sameDeliveryItem.deliveryDays, 'days');
        const deliveryString = (deliveryDate.format('dddd, MMMM D'));
        cartHTML += 
        `<div class="cart-item-container js-cart-item-${sameProduct.id}">
                <div class="delivery-date">
                Delivery date: ${deliveryString}
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
                ${deliveryOptionHTML(sameProduct, cartItem)}
                </div>
                </div>
            </div>`;
            //NOTE : The radio selectors need to have different names so that we can use them uniquely for each product [same name = 1 common checkbox]

    });

    function deliveryOptionHTML(sameProduct, cartItem){
        let deliveryHTML = ''

        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs(); //todays day/date info
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const deliveryString = (deliveryDate.format('dddd, MMMM D'));
            let priceString = 0;
            if(deliveryOption.priceCents === 0){
                priceString = 'FREE';
            }
            else{
                priceString = `$${formatCurrency(deliveryOption.priceCents)} - `;
            }

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            deliveryHTML +=
            `<div class="delivery-option js-delivery-option"
            data-product-id = ${sameProduct.id}
            data-delivery-option-id = ${deliveryOption.id}
            >
                    <input type="radio"
                    ${isChecked ? `checked` : ``}
                        class="delivery-option-input"
                        name="delivery-option-${sameProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${deliveryString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                    </div>`
        });
        return deliveryHTML;
    }

    document.querySelector('.js-order-summary').innerHTML = cartHTML;

    let totalItems=0;
    function updateTotalItems(){
        cart.forEach((cartItem) => {
            totalItems += cartItem.quantity;
            document.querySelector('.js-checkout-count').innerHTML = `${totalItems} items`;
        });
    }

    updateTotalItems();
    document.querySelectorAll('.js-delete-link') //necessary to include event listeners in the function because while rendering we need to ensure what is being added AND deleted
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId; 
                removeCartItem(productId, totalItems);
                document.querySelector('.js-checkout-count').innerHTML = `${totalItems} items`;
                document.querySelector(`.js-cart-item-${productId}`).remove(); //delete the element from HTML
            })
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) =>{
            element.addEventListener(('click'), () => {
                const productId = element.dataset.productId;
                const deliveryOptionId = element.dataset.deliveryOptionId;
                updateDeliveryOption(productId,deliveryOptionId);
                renderOrderSummary(); //call itself recursively after calling update
            })
        });
    }
renderOrderSummary();