import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css'
import ProductData from '../ProductData/ProductData';
import Cart from '../Cart/Cart';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const StoredCart = getStoredCart()
        const saveCart = []
        for (const id in StoredCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = StoredCart[id]
                addedProduct.quantity = quantity
                saveCart.push(addedProduct)
            }
            setCart(saveCart)
        }
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        const exists = cart.find(product => product.id === selectedProduct.id)
        let newCart = [];
        if (!exists) {
            selectedProduct.quantity = 1
            newCart = [...cart, selectedProduct]
        }
        else {
            const res = cart.filter(product => product.id !== selectedProduct.id)
            exists.quantity = exists.quantity + 1;
            newCart = [...res, exists]
        }
        setCart(newCart)
        addToDb(selectedProduct.id)
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