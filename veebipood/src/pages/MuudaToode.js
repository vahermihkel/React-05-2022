import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function MuudaToode() {
  const { tooteNimi } = useParams();
  const nimiRef = useRef();
  const hindRef = useRef();

  // const tooted = JSON.parse(localStorage.getItem("toode"));
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

  const leitud = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ", "-") === tooteNimi );
  const j2rjekorraNumber = tooted.indexOf(leitud);

  // {nimi: 'Coca cola', hind: '5'}
  console.log(leitud);

  const uuendaToode = () => {
    const uuendatudToode = {
      nimi: nimiRef.current.value,
      hind: hindRef.current.value
    }
    // array[2] = 80;
    tooted[j2rjekorraNumber] = uuendatudToode;
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
     {leitud && <div>
        <label>Nimi</label> <br />
        <input ref={nimiRef} defaultValue={leitud.nimi} type="text" /> <br />
        <label>Hind</label> <br />
        <input ref={hindRef} defaultValue={leitud.hind} type="number" /> <br />
        <button onClick={() => uuendaToode()}>Muuda</button>
      </div>}
    </div>)
}

export default MuudaToode;