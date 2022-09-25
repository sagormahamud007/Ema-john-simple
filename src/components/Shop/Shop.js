import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css'
import ProductData from '../ProductData/ProductData';
import Cart from '../Cart/Cart';
const Shop = () => {
    const [products, setShops] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setShops(data))
    }, [])
    const handleAddToCart = (product) => {
        console.log(product)
        const newCart = [...cart, product];
        setCart(newCart)
    }
    return (
        <div className='shop'>
            <div className='Product-container'>
                {
                    products.map(product => <ProductData
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></ProductData>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;