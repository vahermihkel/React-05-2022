// 1. map HTML-s
// 2. const muutuja üleval, kust võtan mapi jaoks väärtuseks
// 3. muutuja võtab sessionStorage-st (mis on esialgu tühi)
// 4. lisame sessionStorage-sse ise otse väärtused
// 5. Avalehele ja teeme võimekuse sessionStorage-sse lisada

import { useState } from "react";

function Ostukorv() {
  const [ostukorviEsemed, uuendaOstukorvi] = useState(
    JSON.parse(sessionStorage.getItem("ostukorviTooted")) || []);

  const kustutaOstukorvist = (element) => {
    const j2rjekorraNumber = ostukorviEsemed.indexOf(element);
    console.log(j2rjekorraNumber);
    ostukorviEsemed.splice(j2rjekorraNumber,1);
    // .delete() <- ei ole 
    // .remove() <- ei ole 
    console.log(ostukorviEsemed);
    // uuendaOstukorv();
    uuendaOstukorvi(ostukorviEsemed.slice());
    // console.log(ostukorviEsemed === ostukorviEsemed); // true
    // console.log(ostukorviEsemed.slice() === ostukorviEsemed); // false
    sessionStorage.setItem("ostukorviTooted",JSON.stringify(ostukorviEsemed));   

    // ["BMW", "Audi", "Volvo"]
    // .splice(index,mitu-tükki-kustutada,mida-asemele-panna1,2,3) -- kustutamiseks, asendamiseks - arrayle/listile
    //      ühe elemendi juurde lisamiseks - .splice(2,0,"Saab") --> ["BMW", "Audi", "Saab", "Volvo"]
    // .slice() -- array'st/listist teeb koopia     ostukorviEsemed2 -> uuendaOstukorvi() -> ostukorviEsemed
    //      kustutab mälukoha
    // .split() -- "Elas metsas mutionu, keset kuuski"  .split("a")  ->  ["El", "s mets", "s mut....."];
  }

  const lisaOstukorvi = (element) => {
    ostukorviEsemed.push(element);
    uuendaOstukorvi(ostukorviEsemed.slice());
    sessionStorage.setItem("ostukorviTooted",JSON.stringify(ostukorviEsemed));   
  }

  const tyhjenda = () => {
    uuendaOstukorvi([]);
    sessionStorage.setItem("ostukorviTooted",JSON.stringify([]));   
  }

  return (<div>
   { ostukorviEsemed.length > 0 && <div>Ostukorvis on {ostukorviEsemed.length} toodet</div>}
   { ostukorviEsemed.length > 0 && <button onClick={() => tyhjenda()}>Tühjenda</button>}
   { ostukorviEsemed.length === 0 && <div>Ostukorv on tühi</div>}
    {ostukorviEsemed.map(element => 
      <div>
         {element.nimi} ({element.hind} €)
        <button onClick={() => kustutaOstukorvist(element)}>X</button>
        <button onClick={() => lisaOstukorvi(element)}>+</button>
      </div>)}
  </div>);
}

export default Ostukorv;