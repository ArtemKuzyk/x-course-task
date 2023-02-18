import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import cn from 'classnames'
import { useCart } from "../../../hooks/use-cart";
import { useUser } from "../../../hooks/use-user";
import { useSpecificBook } from "../../../hooks/use-specific-book";
import { LS_KEYS, LocalStorageService } from "../../../services/localStorage";
import { handleChangeCount } from "../../../helpers/handleChangeCount";
import { getTotalPrice } from "../../../helpers/getTotalPrice";
import upArrow from "../../../images/up-arrow.png"
import downArrow from "../../../images/down-arrow.png"
import image from "../../../images/imageNotFound.png"
import "./specific-book.css";

export function SpecificBook(){
    // const {state} = useLocation();
    // const data = state.data;  
    const {userName} = useUser(); 
    const {specificBook} = useSpecificBook();
    const data = specificBook.data;
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(data.price);
    const {bookCartChoice, setBookCartChoice} = useCart();
    const [isActiveAddButton, setIsActiveAddButton] = useState(false);
    let [visibleClass, setVisibleClass] = useState(true);

    useEffect(() => {
        if (bookCartChoice[data.id]) {
            setVisibleClass(false);
        }
    }, [bookCartChoice]);

    const checkValidValue = (e) => {
        let value = e.target.value;
        setCount(+value);
    }

    useEffect(() => {
        if(count < 1 ) setCount({});
        if(count > 42) setCount(42);
        typeof count === "object" ? setTotalPrice(data.price) : setTotalPrice(getTotalPrice(count, data.price))
    },[count, data.price]);

    const addChoiceBook = () => {
        let cartCount;
        if(bookCartChoice.hasOwnProperty(data["id"])){
            cartCount = bookCartChoice[data["id"]]["count"] + count;
        } else { cartCount = count }
        const choiseData = {"id" : data.id, "author" : data.author, "title" : data.title, "price" : data.price, "count" : cartCount, "totalPrice" : totalPrice}
        setBookCartChoice(prev => ({
            ...prev, [data.id] : choiseData
        }));
        saveSelectedDataToLocalStorage(choiseData);
    }

    const saveSelectedDataToLocalStorage = (choiseData) => {
        let data = LocalStorageService.get(LS_KEYS.CART_LIST) || {};
        if(!data.hasOwnProperty(userName)){
            data[userName] = {};
        }
        data[userName][choiseData["id"]] = choiseData;
        LocalStorageService.set(LS_KEYS.CART_LIST, data)
    }

    const checkToSymbol = (e) => {
        const keyCode = e.keyCode
        if (keyCode === 188 || keyCode === 190 || keyCode === 191 || keyCode === 110) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        if(Number.isInteger (count)){
            setIsActiveAddButton(false);
        }else{
            setIsActiveAddButton(true);
        }
    }, [count])

  return(
    <>
        <section className="specific-book-section">
            <div className="container">
                <section className="book-main-info">
                    <section className="book-image">
                        <img src={data.image ? data.image : image} alt="book" className="book-description__image"/>
                    {/* <!-- <p className="book-description__description">Description: A book providing an introduction to the CSS in general</p> --> */}
                    </section>
                    <section className="book-info">
                        <p className="book-info__text book-info__name">{data.title}</p>
                        <p className="book-info__text book-info__author"><span>Author</span>: {data.author}</p>
                        <p className="book-info__text book-info__level"><span>Book level:</span> {}</p>
                        <p className="book-info__text book-info__tags"><span>Book tags:</span> {}</p>
                    </section>
                </section>
                <section className="prise-section">
                    <div className="container border-dash">
                        <div>
                            <p className="prise-section__text">price, $</p>
                            <label htmlFor="count" className="prise-section__text">Count</label>
                            <p className="prise-section__text">Toral price</p>
                            <p className={cn("prise-section__text", { "visible-hidden" : visibleClass })}>in your cart: <span>{bookCartChoice[data.id] ? bookCartChoice[data.id].count : ''}</span></p>
                        </div>
                        <div>
                            <p className="prise-section__text" id="prise">{data.price}</p>
                            <div className="prise-section__input-field">
                                <input  type="number" 
                                        pattern="[0-9]{10}"
                                        className="prise-section__text text-align-start prise-section__count"
                                        value={count}
                                        onKeyDown={checkToSymbol}
                                        onInput={checkValidValue} />
                                {/* <img src={upArrow} alt="&#8657" id="upArrow" onClick={() =>setCount((typeof count === "object" ? 0 : count) + 1)}/>
                                <img src={downArrow} alt="&#8659" id="downArrow" onClick={() =>setCount((typeof count === "object" ? 0 : count) - 1)}/> */}
                                <img src={upArrow} alt="&#8657" id="upArrow" onClick={() => setCount(handleChangeCount(true, count))}/>
                                <img src={downArrow} alt="&#8659" id="downArrow" onClick={() => setCount(handleChangeCount(false, count))}/>
                            </div>
                            <p className="prise-section__text" id="total-prise">{totalPrice}</p>
                        </div>
                        <input type="button" value="Add to cart" className="prise-section__text abs" onClick={addChoiceBook} disabled={isActiveAddButton} />{/*add disabled when value ""*/}
                    </div>
                </section>
            </div>
            
            <section>
                <p className="book-description__description"><span>Book description:</span> {data.description}</p>
            </section>
        </section>

    </>
    );
}