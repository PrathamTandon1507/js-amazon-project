import { orders } from './orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct } from './products.js';
import { loadPage } from './orders.js';
//import { loadProductsFetch } from './products.js';

/*
export async function loadTrackingPage() {
  await loadPage();  // Ensure this is done asynchronously, as products may be fetched here
  const url = new URL(window.location.href);
  const prodId = url.searchParams.get('productId');
  const ordId = url.searchParams.get('orderId');

  // Ensure getProduct works with async/await in case it's fetching products
  const prodItem =  getProduct(prodId);  // Await the product fetch if it's async
  if (!prodItem) {
      console.error(`Product with id ${prodId} not found.`);
      return;
  }

  let ord = '';
  orders.forEach((order) => {
      if (order.id === ordId) {
          ord = order;
      }
  });

  if (!ord) {
      console.error(`Order with id ${ordId} not found.`);
      return;
  }

  let productDetails = '';
  ord.products.forEach((item) => {
      if (item.productId === prodId) {
          productDetails = item;
      }
  });

  if (!productDetails) {
      console.error(`Product details for productId ${prodId} in orderId ${ordId} not found.`);
      return;
  }

  let trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
      <div class="delivery-date">Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}</div>
      <div class="product-info">${prodItem.name}</div>
      <div class="product-info">Quantity: ${productDetails.quantity}</div>
      <img class="product-image" src="${prodItem.image}">
      <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadTrackingPage();
*/

export async function loadTrackingPage(){
    await loadPage();
    const url = new URL(window.location.href);
    const prodId = url.searchParams.get('productId');
    const ordId = url.searchParams.get('orderId');
    let prodItem = getProduct(prodId);    
  //   if (!prodItem) {
  //     console.error(`Product with id ${prodId} not found.`);
  //     return;
  // }

    let ord='';
    orders.forEach((order)=>{
        if(order.id === ordId){
            ord = order;
        }
    });
    let productDetails = ''; //a singular order's details
    ord.products.forEach((item)=>{
        if(item.productId === prodId){
            productDetails=item;
        }
    }); 
    console.log(productDetails);
    //Use prodItem for accessing attributes of product, and productDetails for accessing details of product wrt orders[]
    let trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}

        </div>

        <div class="product-info">
          ${prodItem.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src=${prodItem.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;
    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}


loadTrackingPage();
