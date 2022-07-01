import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import CarouselGallery from "../components/home/CarouselGallery";
import FilterBar from "../components/home/FilterBar";
import Product from "../components/home/Product";
import SortButtons from "../components/home/SortButtons";
import Spinner from "../components/Spinner";

function Home() {
  const productsUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(productsUrl)
    .then(res => res.json()) // response (tagastus) - kogu info
    .then(body => {   // sisu mis kaasa tuleb kogu infost
      // body === {-asdeqdasd: {TOODE}}   --> [{TOODE}]
      const newArray = [];
      for (const key in body) {
        const product = body[key];
        if (product.isActive && product.stock > 0) {
          newArray.push(product);
        }
      }
      setProducts(newArray);
      setOriginalProducts(newArray);
      //[{category:"dad", ....},]  -> ["dad",]
      let catFromProducts = newArray.map(element => element.category);
      catFromProducts = [...new Set(catFromProducts)];
      setCategories(catFromProducts);
      setLoading(false);
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
  
  return (
  <div>
    <CarouselGallery />
    {categories > 1 && <FilterBar 
      originalProducts={originalProducts} 
      categories={categories}
      setProducts={setProducts}
      />}
    {isLoading && <Spinner />}
    {products.length > 0 && <div>{products.length} tk</div>}
    <SortButtons prods={products} setHomeProducts={setProducts} />
    <div>
      { products.map(el => 
        <Product key={el.id} element={el} />
      ) 
      }
    </div>
    <ToastContainer />
  </div>
    )
}

export default Home;