// import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../../hooks/use-user";
import avatar from "../../../images/avatar.png"
import './signin.css'

export function Signin(){
    const [inputValue, setInputValue] = useState("");
    const {userName, setUserName} = useUser();
    useEffect(() => {
        if(inputValue.length < 4 || inputValue.length > 16){
            document.querySelector('#signin').disabled = true;
        } else {document.querySelector('#signin').disabled = false;}
    });

    const navigate = useNavigate();

    return (
        <section className='signin-section'>
            <img    src={avatar} 
                    alt="avatar" 
                    className="avatar-image"/>
            {/* <!-- <form action=""> --> */}
            <label htmlFor="username">Username</label>
            <input  type="text" 
                    name="username" 
                    id="username" 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="type Username"/>
            <input  type="button" 
                    id='signin' 
                    value="Sign-In" 
                    onClick={() => {navigate("/book-list"); 
                                    setUserName(inputValue); 
                                    window.localStorage.setItem("userName", inputValue);}
                            } />
            {/* <!-- </form> --> */}
        </section>    
    );
}