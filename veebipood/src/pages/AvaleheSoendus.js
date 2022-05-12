import { useState } from "react";

function AvaleheSoendus() {
      // HTMLi saan tagantjärgi AINULT useState abil muuta
  // const [muutuja, funktsioon] = useState("muutuja algväärtus");
  // const [word, setWord] = useState("sõnaline muutuja");
  // const [numbriline, uuendaNumbrilist] = useState(12312);
  // const [kahendV22rtus, uuendaBooleani] = useState(true);

  // let muutuja2 = "muutuja algväärtus2";

  // function funktsioon2() {
  //   muutuja2 = "uus väärtus2";
  //   console.log(muutuja2);
  // }

  // function muudaK6ik() {
  //   funktsioon("kolmas väärtus");
  //   setWord("kolmas väärtus");
  //   uuendaNumbrilist("kolmas väärtus");
  //   uuendaBooleani("kolmas väärtus");
  // }

  return (
  <div>
    <button onClick={() => muudaK6ik()}>Muuda kõiki</button>
    <div>{muutuja}</div>
    <div>{word}</div>
    <div>{word + word}</div>
    <div>{numbriline}</div>
    <div>{numbriline + numbriline}</div>
    <div>{word + numbriline}</div>
   { numbriline < 8000 && <div>TERTERETER{kahendV22rtus + kahendV22rtus}</div>}
    {/* <div>{muutuja2}</div> */}
    {kahendV22rtus && <button onClick={() => setWord("sõnalise muutuja uus väärtus")}>Muuda sõna</button>}
    <button onClick={() => uuendaNumbrilist(4121)}>Muuda numbrit</button>
    <button onClick={() => uuendaBooleani(false)}>Muuda booleani</button>
    <button onClick={() => funktsioon("uus väärtus")}>Muuda muutujat nr1</button>

    {/* <button onClick={() => funktsioon2()}>Muuda muutujat nr2</button> */}
  </div>);
}

export default AvaleheSoendus;