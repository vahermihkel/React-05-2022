import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sumOfCartService } from '../store/sumOfCartService';
import { useEffect, useState } from 'react';

function NavigationBar() {

  const { t, i18n } = useTranslation();

  // componentDidMount -> lehe peale mindi
  // uef
  useEffect(() => {
    sumOfCartService.getCartSum().subscribe(sumOfCart => setCartSum(sumOfCart));
  }, []);

  const calculateSumOfCart = () => {
    const cartProducts = JSON.parse(sessionStorage.getItem("cartProducts")) || [];
    let sumOfCart = 0;
    cartProducts.forEach(element => sumOfCart += element.product.price * element.quantity);
    return sumOfCart;
  }

  const [cartSum, setCartSum] = useState(calculateSumOfCart());

  const onChangeLanguage = (language) => {
    //i18n.changeLanguage('ee');
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }

  // const onChangeLanguageEE = () => {
  //   i18n.changeLanguage('ee');
  //localStorage.setItem("language", "EE");
  // }

  return (
  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand as={Link} to="/"> <img src={require('../assets/webshio.png')} alt="" /> </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/admin">{t("navbar.admin-button")}</Nav.Link>
      <Nav.Link as={Link} to="/ostukorv">{t("navbar.cart-button")}</Nav.Link>
      <Nav.Link as={Link} to="/poed">Poed</Nav.Link>
      <Nav.Link as={Link} to="/meist">Meist</Nav.Link>
      <div>{t('Welcome to React')}</div>
      <img className="lang" onClick={() => onChangeLanguage('ee')} src={require('../assets/estonia.png')} alt="" />
      <img className="lang" onClick={() => onChangeLanguage('uk')} src={require('../assets/uk.png')} alt="" />
      <img className="lang" onClick={() => onChangeLanguage('ru')} src={require('../assets/russia.png')} alt="" />
      <div>{cartSum.toFixed(2)}</div>
    </Nav>
    </Container>
  </Navbar>)
}

export default NavigationBar;