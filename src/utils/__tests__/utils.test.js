const { formatEventItem } = require("../utils.js");

describe("formatEventItem", () => {
    test("takes a string and returns and object", () => {
        const input =
            "EventCard 1 {id:2,title:Fundamentals,body:We learnt to type and to code and to program,image_url_1:https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg}";
        const actual = formatEventItem(input);
        expect(typeof actual).toBe("string");
    });
    test("returns event data as parsed JSON", () => {
        const input =
            "EventCard 1 {id:2,title:Fundamentals,body:We learnt to type and to code and to program,image_url_1:https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg}";
        const expected =
            "{id:2,title:Fundamentals,body:We learnt to type and to code and to program,image_url_1:https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg}";
        const actual = formatEventItem(input);
        expect(actual).toBe(expected);
    });
});
