import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/use-user';
import avatar from "../../images/avatar.png";
import cart from "../../images/cart.svg";
import './header.css';

export function Header() {
    const navigate = useNavigate();
    // const [userName, setUserName] = useContext(UserProvider); 
    const {userName, setUserName} = useUser(); 

    return(
        <>
            <hr/>
                <header>
                    <div className="">
                        <h2>JS BAND STORE Kuzyk Artem</h2>
                    </div>
                    <div className="user-cart-info">
                        <div>
                            <img    src={cart} 
                                    alt="cart" 
                                    className="icon" 
                                    onClick={() => {navigate("/cart")}} />
                            <p className='cart-counter'>5</p>
                        </div>
                        <input  type="button" 
                                value="Sing-Out" 
                                onClick={() => {navigate("/"); 
                                                setUserName(""); 
                                                window.localStorage.removeItem("userName")}} 
                        />
                        <img src={avatar} className="mini-avatar" alt="avatar" />
                        <p>{userName}</p>
                    </div>
                </header>
            <hr/>
        </>
    )
}