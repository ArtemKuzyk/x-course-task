import { ReactComponent as CartSvg } from "../../../../images/cart.svg"

function EmptyCart(props) {
    let svgStyle = props.svgStyle;
    return (<div className="emptyCartContainer">
            <CartSvg style={svgStyle}/>
            <h3>Cart is empty...</h3>
        </div>)
}

export { EmptyCart }