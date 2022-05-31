import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavigationBar() {

  const { t, i18n } = useTranslation();

                            // 'ee'
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
      <div>{t('Welcome to React')}</div>
      <img className="lang" onClick={() => onChangeLanguage('ee')} src={require('../assets/estonia.png')} alt="" />
      <img className="lang" onClick={() => onChangeLanguage('uk')} src={require('../assets/uk.png')} alt="" />
      <img className="lang" onClick={() => onChangeLanguage('ru')} src={require('../assets/russia.png')} alt="" />
    </Nav>
    </Container>
  </Navbar>)
}

export default NavigationBar;