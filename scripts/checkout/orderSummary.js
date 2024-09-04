import {cart, getCartItem, removeCartItem, saveToLocStor, updateDeliveryOption} from '../../data/cart.js'; //use 2 ../, first to get out of checkout, second to get out of scripts
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import {getProduct, products} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' //default export [when we want to only import one thing]
import { renderItemPaymentSummary } from './paymentSummary.js';
import { updateTotalItems } from './checkoutHeader.js';

export function renderOrderSummary(){
    let cartHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const sameProduct = getProduct(productId);

        const sameDeliveryItem = getDeliveryOption(cartItem.deliveryOptionId);

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
                    <span class="update-quantity-link link-primary js-update-link" data-product-id = ${sameProduct.id}>
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input" data-product-id = ${sameProduct.id}>
                    <span class="save-quantity-link link-primary js-save-link" data-product-id = ${sameProduct.id}>
                    Save
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
    updateTotalItems();
    document.querySelectorAll('.js-delete-link') //necessary to include event listeners in the function because while rendering we need to ensure what is being added AND deleted
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId; 
                removeCartItem(productId);
                document.querySelector(`.js-cart-item-${productId}`).remove(); //delete the element from HTML
                renderItemPaymentSummary(); //reduce amount whenever item is removed/deleted
                updateTotalItems();
            })
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener(('click'), () => {
                const productId = element.dataset.productId;
                const deliveryOptionId = element.dataset.deliveryOptionId;
                updateDeliveryOption(productId,deliveryOptionId);
                renderOrderSummary(); //call itself recursively after calling update
                renderItemPaymentSummary(); //update whenever deliveryOption is changed
            })
        });
    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            
            const item = document.querySelector(`.js-cart-item-${productId}`); //we always add classes using classList to the parent container not the child container in which we want to add the class
            item.querySelector('.quantity-input').classList.add('is-editing-quantity');
            item.querySelector('.save-quantity-link').classList.add('is-editing-quantity');
            item.querySelector('.update-quantity-link').classList.add('is-editing-quantity');

        })
    });
    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                
                const productId = link.dataset.productId;

                const item = document.querySelector(`.js-cart-item-${productId}`);
                item.querySelector('.update-quantity-link').classList.remove('is-editing-quantity');
                item.querySelector('.quantity-input').classList.remove('is-editing-quantity');
                item.querySelector('.save-quantity-link').classList.remove('is-editing-quantity');
                
                const newQuant = Number(item.querySelector('.quantity-input').value); //use item. instead of document. to make sure you are accessing the right item and not the first (Default) item
                let cartItem = getCartItem(productId);
                cartItem.quantity = newQuant;
                renderOrderSummary(); //run all these functions to make updates accordingly
                renderItemPaymentSummary();
                saveToLocStor(); //to save changes
            })
        });
    
    document.querySelectorAll('.js-quantity-input')
        .forEach((link) => {
            link.addEventListener('keydown', (event) => {
                if(event.key === 'Enter'){ //make the same changes that above eventListener made
                    const productId = link.dataset.productId; //Add data attribute to quality-input

                    const item = document.querySelector(`.js-cart-item-${productId}`);
                    item.querySelector('.update-quantity-link').classList.remove('is-editing-quantity');
                    item.querySelector('.quantity-input').classList.remove('is-editing-quantity');
                    item.querySelector('.save-quantity-link').classList.remove('is-editing-quantity');
                    
                    const newQuant = Number(item.querySelector('.quantity-input').value);
                    let cartItem = getCartItem(productId);
                    cartItem.quantity = newQuant;
                    renderOrderSummary();
                    renderItemPaymentSummary();
                    saveToLocStor();
                }
            });
        })
}

    