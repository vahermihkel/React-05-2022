import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import FileUpload from "../../components/FileUpload";

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
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(""); 

  useEffect(()=>{
    fetch(productsUrl)
    .then(res => res.json())
    .then(body => { 
      const newArray = [];
      for (const key in body) {
        newArray.push(body[key])
      }
      setProducts(newArray);
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

  const onAddProduct = () => {
    const newProduct = {
      id: idRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      imgSrc: showUrlUpload ? imgSrcRef.current.value : imageUrl,
      isActive: isActiveRef.current.checked,
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
    // kui p??ringu tehtud sain, kas tahan midagi Firebase k??est teada? -- ei ole vaja 
    // ---->then-then ei tee

    // mida tahan teha? --- tahan k??iki kategooriaid k??tte saada -- GET
    // ---->ei pea muutma methodit ega headereid
    // kui p??ringu tehtud sain, kas tahan midagi Firebase k??est teada? -- jah, k??iki kategooriaid
    // ---->fetch(url).then().then() <--- siia tuleb Firebase-st saadu
  }

  const checkIdUniqueness = () => {
    console.log(typeof idRef.current.value);
    const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
    // KUI EI LEITA, siis on index -1 ::   0   1   2   3   4   5  6  
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

  const [imageUrl, setImageUrl] = useState("");

  const urlRef = useRef();
  const uploadRef = useRef();

  const [showUrlUpload, setShowUrlUpload] = useState(true);

  const radioChecked = () => {
    if (urlRef.current.checked) {
      setShowUrlUpload(true);
    } else {
      setShowUrlUpload(false);
    }
  }

  return (
  <div>
    <div>{message}</div>
    <label>ID</label> <br />
    <input onChange={checkIdUniqueness} ref={idRef} type="number" /> <br />
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
    <input ref={urlRef} onChange={radioChecked} type="radio" defaultChecked id="url" name="image_source"/>
    <label htmlFor="url">URLina</label><br />
    <input ref={uploadRef} onChange={radioChecked} type="radio" id="upload" name="image_source"/>
    <label htmlFor="upload">Laen ise ??les</label><br />
    {showUrlUpload === true && <input ref={imgSrcRef} type="text" />}
    {showUrlUpload === false && <FileUpload onSendPictureUrl={setImageUrl} />}
    <br />
    <label>Aktiivne</label> <br />
    <input ref={isActiveRef} type="checkbox" /> <br />
    <button disabled={message !== ""} onClick={onAddProduct}>Sisesta</button>
    <ToastContainer />
  </div>)
}

export default AddProduct;