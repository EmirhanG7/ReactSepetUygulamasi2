export default function Products({ products, addToBasket, handleFilterChange, filter, filteredProducts }) {
    return (
      <>
        <div className="productList">
          <h3 className="title">Ürünler</h3>
          <input type="text" value={filter} onChange={handleFilterChange} placeholder="Ürünleri filtrele" />
          <div className="products">
            {products &&
              filteredProducts.map(product => (
                <div className="product" key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>{product.price} USD</p>
                  <button onClick={() => addToBasket(product)}>Add to cart</button>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }