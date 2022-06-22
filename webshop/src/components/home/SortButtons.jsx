
function SortButtons(props) {
  const sortAZ = () => {
     props.prods.sort((a,b) => a.name.localeCompare(b.name)); // .name
     props.setHomeProducts(props.prods.slice());
   }
 
   const sortZA = () => {
     props.prods.sort((a,b) => b.name.localeCompare(a.name)); // .name
     props.setHomeProducts(props.prods.slice());
   }
 
   const sortPriceAsc = () => {
     props.prods.sort((a,b) => a.price - b.price); // .price
     props.setHomeProducts(props.prods.slice());
   }
 
   const sortPriceDesc = () => {
     props.prods.sort((a,b) => b.price - a.price); // .price
     props.setHomeProducts(props.prods.slice());
   }

  return (<div>
    <button onClick={sortAZ}>Sorteeri A-Z</button>
    <button onClick={sortZA}>Sorteeri Z-A</button>
    <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
    <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
  </div>)
}

export default SortButtons;