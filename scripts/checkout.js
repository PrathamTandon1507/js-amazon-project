import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderItemPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

loadProducts(() => {
    renderOrderSummary();
    renderItemPaymentSummary();
});

//send request, use callback to wait for response, and then run rest of the code
