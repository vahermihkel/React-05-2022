import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "../css/cart.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
        JSON.parse(sessionStorage.getItem("cartProducts")) || []
    );

  const decreaseQuantity = (productClicked) => {
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[index].quantity = cartProducts[index].quantity - 1;
    console.log("vähendasin quantityt:" + JSON.stringify(cartProducts[index]));
    if (cartProducts[index].quantity === 0) {
      removeFromCart(productClicked);
    } else {
      setCartProducts(cartProducts.slice());
      sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      toast.warning('Edukalt vähendatud kogust!', {
        position: "bottom-right",
        theme: "dark"
        });
    }
  }

  const increaseQuantity = (productClicked) => {
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[index].quantity = cartProducts[index].quantity + 1;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    toast.warning('Edukalt suurendatud kogust!', {
      position: "bottom-right",
      theme: "dark"
      });
  }

  const removeFromCart = (productClicked) => { // MOZILLA --> findIndex()
     //.find --> {id: 313123123, name:"iPhone X", price: 231} --- .findIndex --> 3 // 313123123 === 313123123
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
            //.find --> {id: 313123123, name:"iPhone X", price: 231}
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    toast.error('Edukalt eemaldatud ostukorvist!', {
      position: "bottom-right",
      theme: "dark"
      });
  }


              // [{product: {TOODE}, quantity: 1}, {product: {TOODE}, quantity: 5}]
  return (<div>
    <button>Tühjenda --- KOJU</button>
    { cartProducts.map(element => 
    <div key={element.product.id} className="cartProduct">
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
     <ToastContainer />
    </div>)
}

export default Cart;