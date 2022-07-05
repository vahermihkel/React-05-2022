import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Spinner from "../../components/Spinner";

function EditProduct() {
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
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(""); 
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [index, setIndex] = useState(-1);

  useEffect(()=>{
    fetch(productsUrl)
    .then(res => res.json())
    .then(body => { 
      const productArray = [];
      for (const key in body) {
        productArray.push(body[key]);
      }
      setProducts(productArray);
      const productFound = productArray.find(element => Number(element.id) === Number(id));
      const productIndex = productArray.indexOf(productFound);
      setIndex(productIndex);
      setProduct(productFound);
    })
  },[]);

  useEffect(() => {
    fetch(categoryUrl).then(res => res.json()).then(body => {
      const newArray = [];
      for (const key in body) {
        newArray.push(body[key]);
      }
      setCategories(newArray);
    })
  },[]);

  const onEditProduct = () => {
    const newProduct = {
      id: idRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      imgSrc: imgSrcRef.current.value,
      isActive: isActiveRef.current.checked,
    }
    if (index !== -1) {
      products[index] = newProduct;
      fetch(productsUrl,
        {
            method: "PUT",
            body: JSON.stringify(products),
            headers: {
              "Content-Type": "application/json"
            }
        }
      )
  
      toast.success(t('editproduct.edited'), {
        position: "bottom-right",
        theme: "dark"
        });
    }
  }

  const checkIdUniqueness = () => {
    console.log(typeof idRef.current.value);
    const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
    if (index === -1) {
      console.log("UNIKAALNE");
      setMessage("");
    } else {
      console.log("MITTEUNIKAALNE");
      setMessage("Sisestatud ID on mitteunikaalne")
    }
    if (idRef.current.value === "11112222") {
      setMessage("Sisestasid pakiautomaadi ID");
    }
  }

  return (
    <div>
      { product === undefined && <Spinner />}
      { product !== undefined && <div>
        <div>{message}</div>
        <label>ID</label> <br />
        <input defaultValue={product.id} onChange={checkIdUniqueness} ref={idRef} type="number" /> <br />
        <label>{t('form.name')}</label> <br />
        <input defaultValue={product.name} ref={nameRef} type="text" /> <br />
        <label>{t('form.description')}</label> <br />
        <input defaultValue={product.description} ref={descriptionRef} type="text" /> <br />
        <label>Kategooria</label> <br />
        {/* <input ref={categoryRef} type="text" /> <br /> */}
        <select defaultValue={product.category} ref={categoryRef}>
          { categories.map(element => <option key={element.id}>{element.name}</option>) }
        </select> <br />
        <label>Hind</label> <br />
        <input defaultValue={product.price} ref={priceRef} type="number" /> <br />
        <label>Pilt</label> <br />
        <input defaultValue={product.imgSrc} ref={imgSrcRef} type="text" /> <br />
        <label>Aktiivne</label> <br />
        <input defaultChecked={product.isActive} ref={isActiveRef} type="checkbox" /> <br />
        <button disabled={message !== ""} onClick={onEditProduct}>Sisesta</button>
        <ToastContainer />
      </div>}
    </div>)
}

export default EditProduct;