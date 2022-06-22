import { useRef } from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const productsUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const searchedProductRef = useRef();

  useEffect(()=>{
    fetch(productsUrl)
    .then(res => res.json())
    .then(body => {
      const newArray = [];
      for (const key in body) {
        newArray.push(body[key])
      }
      setProducts(newArray);
      setOriginalProducts(newArray);
    })
  },[]);

  const searchProducts = () => {
    //      0                   1                         1
    // ["Apple iPhone X", "Apple iPhone 5"].indexOf("Apple iPhone 5")
    //  
    // "Apple iPhone X".indexOf("honey")  --> -1
    const searched = searchedProductRef.current.value.toLowerCase();

    const filteredProducts = originalProducts.filter(
      element => element.name.toLowerCase().indexOf(searched) >= 0 ||
          element.description.toLowerCase().indexOf(searched) >= 0 ||
                      element.id.toString().indexOf(searched) >= 0
      );
    setProducts(filteredProducts);
  }

  const deleteProduct = (productClicked) => {
    const index = originalProducts.findIndex(element => element.id === productClicked.id);
    if (index >= 0) { // kui ei leita üles, index on -1
      originalProducts.splice(index,1); // kui index -1 abil tehakse splice(), siis kustutatakse lõpust
    }
    fetch(productsUrl, {
      method: "PUT",
      body: JSON.stringify(originalProducts),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      setOriginalProducts(originalProducts.slice()); // uuendab originalProductse
      searchProducts(); // siin uuendab productse
      toast.success('Edukalt kustutatud!', {
        position: "bottom-right",
        theme: "dark"
        });
    })
  }

  const changeProductActive = (productClicked) => {
    const index = originalProducts.indexOf(productClicked);
    // [{0},{1}][1]  ===> {1}.isActive läheb vastupidiseks
    originalProducts[index].isActive = !originalProducts[index].isActive;
    sendProductsToDb();
   }

   const decreaseStock = (productClicked) => {
    const index = originalProducts.indexOf(productClicked);
    originalProducts[index].stock--;
    sendProductsToDb();
   }

   const increaseStock = (productClicked) => {
    const index = originalProducts.indexOf(productClicked);
    if (originalProducts[index].stock === undefined) {
      originalProducts[index].stock = 0;
    }
    originalProducts[index].stock++;
    sendProductsToDb();
   }

   const sendProductsToDb = () => {
    fetch(productsUrl, {
      method: "PUT",
      body: JSON.stringify(originalProducts),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      setOriginalProducts(originalProducts.slice()); // uuendab originalProductse
      searchProducts(); // siin uuendab productse
    })
   }

  return (
  <div>
    <input onChange={searchProducts} ref={searchedProductRef} type="text" />
    <span>{products.length}</span>
    <div>
      { products.map(element => 
      <div className={`cartProduct ${element.isActive ? "active": "inactive"}`} key={element.id}>
        <div onClick={() => changeProductActive(element)}>
          <img className="cartProductImg" src={element.imgSrc} alt="" />
          <div>{element.isActive + 0  }</div>
          <div>{element.name}</div>
          <div>{element.description}</div>
          <div>{element.price}</div>
          <div>{element.id}</div>
        </div>
        <button disabled={!element.stock} onClick={() => decreaseStock(element)}>-</button>
        { element.stock ? <div>{element.stock} tk</div> : <div>0 tk</div>}
        <button onClick={() => increaseStock(element)}>+</button>
        <button>MUUDA --- KODUS</button>
        <button onClick={() => deleteProduct(element)}>X</button>
      </div>) 
      }
    </div>
    <ToastContainer />
  </div>
    )
}

export default MaintainProducts;

// väljatõstmine ---> AdminProduct
// pagination ---> admin lehel toodete lehekülgede kaupa vaatamine
// piltide üleslaadimine ---> saadan failid e-mailile

// e-mailile saatmine endale - tagasiside
// muutmise juures ID-kontroll, saaks sama tagasi panna

// Kogusummat muuta teises failis

// proovitöö algusest lõpuni