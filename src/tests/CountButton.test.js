import { handleChangeCount } from "../helpers/handleChangeCount";

test("count up 1 to 2", () => {
    expect(handleChangeCount(true, 1)).toBe(2);
});

test("count down 2 to 1", () => {
    expect(handleChangeCount(false, 2)).toBe(1);
});