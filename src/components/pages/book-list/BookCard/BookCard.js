import { Link } from "react-router-dom"
import { useSpecificBook } from "../../../../hooks/use-specific-book";
import { LocalStorageService, LS_KEYS } from "../../../../services/localStorage";
import image from "../../../../images/imageNotFound.png"

function BookCard(props){

    const {specificBook, setSpecificBook} = useSpecificBook();

    const handleViewButtonAction = (props) => {
        setSpecificBook(props);
        LocalStorageService.set(LS_KEYS.SPECIFIC_BOOK, props)
    }

    return(
        <div className="book-card" style={{height: "630.5px"}}>
            <img className="book-card_image" src={(props.data.image !== "" ? props.data.image : image)} alt="BookImage not found" />
            <p className="book-card_book-name">{(props.data.title.length < 24 ? props.data.title : props.data.title.slice(0, 24) + "...")}</p>
            <p className="book-card_author-name">{props.data.author}</p>
            <p className="book-card_price">{props.data.price}</p>
            <Link to="/specific-book" onClick={() => handleViewButtonAction(props)} ><button className="book-card_view-button" >View</button></Link>
        </div>
    )
}

export { BookCard }