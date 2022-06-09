import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function Category() {
  const idRef = useRef();
  const nameRef = useRef();
  const categoryUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(categoryUrl).then(res => res.json()).then(body => {
      const newArray = [];
      for (const key in body) {
        newArray.push(body[key]);
      }
      setCategories(newArray);
    })
  },[]);

  // {"category": "mobile","description": "Apood","id": 30803011,"imgSrc": "/g/T9iMhWi/s-l225.webp","isActive": true,"name": "Apple iPhone X","price": 228}
  // const newArray = [];
  // for (const key in product) {
  //     newArray.push(product[key])
  //     //1.newArray.push(product["cateogry"])
  //     //1.newArray.push("mobile")
  //     //2.newArray.push(product["description"])
  //     //2.newArray.push("Apood")
  // }
  // --> ["mobile", "Apood", 30803011, "/g/T9iMhWi/s-l225.webp", true, "Apple iPhone X",  228]

  const addCategory = () => {
    const newCategory = {
      id: idRef.current.value,
      name: nameRef.current.value
    } // {id: 13, name: "asdd"}

    fetch(categoryUrl, {
      method: "POST",
      body: JSON.stringify(newCategory),
      header: {
        "Content-Type": "application/json"
      }
    })

    toast.success('Edukalt uus kategooria lisatud!', {
      position: "bottom-right",
      theme: "dark"
      });
  }

  const deleteCategory = (index) => {
    categories.splice(index,1);
    setCategories(categories.slice());
    fetch(categoryUrl, {
      method: "PUT",
      body: JSON.stringify(categories),
      headers: {
        "Content-Type": "application/json"
      }
    })

    toast.success('Edukalt kategooria kustutatud!', {
      position: "bottom-right",
      theme: "dark"
      });
  }

  return (
    <div>
      <label>ID</label> <br />
      <input ref={idRef} type="text" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <button onClick={addCategory}>Sisesta</button>
      {categories.map((element, index) => 
        <div key={element.id}>
          <span>{element.name}</span>
          <button onClick={() => deleteCategory(index)}>X</button>
        </div>)}
      <ToastContainer />
    </div>)
}

export default Category;