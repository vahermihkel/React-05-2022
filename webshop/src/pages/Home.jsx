import { useEffect, useState } from "react";

function Home() {
  const productsUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch(productsUrl)
    .then(res => res.json()) // response (tagastus) - kogu info
    .then(body => {   // sisu mis kaasa tuleb kogu infost
      // body === {-asdeqdasd: {TOODE}}   --> [{TOODE}]
      const newArray = [];
      for (const key in body) {
        newArray.push(body[key])
      }
      setProducts(newArray);
    })
  },[]);
  

  // [{nimi: "Coca", price: 5}, {nimi: "Coca", price: 5}, {nimi: "Coca", price: 5}]
  // [{toode: {id: 1238, nimi: "Coca", price: 5}, kogus: 1}]
  // objekti sisse tekib teine objekt
  //            {id: 1238, nimi: "Coca", price: 5}
  const addToCart = (productClicked) => {
    let cProducts = sessionStorage.getItem("cartProducts");
    cProducts = JSON.parse(cProducts) || [];
    const index = cProducts.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cProducts[index].quantity = cProducts[index].quantity + 1;
    } else {
      cProducts.push({"product": productClicked, "quantity": 1});
    }
    cProducts = JSON.stringify(cProducts);
    sessionStorage.setItem("cartProducts", cProducts);
  }

  // 1. sessionStorage.getItem("") <--- võtan sessionStorage-st
  // 2. JSON.parse() <--- Võtan jutumärgid maha 
  // 3. .push()   <--- lisan juurde
  // 4. JSON.stringify()    <--- pean massiivi tegema jutumärkide kujule
  // 5. sessionStorage.setItem("VÕTI", UUED_TOOTED)   <--- pean panema sessionstorage-sse

  return (<div>{ products.map(element => 
    <div>
      <img src={element.imgSrc} alt="" />
      <div>{element.name}</div>
      <div>{element.price}</div>
      <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
    </div>) 
    }</div>)
}

export default Home;