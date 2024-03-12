import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="App">
            <h1>Products Grid</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
                        <img src={product.image} alt={product.title} />
                        <div className="product-info">
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseDetails}>&times;</span>
                        <div className="product-details">
                            <img src={selectedProduct.image} alt={selectedProduct.title} />
                            <div>
                                <h2>{selectedProduct.title}</h2>
                                <p>{selectedProduct.description}</p>
                                <p>Price: ${selectedProduct.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
