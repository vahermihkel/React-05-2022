import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import HaldaTooteid from './pages/HaldaTooteid';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';
import YksikToode from './pages/YksikToode';

function App() {
  return (
    <div className="App">
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>
      <Link to="/halda-tooteid">
        <button>Halda tooteid</button>
      </Link>
      <Link to="/poed">
        <button>Poed</button>
      </Link>
      <Routes>
        <Route path="" exact element={ <Avaleht /> } />
        <Route path="ostukorv" exact element={ <Ostukorv /> } />
        <Route path="lisa-toode" exact element={ <LisaToode /> } />
        <Route path="halda-tooteid" exact element={ <HaldaTooteid /> } />
        <Route path="poed" exact element={ <Poed /> } />
        <Route path="toode/:nimi" exact element={ <YksikToode /> } />
      </Routes>
    </div>
  );
}

export default App;
