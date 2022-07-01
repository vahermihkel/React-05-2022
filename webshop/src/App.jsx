import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AboutUs from './pages/AboutUs';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import Category from './pages/admin/Category';
import MaintainProducts from './pages/admin/MaintainProducts';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Shops from './pages/Shops';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path='' exact element={ <Home /> } />
        <Route path='ostukorv' exact element={ <Cart /> } />
        <Route path='admin' exact element={ <AdminHome /> } />
        <Route path='admin/lisa-toode' exact element={ <AddProduct /> } />
        <Route path='admin/halda-kategooriaid' exact element={ <Category /> } />
        <Route path='admin/halda-tooteid' exact element={ <MaintainProducts /> } />
        <Route path='poed' exact element={ <Shops /> } />
        <Route path='meist' exact element={ <AboutUs /> } />
        <Route path='*' exact element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
