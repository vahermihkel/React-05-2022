import { Pagination } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from 'react-toastify';
import AdminProduct from "../../components/AdminProduct";

function MaintainProducts() {
  const productsUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [shownProducts, setShownProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchedProductRef = useRef();
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]); // originaal: [1,2,3,4,5]  ---> 239    [1,2,3,4,5,6,7,8,9,10,11,12.....]

  useEffect(()=>{
    fetch(productsUrl)
    .then(res => res.json())
    .then(body => {
      const newArray = [];
      let pagesArray = [];
      let counter = 0;
      for (const key in body) {
        newArray.push(body[key])
        if (counter%10 === 0) {
          pagesArray.push(counter/10+1);
        }
        counter++;
        // counter += 1;
        // counter = counter + 1;
      }
      setPages(pagesArray);
      setFilteredProducts(newArray);
      setShownProducts(newArray.slice(0,10));
      setOriginalProducts(newArray);
    })
  },[]);

  const searchProducts = (origin) => {
    //      0                   1                         1
    // ["Apple iPhone X", "Apple iPhone 5"].indexOf("Apple iPhone 5")
    //  
    // "Apple iPhone X".indexOf("honey")  --> -1
    const searched = searchedProductRef.current.value.toLowerCase();

    const filteredProductsArray = originalProducts.filter(
      element => element.name.toLowerCase().indexOf(searched) >= 0 ||
          element.description.toLowerCase().indexOf(searched) >= 0 ||
                      element.id.toString().indexOf(searched) >= 0
      );
    setFilteredProducts(filteredProductsArray)
    let pagesArray = [];
    let counter = 0;
    filteredProductsArray.forEach(element => {
      if (counter%10 === 0) {
        pagesArray.push(counter/10+1);
      }
      counter++;
    });
    setPages(pagesArray);
    if (origin === 'updated') {
      // if (activePage > pages.length) {
      //   setActivePage(pages.length);
      // }
      console.log("LÄHEN SIIA");
      setShownProducts(filteredProducts.slice((activePage-1)*10,activePage*10));
    } else {
      setActivePage(1);
      setShownProducts(filteredProductsArray.slice(0,10));
    }
  }

  const changePage = (number) => {
    setActivePage(number);
    setShownProducts(filteredProducts.slice((number-1)*10,number*10));
  }

  return (
  <div>
    <input onChange={() => searchProducts('searched')} ref={searchedProductRef} type="text" />
    <span>{filteredProducts.length}</span>
    <div>
      { shownProducts.map(element => 
         <AdminProduct 
            key={element.id}
            element={element}
            originalProducts={originalProducts}
            setOriginalProducts={setOriginalProducts}
            searchProducts={searchProducts}
         />
      ) 
      }
    </div>
    <ToastContainer />
    { pages.length > 1 && <Pagination>
      {pages.map(number => 
        <Pagination.Item key={number} onClick={() => changePage(number)} active={number === activePage}>
          {number}
        </Pagination.Item>
      )}
    </Pagination>}
  </div>
    )
}

export default MaintainProducts;

// spinner / loader
// e-mailile saatmine endale - tagasiside

// 05.07
// proovitöö algusest lõpuni
// muutmise juures ID-kontroll, saaks sama tagasi panna
// piltide üleslaadimine ---> saadan failid e-mailile

// 07.07
// Kogusummat muuta teises failis
// kujundus + Material UI kasutusele võtmine
// Projektide lühiülevaade ja kuidas teha

// 21.07    17.30-20.30
// projektide ülevaade (ja minupoolne ütlemine LIVE programmeerimine) ja kokkuvõte koolitusest