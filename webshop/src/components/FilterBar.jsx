import { useState } from "react";

function FilterBar(props) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filterByCat = (categoryClicked) => {
    if (categoryClicked === 'all') {
      props.setProducts(props.originalProducts);
      setActiveCategory('all');
    } else {
      const filteredProducts = props.originalProducts.filter(element => element.category === categoryClicked);
      props.setProducts(filteredProducts);
      setActiveCategory(categoryClicked);
    }
  }

  return (<div>
    <div className={activeCategory === 'all' ? "active-category": undefined} onClick={() => filterByCat('all')}>
      Kõik kategooriad
    </div>
    {props.categories.map(element => 
      <div
        key={element} 
        className={activeCategory === element ? "active-category" : undefined} 
        onClick={() => filterByCat(element)}>
          {element}
      </div>)}
  </div>)
}

export default FilterBar;
