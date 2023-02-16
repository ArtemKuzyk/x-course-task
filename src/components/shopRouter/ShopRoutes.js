import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import { SigninPage, BookListPage, SpecificBookPage, CartPage, NotFoundPage, Layout } from "../../routes";

export default function ShopRoutes(){
    const {userName, setUserName} = useUser(); 

    const checkUser = () => {
        let userName = window.localStorage.getItem("userName");
        if (userName) return userName;
        return ""; 
    }
    let savedUserName = checkUser();

    // Check will is work in App component?

    // useEffect(() => {
    //     if(localStorage.getItem('myKey')) {
    //       setState(localStorage.getItem('myKey');
    //     }
    //   }, []);
      
    //   useEffect(() => {
    //     localStorage.setItem('myKey', state);
    //   }, [state]);

    useEffect(() => {
        if(savedUserName !== "" || savedUserName !== null || savedUserName !== undefined){
            setUserName(savedUserName);
        }
    }, [userName]);

    return(
        <>
            <Routes>
                {
                    <Route path="/" element={<Layout />}>
                        {(savedUserName.length < 4 || savedUserName.length > 16) ? 
                        <>
                            <Route index element={<SigninPage />}></Route>
                            <Route path="*" element={<Navigate to="/" replace />}></Route>
                        </>:
                        <>
                            <Route index element={<SigninPage />}></Route>
                            <Route path="/book-list" element={<BookListPage />}></Route>
                            <Route path="/specific-book" element={<SpecificBookPage />}></Route>
                            <Route path="/cart" element={<CartPage />}></Route>
                            <Route path="*" element={<NotFoundPage />}></Route>
                        </>}
                    </Route>
                }
            </Routes>
        </>
    );
}