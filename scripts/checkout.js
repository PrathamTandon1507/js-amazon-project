import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderItemPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCartFetch, loadProductsFetch } from "../data/products.js";

Promise.all([ //RUNS BOTH PROMISES AT THE SAME TIME
    loadProductsFetch()
    ,
    loadCartFetch()
]).then((values) => { //values to get both parameters in the form of an array
    renderOrderSummary();
    renderItemPaymentSummary();
});
//LOAD PRODUCTS FROM API, THEN LOAD CART FROM API, THEN DISPLAY ORDER AND CART ONCE DATA HAS BEEN LOADED FROM BACKEND


/*
new Promise((resolve) => { //its like wait(), we wait till the process is finished then the code continues from resolve
    loadProducts(() => {
        resolve(); //can pass parameters in resolve to be used in next step
    })
}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
    
}).then(() => {
    renderOrderSummary();
    renderItemPaymentSummary();
})



//send request, use callback to wait for response, and then run rest of the code
*/