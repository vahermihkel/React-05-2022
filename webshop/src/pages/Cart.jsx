import { useState } from "react";
import "../css/cart.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
        JSON.parse(sessionStorage.getItem("cartProducts")) || []
    );

  const decreaseQuantity = (productClicked) => {
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[index].quantity = cartProducts[index].quantity - 1;
    if (cartProducts[index].quantity === 0) {
      removeFromCart(productClicked);
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const increaseQuantity = (productClicked) => {
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[index].quantity = cartProducts[index].quantity + 1;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const removeFromCart = (productClicked) => { // MOZILLA --> findIndex()
    const index = cartProducts.find(element => element.product.id === productClicked.product.id);
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }


              // [{product: {TOODE}, quantity: 1}, {product: {TOODE}, quantity: 5}]
  return (<div>
    <button>Tühjenda --- KOJU</button>
    { cartProducts.map(element => 
    <div className="cartProduct">
      <img className="cartProductImg" src={element.product.imgSrc} alt="" />
      <div className="cartProductName">{element.product.name}</div>
      <div className="cartProductPrice">{element.product.price} €</div>
      <div className="cartProductQuantity">
        <img className="cartProductButton" 
             onClick={() => decreaseQuantity(element)} 
             src={require('../assets/minus.png')}
             alt="" />
        <div>{element.quantity} tk</div>
        <img className="cartProductButton" 
             onClick={() => increaseQuantity(element)} 
             src={require('../assets/plus.png')}
             alt="" />
      </div>
      <div className="cartProductTotal">{element.product.price * element.quantity} €</div>
      <img className="cartProductButton" 
             onClick={() => removeFromCart(element)} 
             src={require('../assets/delete.png')}
             alt="" />
      <br />
    </div>
    ) }
    </div>)
}

export default Cart;