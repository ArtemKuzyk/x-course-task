import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { UserProvider } from "./hooks/use-user";
import { LocalStorageService, LS_KEYS } from "./services/localStorage";
import { CartProvider } from "./hooks/use-cart";
import { BookProvider } from "./hooks/use-book";
import { SpecificBookProvider } from "./hooks/use-specific-book";
import { BookData, DATA_URL } from "./services/bookDataLoader";
import ShopRoutes from "./components/shopRouter/ShopRoutes"

function App() {

  const [userName, setUserName] = useState(
    LocalStorageService.get(LS_KEYS.USER) || ""
  );
  const [bookCartChoice, setBookCartChoice] = useState({});
  const [specificBook, setSpecificBook] = useState(LocalStorageService.get(LS_KEYS.SPECIFIC_BOOK) || {});

  const initialBookArray = LocalStorageService.get(LS_KEYS.BOOK_LIST) || BookData.set(DATA_URL.PATH);
  
  useEffect(() => {
      if(userName) setBookCartChoice(LocalStorageService.get(LS_KEYS.CART_LIST)?.[userName] || {});
  }, [userName])

  return (
    <HashRouter basename='/'>
      <UserProvider value={{userName : userName, setUserName : (i) => setUserName(i)}}>
      <BookProvider value={initialBookArray}>
      <CartProvider value={{bookCartChoice : bookCartChoice, setBookCartChoice : (i) => setBookCartChoice(i)}}>
      <SpecificBookProvider value={{specificBook : specificBook, setSpecificBook : (i) => setSpecificBook(i)}}>
        <div className="App">
          {/* <div className="Example"> Ghbdsn </div> */}
          <ShopRoutes />
        </div>
      </SpecificBookProvider>
      </CartProvider>
      </BookProvider>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
