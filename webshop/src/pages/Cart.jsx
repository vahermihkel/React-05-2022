import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ParcelMachines from "../components/ParcelMachines";
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
    if (cartProducts.length === 1 && cartProducts[0].product.id === 11112222) {
      // deleteParcelMachine(); !!!!!!
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    toast.error('Edukalt eemaldatud ostukorvist!', {
      position: "bottom-right",
      theme: "dark"
      });
  }

  const emptyCart = () => {
    setCartProducts([]);
    sessionStorage.setItem("cartProducts", JSON.stringify([]));
    // deleteParcelMachine(); !!!!!!
  }

  return (<div>
    { cartProducts.length > 0 && <button onClick={emptyCart}>Tühjenda</button>}
    { cartProducts.map(element => 
    <div key={element.product.id} className="cartProduct">
      <img className="cartProductImg" src={element.product.imgSrc} alt="" />
      <div className="cartProductName">{element.product.name}</div>
      <div className="cartProductPrice">{element.product.price} €</div>
      <div className="cartProductQuantity">
       { element.product.id !== 11112222 && <img className="cartProductButton" 
             onClick={() => decreaseQuantity(element)} 
             src={require('../assets/minus.png')}
             alt="" />}
        <div>{element.quantity} tk</div>
       { element.product.id !== 11112222 && <img className="cartProductButton" 
             onClick={() => increaseQuantity(element)} 
             src={require('../assets/plus.png')}
             alt="" />}
      </div>
      <div className="cartProductTotal">{element.product.price * element.quantity} €</div>
      { element.product.id !== 11112222 && <img className="cartProductButton" 
             onClick={() => removeFromCart(element)} 
             src={require('../assets/delete.png')}
             alt="" />}
      <br />
    </div>
    ) }
     <ToastContainer />
     <ParcelMachines cartProducts={cartProducts} setCProducts={setCartProducts} />
      <div>TÜHI OSTUKORV -- PILT</div>
      <button>MAKSE -- KODUS</button>
    </div>)
}

export default Cart;

// 1. ID kontroll AddProductis, et kõigil oleks unikaalne ID   input  onChange={}  -> kas  .findIndex(element => true/false)
// 2. Pakiautomaadid Omniva.ee lehelt  -> fetch("omniva.ee/locations.json")
// Neljapäev
// 3. Props    child Components    return (<div><AddProduct  /></div>)
// 4. MaintainProducts.jsx --->  kodus
// 4. Otsinguvälja [ iphone 5  ]  -> näitab kõiki kellel on iPhone 5   .filter(element => true/false)