import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useUser } from '../../hooks/use-user';
import { useCart } from '../../hooks/use-cart';
import avatar from "../../images/avatar.png";
import cart from "../../images/cart.svg";
import './header.css';

export function Header() {
    const navigate = useNavigate();
    // const [userName, setUserName] = useContext(UserProvider); 
    const {userName, setUserName} = useUser();
    const [displayCartCounter, setDisplayCartCounter] = useState(true);
    const {bookCartChoice} = useCart();
    console.log(Object.keys(bookCartChoice).length)

    useEffect(() => {
        if(userName){
            setDisplayCartCounter(false);
        } else {setDisplayCartCounter(true);}
    }, [userName]);

    return(
        <>
            <hr/>
                <header>
                    <div className="">
                        <h2>JS BAND STORE Kuzyk Artem</h2>
                    </div>
                    <div className="user-cart-info">
                        <button className='cart-button'>
                            <img    src={cart} 
                                    alt="cart" 
                                    className="icon" 
                                    onClick={() => {navigate("/cart")}} />
                            <p className={cn('cart-counter', {'display-none' : displayCartCounter})}>{Object.keys(bookCartChoice).length}</p>
                        </button>
                        <input  type="button" 
                                value="Sing-Out" 
                                className={cn('cart-counter', {'display-none' : displayCartCounter})}
                                onClick={() => {navigate("/"); 
                                                setUserName(""); 
                                                window.localStorage.removeItem("userName")}} 
                        />
                        <img src={avatar} className="mini-avatar" alt="avatar" />
                        <p className={cn('cart-counter', {'display-none' : displayCartCounter})}>{userName}</p>
                    </div>
                </header>
            <hr/>
        </>
    )
}