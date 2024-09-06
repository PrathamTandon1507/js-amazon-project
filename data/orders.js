// import { deliveryOptions, getDeliveryOption } from "./deliveryOptions.js";
// import { getProduct } from "./products.js";
// import { getCartItem } from "./cart.js";
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// export function addOrder(order) {
//     orders.unshift(order);  // Add new order to the front of the array
//     saveToStorage();
// }

// function saveToStorage() {
//     localStorage.setItem('orders', JSON.stringify(orders));
// }

// export function renderPlacedOrderSummary() {
//     let finOrdHTML = '';
//     const today = dayjs(); // Set today only once
//     orders.forEach((item) => {
//         const cartItem = getCartItem(item.id);

//         // For each product in the order
//         item.products.forEach((productItem) => {
//             let deliveryString = '';

//             // Get delivery date for this product
//             deliveryOptions.forEach((deliveryOption) => {
//                 const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
//                 deliveryString = deliveryDate.format('dddd, MMMM D');
//             });

//             finOrdHTML += `      <div class="orders-grid js-order-grid">   
// <div class="order-container">
//                 <div class="order-header">
//                     <div class="order-header-left-section">
//                         <div class="order-date">
//                             <div class="order-header-label">Order Placed:</div>
//                             <div>${today.format('MMMM D, YYYY')}</div> <!-- Correctly format date -->
//                         </div>
//                         <div class="order-total">
//                             <div class="order-header-label">Total:</div>
//                             <div>$${(item.totalCostsCents / 100).toFixed(2)}</div> <!-- Convert cents to dollars -->
//                         </div>
//                     </div>
//                     <div class="order-header-right-section">
//                         <div class="order-header-label">Order ID:</div>
//                         <div>${item.id}</div>
//                     </div>
//                 </div>
//                 <div class="order-details-grid">
//                     <div class="product-image-container">
//                         <img src=${productItem.image} alt="${productItem.name}">
//                     </div>
//                     <div class="product-details">
//                         <div class="product-name">${productItem.name}</div>
//                         <div class="product-delivery-date">Arriving on: ${deliveryString}</div>
//                         <div class="product-quantity">Quantity: ${cartItem.quantity}</div>
//                         <button class="buy-again-button button-primary">
//                             <img class="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again">
//                             <span class="buy-again-message">Buy it again</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             </div>`;
//         });
//     });

//     // Append the final HTML to the grid
//     document.querySelector('.js-order-grid').innerHTML = finOrdHTML;

// }
// renderPlacedOrderSummary();
import { getProduct, loadCartFetch, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from '../scripts/utils/money.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);  // Add new order to the front of the array
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export async function loadPage() {
    await loadProductsFetch();
    await loadCartFetch();
    let ordersHTML = '';

    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');

        ordersHTML += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderTimeString}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>
            <div class="order-details-grid">
                ${productsListHTML(order)}
            </div>
        </div>`;
    });

    const orderGrid = document.querySelector('.js-order-grid');
    if (orderGrid) {
        orderGrid.innerHTML = ordersHTML;
    } else {
        console.error('Element with class js-order-grid not found.');
    }
}



export function productsListHTML(order) {
    let productsListHTML = '';

    order.products.forEach((productDetails) => {
        const product = getProduct(productDetails.productId);

        productsListHTML += `
            <div class="product-image-container">
                <img src="${product.image}">
            </div>
            <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-delivery-date">Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}</div>
                <div class="product-quantity">Quantity: ${productDetails.quantity}</div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>
            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                    <button class="track-package-button button-secondary">Track package</button>
                </a>
            </div>`;
    });

    return productsListHTML;
}

loadPage();
