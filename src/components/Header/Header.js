import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
//import { useContext } from 'react';

import { useState } from 'react';
import { useEffect,useRef } from 'react';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

    //hook declare kortechi. hook er function gulote use sobdoti bebohar kora hoy.
    //react custom hook likhe net a search dile hobe
const usePreviuos=value=>{
    const prev=useRef();
    useEffect(()=>{
        console.log(value);
        prev.current=value
    },[value])
    return prev.current;
}

const Header = () => {

    //useState namer ekta hook declare kortechi jar initial value dilam zero
    const[count,setCount]=useState(0);
    const prev=usePreviuos(count);
  //  const user=useContext(UserContext)
    const auth=useAuth();
    console.log(auth);
    return (
        <div className="Header">
            <img src={logo} alt=""/>
            <h1>Count:{count} Previous:{prev}</h1>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order review</a>
                <a href="/inventory">Manage Inventory</a>
                {
                    auth.user &&
                    <span style={{color:'yellow'}}>Welcome {auth.user.name}</span>
                    
                }
                {
                    auth.user ? <a href="/Login">Sign out</a>
                    : <a href="/Login">Sign in</a>

                }
            </nav>
        </div>
    );
};

export default Header;