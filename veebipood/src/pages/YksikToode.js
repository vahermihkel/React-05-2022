import { useParams } from "react-router-dom";

function YksikToode() {
  // NÄIDE: "fanta"       
  const { nimi } = useParams();
  // console.log(nimi);
  const tooted = JSON.parse(localStorage.getItem("toode"));

  //[{nimi: "Coca cola", hind: 5},{nimi: "Fanta", hind: 2},{nimi: "Fanta", hind: 3}]
  // .find({nimi: "Coca cola", hind: 5} =>  "coca-cola"   ===  "fanta"   )    false
  //         {nimi: "Fanta", hind: 2} =>  "fanta"   ===  "fanta"    )     true  //// LÕPP
  //         {nimi: "Fanta", hind: 3} =>     ===  "fanta"    )    SIIA EI JÕUA
  const leitud = tooted.find(element => element.nimi
      .toLowerCase().replaceAll(" ", "-").replaceAll(",", "").replaceAll("õ","o") === nimi );
  // const leitud = {nimi: "Fanta", hind: 2};
  return (
  <div>
    {leitud && 
    <div>
      <div>{leitud.nimi}</div>
      <div>{leitud.hind}</div>
    </div>}
    {!leitud && <div>Valitud toodet ei leitud</div>}
  </div>)
}

export default YksikToode;