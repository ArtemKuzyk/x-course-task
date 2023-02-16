function CartElement(props) {
    const data = props.data;
    return(
    <>
        <tr>
            {/* <th style={{width : '5%'}}><button className="button-delete">delete</button></th> */}
            <th>{`${data.author} "${data.title}"`}</th>
            <th>{data.count}</th>
            <th>{data.price}</th>
            <th>{Math.round(data.count * data.price * 100) / 100}</th>
        </tr>
    </>);
}

export { CartElement }