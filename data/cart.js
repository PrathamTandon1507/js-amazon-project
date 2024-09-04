export let cart = JSON.parse(localStorage.getItem('cart')) || //let because const cant be reassigned && save to local storage
    [{ 
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
        },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
    }]; //these default values are there just to intialise the cart, once any item is added/removed they are gone

export function saveToLocStor(){
    localStorage.setItem('cart',JSON.stringify(cart));
} 

export function addToCart(productId){
    let isPresent;
    cart.forEach((val) =>{ //check if element is already present in cart
      if(val.productId === productId){
        isPresent = val;
      } 
    });
    //const productContainer = item.closest('.product-container'); //select current product from product container
    const quant = Number(document.querySelector(`.js-select-item-${productId}`).value); //select particular attribute of current product

    if(isPresent){
      isPresent.quantity += quant; //increment quantity if already present
    }
    else{
      cart.push({        //add to cart if not present
        productId: productId,
        quantity : quant,
        deliveryOptionId : '1'
      });
    }
    saveToLocStor();
}
export function removeCartItem(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToLocStor();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let isPresent;
    cart.forEach((val) =>{ //check if element is already present in cart
      if(val.productId === productId){
        isPresent = val;
      } 
    });
    
    isPresent.deliveryOptionId = deliveryOptionId; //update the cart's deliveryoption id so now it contains data for new delivery option picked
    saveToLocStor(); //because we are updating the cart
}

export function calculateCartQuantity(){
    let cartQuant = 0;
      cart.forEach((cartItem) => {
        cartQuant += cartItem.quantity;
      });
      return cartQuant;
}

export function getCartItem(productId){
    let sameCartItem = ''
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            sameCartItem = cartItem;
        }
    });
    return sameCartItem;
}