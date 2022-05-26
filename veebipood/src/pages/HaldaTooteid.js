import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  // const tooted = [{nimi: "Coca cola", hind: 3}, {nimi: "Fanta", hind: 1}, {nimi: "Vichy", hind: 2}];
  // const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("toode")) || []);
  const [tooted, uuendaTooted] = useState([]);

  useEffect(()=>{
    fetch("https://react-05-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
      .then(tagastus => tagastus.json())
      .then(object => {
        const tootedAndmebaasist = [];
        for (const key in object) {
          tootedAndmebaasist.push(object[key])
        }
        uuendaTooted(tootedAndmebaasist);
      })
  },[]);


  const kustuta = (element) => {
    const j2rjekorraNumber = tooted.indexOf(element);
    tooted.splice(j2rjekorraNumber,1);
    uuendaTooted(tooted.slice());
    // localStorage.setItem("toode", JSON.stringify(tooted));
    fetch("https://react-05-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",{
        method: "PUT",
        body: JSON.stringify(tooted),
        headers: {
          "Content-Type": "application/json"
        }
      });
  }

  return (
  <div>
    { tooted.map(element =>
      <div>
        <div>Nimi: {element.nimi}</div>
        <div>Hind: {element.hind}</div>
        <div>Ühikuhind: 1.5</div>
        <div>Soodushind: JAH</div>
        <button onClick={() => kustuta(element)}>x</button><br />
        <Link to={"/muuda/" + element.nimi.toLowerCase().replaceAll(" ", "-")}>
          <button>Muuda</button>
        </Link>
      </div>
    ) }
  </div>)
}

export default HaldaTooteid;