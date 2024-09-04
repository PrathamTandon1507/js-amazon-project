import {calculateCartQuantity, cart} from '../../data/cart.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

export function renderItemPaymentSummary(){
    let totalItemAmount = 0;
    let totalShippingAmount = 0;
    cart.forEach((cartItem) => {
        const sameProduct = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        totalShippingAmount += deliveryOption.priceCents;
        totalItemAmount += cartItem.quantity*sameProduct.priceCents;
    });
    const totalBeforeTax = totalItemAmount + totalShippingAmount;
    const estimatedTax = totalBeforeTax*0.1;
    const orderTotal = totalBeforeTax + estimatedTax;
    const totalCartItems = calculateCartQuantity();

    let paymentHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div> Items (${totalCartItems})</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemAmount)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShippingAmount)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-total-before-tax">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-estimated-tax">$${formatCurrency(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-payment-summary">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`
    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
}



