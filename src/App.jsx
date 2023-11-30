import { useEffect, useState } from 'react'
import Products from './components/Products'
import Basket from './components/Basket'
import './App.css'


function App() {
  const [products, setProducts] = useState([])
  const [basket, setBasket] = useState([])
  const [filter, setFilter] = useState('')
  let productList = []

  useEffect(() => {
    async function fetchData() {
      const fetchProducts = await fetch('https://dummyjson.com/products').then(r => r.json())
      productList = fetchProducts.products
      console.log(productList)
      setProducts([...(productList)]);
    }


    fetchData()

  }, []);

  const handleFilterChance = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
    console.log(e.target.value)
  }

  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(filter.toLowerCase());
  });



  function addToBasket(product) {
    setBasket(function (prevBasket) {
      const foundItem = prevBasket.find(item => item.productId === product.id) || null;
      if(foundItem !== null) {
        foundItem.stock ++;
        return [...prevBasket];
      }
      const newBasketItem = {
        thumbnail: product.thumbnail,
        title: product.title,
        productId: product.id,
        stock: 1,
        price: product.price
      }
      return [...prevBasket, newBasketItem];
    });
  }
  

  function removeFromBasket(productId) {
    setBasket(prevBasket => {
      const foundItem = prevBasket.find(item => item.productId === productId);
      if (!foundItem) {
        return [...prevBasket];
      }
      if (foundItem.stock === 1) {
        return prevBasket.filter(item => item.productId !== productId); 
      }
      foundItem.stock--; 
      return [...prevBasket];
    });
  }


  return (
    <div className="container">
      <Products products={products} addToBasket={addToBasket} filter={filter} handleFilterChange={handleFilterChance} filteredProducts={filteredProducts}/>
      <Basket basket={basket} removeFromBasket={removeFromBasket}/> 
    </div>
  )
}

export default App
