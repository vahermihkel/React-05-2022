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
    })
    
  }

  return (
  <div>
    <input onChange={searchProducts} ref={searchedProductRef} type="text" />
    <span>{products.length}</span>
    <div>
      { products.map(element => 
      <div key={element.id}>
        <img src={element.imgSrc} alt="" />
        <div>{element.name}</div>
        <div>{element.description}</div>
        <div>{element.price}</div>
        <div>{element.id}</div>
        <button onClick={() => deleteProduct(element)}>X</button>
      </div>) 
      }
    </div>
    <ToastContainer />
  </div>
    )
}

export default MaintainProducts;