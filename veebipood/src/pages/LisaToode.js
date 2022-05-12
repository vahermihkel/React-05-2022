import { useRef, useState } from "react";

function LisaToode() {
  // useState
  const [s6numKasutajale, m22raS6num] = useState("");
  const toodeRef = useRef();

  function lisaUusToode() {
    // useRef
    console.log(toodeRef.current.value);
    if (toodeRef.current.value === "") {
      m22raS6num("Sisestasid tühjuse, ei saanud lisada"); // useState funktsioon
    } else {
      m22raS6num("Toode edukalt lisatud"); // useState funktsioon
      let tooted = []; // tehakse uus muutuja, mis on tühi massiiv
      if (localStorage.getItem("toode") !== null) {
                            // "["cows"]"
                // JSON.parse("["cows"]")   --> ["cows"]
        tooted = JSON.parse(localStorage.getItem("toode"));
      }
      // [].push("cows")--> ["cows"]
      tooted.push(toodeRef.current.value);
        //   key      |      value
        // "toode"    |   "["cows"]"
      localStorage.setItem("toode", JSON.stringify(tooted));
    }
 
  }

  return (
    <div>
      <label>Toote nimi</label> <br />
      <input ref={toodeRef} type="text" /> <br />
      <button onClick={() => lisaUusToode()}>Sisesta</button> <br />
      <div>{s6numKasutajale}</div>
    </div>)
}

export default LisaToode;

// SALVESTAMISEKS:
// 1. Andmebaas - tooted
// 2. Brauserisse - kasutajaga seotud andmed
// 3. Faili salvestused - logid