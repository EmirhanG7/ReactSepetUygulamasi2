export default function Basket({ basket, removeFromBasket }) {

    const handleRemoveFromBasket = (productId) => {
        removeFromBasket(productId)
    };


    return (
        
        <div className="basketList">
            <h3 className="title">Sepet</h3>
            
                {basket.length > 0 ? (
                <div className="basketItems">
                
                    {basket.map((basket) => (
                    <div className="basketItem" key={basket.productId}>
                        <img src={basket.thumbnail} alt={basket.title} />
                        <h3>{basket.title}</h3>
                        <p>{basket.stock} Adet</p>
                        <p>{basket.price} USD</p>
                        <button onClick={() => handleRemoveFromBasket(basket.productId)}>Remove from cart</button>
                    </div>
                    ))}
                    
                    <h4>Toplam: {basket.map(x => x.price * x.stock).reduce((a, b) => a + b).toLocaleString('en-US')} USD</h4>
                
                </div> )
             : (<p>Sepetinizde ürün bulunmamaktadır.</p>)}
        </div>
    )
}