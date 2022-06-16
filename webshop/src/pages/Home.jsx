import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import FilterBar from "../components/FilterBar";
import SortButtons from "../components/SortButtons";

function Home() {
  const productsUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);


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
      setOriginalProducts(newArray);
      //[{category:"dad", ....},]  -> ["dad",]
      let catFromProducts = newArray.map(element => element.category);
      catFromProducts = [...new Set(catFromProducts)];
      setCategories(catFromProducts);
    })
  },[]);

  //x .forEach(element => summa = summa + hind);    .length korda   => alles kõik
  //t .find(element => element.võti === urlParameeter);  tehakse senikaua kuni true => alles 1
  //t .findIndex(element => element.id === klikitudese.id);  tehakse senikaua kuni true => alles index
  //x .sort((a,b) => a.hind - b.hind ); tehakse senikaua kuni järjekorras  => alles kõik
  //x .filter(element =>  element.võti === võrreldav )  .length korda => alles kõik kellel oli true
  //x .map(element => uus-väärtus ) .length korda => alles kõik, aga uute väärtusega
  
  //    0                           1                        2 
  // [{nimi: "Coca", price: 5}, {nimi: "Coca", price: 5}, {nimi: "Coca", price: 5}]
  // [{toode: {id: 1238, nimi: "Coca", price: 5}, kogus: 1}]
  // objekti sisse tekib teine objekt
  //            {id: 1238, nimi: "Coca", price: 5}
  const addToCart = (productClicked) => {
    let cProducts = JSON.parse(sessionStorage.getItem("cartProducts")) || [];
    // cProducts = cProducts) || [];
    const index = cProducts.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cProducts[index].quantity = cProducts[index].quantity + 1;
    } else {
      const index = cProducts.findIndex(element => element.product.id === 11112222);
      if (index > 0) {
        cProducts.splice(cProducts.length-1, 0, {"product": productClicked, "quantity": 1});
      } else {
        cProducts.push({"product": productClicked, "quantity": 1});
      }
    }
    cProducts = JSON.stringify(cProducts);
    sessionStorage.setItem("cartProducts", cProducts);
    toast.success('Edukalt lisatud ostukorvi!', {
      position: "bottom-right",
      theme: "dark"
      });
  }

  // 1. sessionStorage.getItem("") <--- võtan sessionStorage-st
  // 2. JSON.parse() <--- Võtan jutumärgid maha 
  // 3. .push()   <--- lisan juurde
  // 4. JSON.stringify()    <--- pean massiivi tegema jutumärkide kujule
  // 5. sessionStorage.setItem("VÕTI", UUED_TOOTED)   <--- pean panema sessionstorage-sse

  return (
  <div>
    <FilterBar 
      originalProducts={originalProducts} 
      categories={categories}
      setProducts={setProducts}
      />
    {products.length > 0 && <div>{products.length} tk</div>}
    <SortButtons prods={products} setHomeProducts={setProducts} />
    <div>
      { products.map(element => 
      <div key={element.id}>
        <img src={element.imgSrc} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <div>{element.id}</div>
        <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
      </div>) 
      }
    </div>
    <ToastContainer />
  </div>
    )
}

export default Home;