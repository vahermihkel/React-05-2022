import { useRef, useState } from "react";

function LisaToode() {
  console.log("olen lisa toode lehel");

  // useState
  const [s6numKasutajale, m22raS6num] = useState("");
  const toodeRef = useRef();
  const hindRef = useRef();

  function lisaUusToode() {
    // useRef
    console.log("alustasin funktsiooni");
    console.log(toodeRef.current.value);
    if (toodeRef.current.value === "" || hindRef.current.value === "") {
      console.log("ref oli tühi???");
      m22raS6num("Sisestasid tühjuse, ei saanud lisada"); // useState funktsioon
    } else if (hindRef.current.value < 0) {
      m22raS6num("Hind ei saa olla negatiivne");
    } else {
      const uusToode = {nimi: toodeRef.current.value, hind: hindRef.current.value};
      fetch("https://react-05-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",{
        method: "POST",
        body: JSON.stringify(uusToode),
        headers: {
          "Content-Type": "application/json"
        }
      });
      m22raS6num("Toode edukalt lisatud"); // useState funktsioon
      // ctrl + ä
      // console.log("ref ei olnud tühi, jätkan")
      // let tooted = []; // tehakse uus muutuja, mis on tühi massiiv
      // if (localStorage.getItem("toode") !== null) {
      //                       // "["cows"]"
      //           // JSON.parse("["cows"]")   --> ["cows"]
      //   console.log("localStorage-st saadud ei ole null ehk tühjus");
      //   tooted = JSON.parse(localStorage.getItem("toode"));
      // }
      // // [].push("cows")--> ["cows"]
      // // ["Coca cola", "Fanta"].push({nimi: toodeRef.current.value, hind: hindRef.current.value});
      // // ["Coca cola", "Fanta"].push({nimi: "m", hind: 1});
      // tooted.push({nimi: toodeRef.current.value, hind: hindRef.current.value});
      //   //   key      |      value
      //   // "toode"    |   "["cows"]"
      // localStorage.setItem("toode", JSON.stringify(tooted));
      // console.log("lõpetasin else bloki")
    }
    console.log("lõpetasin funktsiooni");
  }

  // function kontrolliHinnaKorrektsust() {

  // }

  const kontrolliHinnaKorrektsust = () => {
    if (hindRef.current.value < 0) {
      m22raS6num("Hind ei saa olla negatiivne");
    }
  }

  return (
    <div>
      <label>Toote nimi</label> <br />
      <input ref={toodeRef} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={hindRef} onChange={() => kontrolliHinnaKorrektsust()} type="number" /> <br />
      <button onClick={() => lisaUusToode()}>Sisesta</button> <br />
      <div>{s6numKasutajale}</div>
    </div>)
}

export default LisaToode;

// SALVESTAMISEKS:
// 1. Andmebaas - tooted
// 2. Brauserisse - kasutajaga seotud andmed
// 3. Faili salvestused - logid