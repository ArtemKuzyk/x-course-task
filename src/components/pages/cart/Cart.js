import React, { useState, useEffect } from "react";
import { useCart } from "../../../hooks/use-cart";
import { useUser } from "../../../hooks/use-user";
import { LocalStorageService, LS_KEYS } from "../../../services/localStorage";
import { CartElement } from "./cartElement";
import { EmptyCart } from "./emptyCart/EmptyCart";
import './cart.css'

export function Cart(){

    const {bookCartChoice, setBookCartChoice} = useCart();
    console.log(bookCartChoice)
    const [purchaseIsDisabled, setPurchaseIsDisabled] = useState(true);
    const {userName, setUserName} = useUser(); 
    const totalPrice = Math.round(Object.keys(bookCartChoice).reduce((sum, el) => sum + Math.round(bookCartChoice[el].price * bookCartChoice[el].count *100) / 100, 0) * 100) / 100;

    useEffect(() => {
        if(Object.keys(bookCartChoice).length === 0){
            setPurchaseIsDisabled(true);
        } else {
            setPurchaseIsDisabled(false);
        }
    },[bookCartChoice]);

    const changeBookCartChoice = () => {
        setBookCartChoice({});
        let data = LocalStorageService.get(LS_KEYS.CART_LIST) || {};
        if(data.hasOwnProperty(userName)){
            data[userName] = {};
        }
        LocalStorageService.set(LS_KEYS.CART_LIST, data)
    }

    return(
        <section className="cart-section">
            <div className="container">
                {Object.keys(bookCartChoice).length === 0 ? <EmptyCart svgStyle={{height: "90%", maxWidth: "90%", width: "auto"}}/> :
                    <>
                        <table>
                            <thead>
                                <tr>
                                    {/* <th style={{width : '5%'}}></th> */}
                                    <th style={{width : '50%'}}>Book name</th>
                                    <th style={{width : '10%'}}>Count</th>
                                    <th style={{width : '10%'}}>Price</th>
                                    <th style={{width : '10%'}}>Total prise</th>
                                </tr>
                            </thead>
                            <tbody>
                                { Object.keys(bookCartChoice).map((el) => <CartElement key={bookCartChoice[el].id} data={bookCartChoice[el]} />) }
                            </tbody>
                        </table>
                        <div className="total-price"><p>Total price, $ <span>{totalPrice}</span></p></div>
                    </> 
                }
            </div>
            <button className="button-prchase" onClick={changeBookCartChoice} disabled={purchaseIsDisabled}>Purchase</button>
        </section>
    );
}