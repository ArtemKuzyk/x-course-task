import { useEffect, useState } from "react";
// import {classnames as cn} from "classnames"
import { v4 as uuidv4 }  from "uuid";
import { useBook } from "../../../hooks/use-book";
import { SelectSortField } from "./SelectSortField";
import { BookCard } from "./BookCard";
import { SORT_VALUES } from "../../../constants/sortValues"
import loupeImg from "../../../images/loupe.png"
import "./bookList.css"

export function BookList(){
    
    const initialBookArray = useBook();
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBookArray, setSortBookArray] = useState([]);
    const [searchBookArray, setSearchBookArray] = useState([]);
    const [priseText, setPriseText] = useState("price:");

    useEffect(() => {
        setSortBookArray(initialBookArray);
    }, [initialBookArray]);

    useEffect(() => {
        setSearchBookArray(sortBookArray.filter((el) => el.title.toLowerCase().trim().includes(searchQuery.toLocaleLowerCase().trim())));
    }, [sortBookArray, initialBookArray, searchQuery])

    const changeSortSelectFieldClassName = () => {
        setIsActiveMenu(!isActiveMenu);
    }

    const sortFunction = (data, text) => {
        setSortBookArray(initialBookArray.filter((el) => (el.price > data[0] && el.price < data[1])));
        setPriseText(text);
    }

    return(
        <section className="main-section">
            <form className="search-bar">
                <div className="search-container">
                    <input type="search" placeholder="Search by book name" className="search-container__search-field" minLength="3" onChange={((e) => setSearchQuery(e.target.value))} />
                    <img src={loupeImg} className="search-container__img" alt="search" />
                </div>
                <div className={`search-bar__sort-select-field ${isActiveMenu ? "select-arrow-active" : ""}`} 
                    onClick={changeSortSelectFieldClassName}> {priseText} 
                    <div className={`select-items ${!isActiveMenu ? "select-hide" : ""}`}>
                        {SORT_VALUES.map(el => <SelectSortField  key={uuidv4()} data={el} sortFunction={sortFunction} />)}
                    </div>
                </div>
            </form>
            <div className="content">
                { (searchBookArray.length === 0 ? <NoFound /> :  searchBookArray.map(data => <BookCard key={data.id} data={data}/>)) }
            </div>
        </section>
    );
}

function NoFound(){
    return (<div className="no-result" style={{height:"75vh"}}>
        <h3 className="no-result__text">No results :(</h3> 
    </div>)
}

/////////////////////////////////////
//change card container size
function getCardHeight() {
    let heightArray = [];
    let cards = document.querySelectorAll(".book-card");
    for (let i = 0; i < cards.length; i++) {
        heightArray.push(+window.getComputedStyle(cards[i]).getPropertyValue("height").replace("px", ""));
    }
    return Math.max(...heightArray)
}
function setCardHeight(maxHeight) {
    let cards = document.querySelectorAll(".book-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.height = maxHeight + "px";
    }
}
function clearHeight(){
    let cards = document.querySelectorAll(".book-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.height = "";
    }
}
// const myWindow = document.querySelector.apply("html");
window.addEventListener("resize", () => {
    clearHeight();
    let maxHeight = getCardHeight();
    setCardHeight(maxHeight);
})
//
/////////////////////////////////////
