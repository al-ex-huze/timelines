import {checkItemIsUnique} from "../utils";

describe("checkItemIsUnique", () => {
    test("returns false if item already exists", () => {
        const items = [{ id: "1" }, { id: "2" }, { id: "3" }];
        const newItem = { id: "1" };
        expect(checkItemIsUnique(items, newItem)).toBe(false);
    });
    test("returns true if unique", () => {
        const items = [{ id: "1" }, { id: "2" }, { id: "3" }];
        const newItem = { id: "4" };
        expect(checkItemIsUnique(items, newItem)).toBe(true);
    });
});
