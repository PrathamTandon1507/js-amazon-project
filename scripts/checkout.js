import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderItemPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCartFetch, loadProductsFetch } from "../data/products.js";

async function loadPage(){ //returns a promise (just like fetch)
    console.log('loading page');
    try{ //code that may cause errors [here these 2 load functions because chances of error when interacting with backend]
    //   throw 'error1'; MANUAL ERRORS
        await loadProductsFetch();
        //await loadCartFetch();
    
    
    // const value = await new Promise((resolve,reject) => { //reject is used to create an error in the future
    //     //throw 'error2';
    //     loadCart(() => {
    //        // reject('error3');
    //         resolve('value3');
    //     });
    // });
    }
    catch(error){
        console.log('Unexpected error in async-await func');    
    }
    renderOrderSummary();
    renderItemPaymentSummary();
    return 'loaded';
}

loadPage(); 
/*
// TO PRINT WHATEVER STATMEENT WAS RETURNED, WE CAN FURTHER ACCESS THE RETURNED PROMISE
loadPage().then((value) => {
    console.log(value);
});
*/

/*
Promise.all([ //RUNS BOTH PROMISES AT THE SAME TIME
    loadProductsFetch()
    ,
    loadCartFetch()
]).then((values) => { //values to get both parameters in the form of an array [not necessary]
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