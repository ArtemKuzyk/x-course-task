export function SelectSortField (props) {
    const element = props.data;
    return(<>
        <div    data-value={element["data-value"]}
                onClick={() => props.sortFunction(element["value"], element["data-value"])}>
            {element["data-text"]}
        </div>
    </>)
}