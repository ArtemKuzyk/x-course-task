import { getTotalPrice } from "../helpers/getTotalPrice";

test("total price change when change count", () => {
    expect(getTotalPrice(7.89, 3)).toBe(23.67)
})