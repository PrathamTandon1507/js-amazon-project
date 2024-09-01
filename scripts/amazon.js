let prodHTML ='';

products.forEach((prod) => { //products is an array of objects containing info about all products
    //Just add unique data for each image using objects, now you wont have to type all the html code for each element, you are generating this code using JS
    prodHTML +=  `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${prod.image}"> 
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${prod.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${prod.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${prod.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(prod.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button
          button-primary js-button"
          data-product-id = "${prod.id}"> 
            Add to Cart
          </button>
        </div>` //data-product-id stores product id
})

document.querySelector('.js-products-grid').innerHTML = prodHTML; //display the html using DOM
document.querySelectorAll('.js-button')
  .forEach((item) => {
    item.addEventListener('click', () => { //on click, increase the cart quantity

      const productId = item.dataset.productId; //kebab case -> camel case IMPORTANT**
      let isPresent;
      cart.forEach((val) =>{ //check if element is already present in cart
        if(val.productId === productId){
          isPresent = val;
        } 
      });
      if(isPresent){
        isPresent.quantity +=1; //increment quantity if already present
      }
      else{
        cart.push({        //add to cart if not present
          productId: productId,
          quantity : 1
        });
      }

      let cartQuant = 0;
      cart.forEach((cartItem) => {
        cartQuant += cartItem.quantity;
      })
      document.querySelector('.js-quantity').innerHTML = cartQuant;
    }) 
  });