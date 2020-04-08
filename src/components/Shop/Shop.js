import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import { useEffect } from 'react';
import Product from '../Product/Product'
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    const first10=fakeData.slice(0,10)
    const [products,setProducts]=useState(first10)
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const previousCart=productKeys.map(existingKey=>{
            const product=fakeData.find(pd=>pd.key===existingKey);
            product.quantity=savedCart[existingKey];
            return product;

        })
    },[])

    const handleAddProduct=(product)=>{
        const toBeAdded=product.key;
        const sameProduct=cart.find(pd=>pd.key===toBeAdded)
        let count=1;
        let newCart;
        if(sameProduct){
            const count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==toBeAdded);
            newCart=[...others,sameProduct]
        }
        else{
            product.quantity=1;
            newCart=[...cart,product]
        }
       setCart(newCart)


        addToDatabaseCart(product.key,count);
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">
                
                    {
                        products.map(products=> <Product
                            key={products.key}   //protiti product er unique key thakbe
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={products}></Product>)
                    }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                    <Link to="/review">
                    <button className="main-btn">Review Order</button>
                    </Link>
                </div>
                
          

        </div>
    );
};

export default Shop;