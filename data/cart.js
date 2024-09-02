export const cart = [];

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
        quantity : quant
      });
    }
}