import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// ffc
// Simple React Snippets (Burke Holland)
function AdminProduct(props) {
  const productsUrl = "https://react-5-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  const changeProductActive = (productClicked) => {
    const index = props.originalProducts.indexOf(productClicked);
    // [{0},{1}][1]  ===> {1}.isActive läheb vastupidiseks
    props.originalProducts[index].isActive = !props.originalProducts[index].isActive;
    sendProductsToDb();
   }

   const increaseStock = (productClicked) => {
    const index = props.originalProducts.indexOf(productClicked);
    if (props.originalProducts[index].stock === undefined) {
      props.originalProducts[index].stock = 0;
    }
    props.originalProducts[index].stock++;
    sendProductsToDb();
   }

   const decreaseStock = (productClicked) => {
    const index = props.originalProducts.indexOf(productClicked);
    props.originalProducts[index].stock--;
    sendProductsToDb();
   }

   const sendProductsToDb = () => {
    fetch(productsUrl, {
      method: "PUT",
      body: JSON.stringify(props.originalProducts),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      props.setOriginalProducts(props.originalProducts.slice()); // uuendab originalProductse
      props.searchProducts('updated'); // siin uuendab productse
    })
   }

  const deleteProduct = (productClicked) => {
    const index = props.originalProducts.findIndex(element => element.id === productClicked.id);
    if (index >= 0) { // kui ei leita üles, index on -1
      props.originalProducts.splice(index,1); // kui index -1 abil tehakse splice(), siis kustutatakse lõpust
    }
    fetch(productsUrl, {
      method: "PUT",
      body: JSON.stringify(props.originalProducts),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      props.setOriginalProducts(props.originalProducts.slice()); // uuendab originalProductse
      props.searchProducts('updated'); // siin uuendab productse
      toast.success('Edukalt kustutatud!', {
        position: "bottom-right",
        theme: "dark"
        });
    })
  }


  return ( 
      <div className={`cartProduct ${props.element.isActive ? "active": "inactive"}`} >
        <div onClick={() => changeProductActive(props.element)}>
          <img className="cartProductImg" src={props.element.imgSrc} alt="" />
          <div>{props.element.isActive + 0  }</div>
          <div>{props.element.name}</div>
          <div>{props.element.description}</div>
          <div>{props.element.price}</div>
          <div>{props.element.id}</div>
        </div>
        <button disabled={!props.element.stock} onClick={() => decreaseStock(props.element)}>-</button>
        { props.element.stock ? <div>{props.element.stock} tk</div> : <div>0 tk</div>}
        <button onClick={() => increaseStock(props.element)}>+</button>
        <Link to={`/admin/muuda/${props.element.id}`}>
          <button>Muuda</button>
        </Link>
        <button onClick={() => deleteProduct(props.element)}>X</button>
      </div>
   );
}

export default AdminProduct;