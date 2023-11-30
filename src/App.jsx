import { useEffect, useRef, useState } from 'react'
import Products from './components/Products'
import Basket from './components/Basket'
import './App.css'

function App() {
  const [products, setProductsList] = useState([]);
  const [basket, setBasket] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoadMore, setLoadMore] = useState(false);
  const totalPages = useRef(0);
  const currentPages = useRef(1);
  const limit = 20;

  let productList = []

  useEffect(() => {
    async function fetchData() {
      const fetchProducts = await fetch('https://dummyjson.com/products?limit=' + limit).then(r => r.json())
      productList = fetchProducts.products
      console.log(productList)
      setProductsList([...(productList)]);

      totalPages.current = Math.ceil(fetchProducts.total / fetchProducts.limit);
      console.log(totalPages.current = Math.ceil(fetchProducts.total / fetchProducts.limit))

      if(totalPages.current > 1) {
        setLoadMore(true);
      }

    }

    fetchData()

  }, []);

  async function HandleLoadMore() {

    currentPages.current += 1;

    if((currentPages.current + 1) > totalPages.current) {
      setLoadMore(false);
    }

    const skip = (currentPages.current - 1) * limit;
    const data = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`).then(r => r.json());
    
    setProductsList([...products, ...data.products]);

  }

  const handleFilterChange = (e) => {
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
      <Products products={products} addToBasket={addToBasket} filter={filter} handleFilterChange={handleFilterChange} filteredProducts={filteredProducts}/>
      <Basket basket={basket} removeFromBasket={removeFromBasket}/>
      {isLoadMore && <div className="showMore"><button onClick={HandleLoadMore}>Daha Fazla Yükle</button></div>}
    </div>
  )
}

export default App
