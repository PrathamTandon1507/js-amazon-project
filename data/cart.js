export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},{
   productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
   quantity: 1 
}];

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