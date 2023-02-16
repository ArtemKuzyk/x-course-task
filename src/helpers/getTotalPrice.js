export const getTotalPrice = (count, price) => {
    return (Math.round(count * price * 100) / 100);
}