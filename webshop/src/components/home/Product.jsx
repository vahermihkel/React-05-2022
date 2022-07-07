import { toast } from 'react-toastify';
import { sumOfCartService } from '../../store/sumOfCartService';

function Product(props) {

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
    let sumOfCart = 0;
    cProducts.forEach(element => sumOfCart += element.product.price * element.quantity);
    sumOfCartService.sendCartSum(sumOfCart);

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
    <img src={props.element.imgSrc} alt="" />
    <div>{props.element.name}</div>
    <div>{props.element.price}</div>
    <div>{props.element.id}</div>
    <button onClick={() => addToCart(props.element)}>Lisa ostukorvi</button>
  </div>)
}

export default Product;