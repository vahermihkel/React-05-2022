import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  const productsUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const categoryUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();


  useEffect(() => {
    fetch(categoryUrl).then(res => res.json()).then(body => {
      const newArray = [];
      for (const key in body) {
        newArray.push(body[key]);
      }
      setCategories(newArray);
    })
  },[]);

  const onAddProduct = () => {
    const newProduct = {
      id: idRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      imgSrc: imgSrcRef.current.value,
      isActiveRef: isActiveRef.current.value,
    }
    fetch(productsUrl,
      {
          method: "POST",
          body: JSON.stringify(newProduct),
          headers: {
            "Content-Type": "application/json"
          }
      }
    )

    toast.success(t('addproduct.added'), {
      position: "bottom-right",
      theme: "dark"
      });

    // mida tahan teha? --- tahan midagi juurde lisada -- POST
    // ---->pean muutma methodi ja headereid
    // kui päringu tehtud sain, kas tahan midagi Firebase käest teada? -- ei ole vaja 
    // ---->then-then ei tee

    // mida tahan teha? --- tahan kõiki kategooriaid kätte saada -- GET
    // ---->ei pea muutma methodit ega headereid
    // kui päringu tehtud sain, kas tahan midagi Firebase käest teada? -- jah, kõiki kategooriaid
    // ---->fetch(url).then().then() <--- siia tuleb Firebase-st saadu
  }

  return (
  <div>
    <label>ID</label> <br />
    <input ref={idRef} type="number" /> <br />
    <label>{t('form.name')}</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <label>{t('form.description')}</label> <br />
    <input ref={descriptionRef} type="text" /> <br />
    <label>Kategooria</label> <br />
    {/* <input ref={categoryRef} type="text" /> <br /> */}
    <select ref={categoryRef}>
      { categories.map(element => <option key={element.id}>{element.name}</option>) }
    </select> <br />
    <label>Hind</label> <br />
    <input ref={priceRef} type="number" /> <br />
    <label>Pilt</label> <br />
    <input ref={imgSrcRef} type="text" /> <br />
    <label>Aktiivne</label> <br />
    <input ref={isActiveRef} type="checkbox" /> <br />
    <button onClick={onAddProduct}>Sisesta</button>
    <ToastContainer />
  </div>)
}

export default AddProduct;