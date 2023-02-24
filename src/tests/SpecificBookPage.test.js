import { render, fireEvent, screen } from "@testing-library/react";
import { SpecificBookProvider } from "../hooks/use-specific-book";
import { CartProvider } from "../hooks/use-cart";
import { SpecificBook } from '../components/pages/specific-book';
// import { handleChangeCount } from "../helpers/handleChangeCount";
// test("count up 1 to 2", () => {
//     expect(handleChangeCount(true, 1)).toBe(2);
// });

// test("count down 2 to 1", () => {
//     expect(handleChangeCount(false, 2)).toBe(1);
// });

test("increment, decrement buttons and total-price field", () =>{

    const specificBook = {data:{
        "id": 1,
        "author": "David Flanagan",
        "price": 10.99,
        "image": "https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@javascript_the_definitive_guide.jpg",
        "title": "JavaScript: The Definitive Guide, 7th Edition",
        "shortDescription": "JavaScript is the programming language"
    }};
    render(
        <SpecificBookProvider value = {{specificBook}}>
            <CartProvider value={{bookCartChoice : 0}}>
                <SpecificBook />
            </CartProvider>
        </SpecificBookProvider>
    )

    const counter = screen.getByTestId("book-count");
    const incrementButton = screen.getByTestId("incrementCounter");
    const decrementButton = screen.getByTestId("decrementCounter");
    let totalPriceField;
    
    fireEvent.click(incrementButton);
    expect(counter).toHaveValue(2);

    totalPriceField = screen.getByTestId("totalPrice");
    expect(totalPriceField.innerHTML).toBe('21.98');

    fireEvent.click(decrementButton);
    expect(counter).toHaveValue(1);

    totalPriceField = screen.getByTestId("totalPrice");
    expect(totalPriceField.innerHTML).toBe('10.99');
});
