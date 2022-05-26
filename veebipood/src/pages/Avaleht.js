// import { useState } from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {
  console.log("olen avalehel");
                        // kui siit tuleb tühjus,              siis võta tühi massiiv
  // const lisatudTooted = JSON.parse(localStorage.getItem("toode")) || [];
  const [lisatudTooted, uuendaTooted] = useState([]);

  // useEffect - ära teist korda kui useState abil uuendatakse, seda funktsionaalsust tee
  // fetch - automaatselt külge omadus: "mine edasi"
  useEffect(()=>{
    fetch("https://react-05-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
      .then(tagastus => tagastus.json())
      .then(object => {
        // {-N30Ak5V18-M4_yqRS_1: {…}, -N30B-UgExk6nYRQaiiS: {…}}  --> [{…},{…}]
        // forin
        const tootedAndmebaasist = [];
        for (const key in object) {
          // console.log(object[key]);
          tootedAndmebaasist.push(object[key])
        }
        uuendaTooted(tootedAndmebaasist);
        // tootedAndmebaasist = [{…},{…}]
      })
  },[]);
 
  // kuvan massiivina kõik tooted välja
  // JSON.parse()
  // .map() --- Reactis massiivi väljakuvamiseks (näitab mingit kindlat HTMLi blokki täpselt nii mitu korda
  //    kui palju on erinevaid elemente massiivi sees)
  // teeme igale tootele nupu ostukorvi lisamiseks

  // nupuvajutusega läheb sessionStorage-sse mingi kindla võtmega ja massiivina
  // Ostukorvi lehe ja seal kuvan ka .map() abil ostukorvi tooteid
  // useState abil muudan ostukorvi sisu silme ees
  // muudan ostukorvi sisu erinevate nuppudega - / +
  // + --- .push()   w3schools / mozilla
  // - --- .splice(järjekorranumbri, mitu-tükki)   w3schools / mozilla
  // kokkuarvutus mitu toodet mul on: massiivile .length   w3schools / mozilla

                      // "SPrite"
  function lisaOstukorvi(element) {
    console.log("asdasd");
    console.log(element);  //  -> rida 25:  "SPrite"
    // let ostukorviTooted = [];
    // if (sessionStorage.getItem("ostukorviTooted")) {
    //   ostukorviTooted = JSON.parse(sessionStorage.getItem("ostukorviTooted"));
    // }
        //  ["Coca cola", "Fanta"]  VÕI  []
    const ostukorviTooted = JSON.parse(sessionStorage.getItem("ostukorviTooted")) || [];
        //  [{nimi: "Coca cola", hind: 5}, "Fanta", "SPrite"]  VÕI  ["SPrite"]
    ostukorviTooted.push(element);
                                        // "["Coca cola", "Fanta", "SPrite"]"
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted));
  }

  return (
  <div>
    {lisatudTooted.map(element => 
      <div key={element.nimi}>
        <Link to={"toode/" + element.nimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ","o")}>
          {element.nimi} ({element.hind} €)
        </Link>
        <button onClick={() => lisaOstukorvi(element)}>Lisa {element.nimi} ostukorvi</button>
      </div>)}
  </div>);
}

export default Avaleht;

// 1.tavalised sulud on funktsioonide jaoks, funktsiooni nime järel
//            funktsioonist on võimalik parameetreid vastu võtta
// kollast värvi on funktsioonid
// sulud tekitavad ka komplekti millestki
// tehete järjekord
// if-l tavaliste sulgudega kontrollin kas on õige või väärt

// 2. loogelised sulud on:
//    * funktsioonide sisu jaoks (funktsiooni koodilõik on loogelisest sulust loogelise suluni)
//    * if sisu jaoks (if koodilõik on loogelisest sulust loogelise suluni)
//    * import juures defineerib loogeline sulg, et võetakse kasutusele tükk sellest node_module osast
//    * objektide jaoks, sidumaks kokku võtmeid ja väärtusi
//    * JavaScripti tähistuseks HTMLi sees

// 3. kandilised sulud on massiivide jaoks