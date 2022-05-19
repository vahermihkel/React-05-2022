import { useState } from "react";

function HaldaTooteid() {
  // const tooted = [{nimi: "Coca cola", hind: 3}, {nimi: "Fanta", hind: 1}, {nimi: "Vichy", hind: 2}];
  const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("toode")) || []);

  const kustuta = (element) => {
    const j2rjekorraNumber = tooted.indexOf(element);
    tooted.splice(j2rjekorraNumber,1);
    uuendaTooted(tooted.slice());
    localStorage.setItem("toode", JSON.stringify(tooted));
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
      </div>
    ) }
  </div>)
}

export default HaldaTooteid;