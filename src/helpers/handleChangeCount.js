export const handleChangeCount = (bool, count) => {
    console.log(typeof count)
    if(bool){ 
        return (typeof count === "object" ? 1 : count + 1)
    }else{
        return (typeof count === "object" ? 0 : count - 1)
    }
}