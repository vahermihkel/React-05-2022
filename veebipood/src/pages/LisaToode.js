import { useRef, useState } from "react";

function LisaToode() {
  console.log("olen lisa toode lehel");

  // useState
  const [s6numKasutajale, m22raS6num] = useState("");
  const toodeRef = useRef();

  function lisaUusToode() {
    // useRef
    console.log("alustasin funktsiooni");
    console.log(toodeRef.current.value);
    if (toodeRef.current.value === "") {
      console.log("ref oli tühi???");
      m22raS6num("Sisestasid tühjuse, ei saanud lisada"); // useState funktsioon
    } else {
      console.log("ref ei olnud tühi, jätkan")
      m22raS6num("Toode edukalt lisatud"); // useState funktsioon
      let tooted = []; // tehakse uus muutuja, mis on tühi massiiv
      if (localStorage.getItem("toode") !== null) {
                            // "["cows"]"
                // JSON.parse("["cows"]")   --> ["cows"]
        console.log("localStorage-st saadud ei ole null ehk tühjus");
        tooted = JSON.parse(localStorage.getItem("toode"));
      }
      // [].push("cows")--> ["cows"]
      tooted.push(toodeRef.current.value);
        //   key      |      value
        // "toode"    |   "["cows"]"
      localStorage.setItem("toode", JSON.stringify(tooted));
      console.log("lõpetasin else bloki")
    }
    console.log("lõpetasin funktsiooni");
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