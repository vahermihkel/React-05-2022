import { useEffect, useRef, useState } from "react";

function ParcelMachines(props) {

  const [parcelMachines, setParcelMachines] = useState([]);

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(body => setParcelMachines(body))
  },[]);

  const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("parcelMachine"));
  const parcelMachineRef = useRef();

  const addParcelMachine = () => {
    setSelectedPM(parcelMachineRef.current.value);
    const pm = {
      product:
      {id: 11112222, name: "Pakiautomaadi tasu", price: 3.5, imgSrc: require("../assets/locker.png")}, 
      quantity:1
    };
    props.cartProducts.push(pm);
    props.setCProducts(props.cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(props.cartProducts));
    sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
  }

  const deleteParcelMachine = () => {
    setSelectedPM(null);
    props.cartProducts.pop();
    props.setCProducts(props.cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(props.cartProducts));
    sessionStorage.removeItem("parcelMachine");
  }

  return (<div>
      { selectedPM === null && props.cartProducts.length > 0 && 
     <div>
        <label>Vali automaat</label>
        <select onChange={addParcelMachine} ref={parcelMachineRef}>
        {parcelMachines.filter(element => element.A0_NAME === "EE").map(element => <option key={element.NAME}>{element.NAME}</option>)}
        </select>
      </div>}

     { selectedPM !== null && 
     <div>{selectedPM} <button onClick={deleteParcelMachine}>X</button> </div>}
  </div>)
}

export default ParcelMachines;