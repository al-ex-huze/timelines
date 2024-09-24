const {
    checkIfEventIsInLayout,
    filterEventFromLayout,
} = require("../utils.js");

describe("checkIfEventIsInLayout", () => {
    test("takes an array and an object and returns a bool, false as default", () => {
        const layoutInput = [];
        const newEventInput = {
            id: "59",
            title: "ergergerg",
            body: "ergergreg",
            image_url_1:
                "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
        };
        const actual = checkIfEventIsInLayout(layoutInput, newEventInput);

        expect(actual).toBe(false);
    });
    test("doesnt mutate array", () => {
        const layoutInput = [
            
                {
                    "i": "Timeline",
                    "x": 0,
                    "y": 0,
                    "w": 8,
                    "h": 1
                },
                {
                    "i": "Event Card - 2",
                    "data": "{\"id\":\"59\",\"title\":\"ergergerg\",\"body\":\"ergergreg\",\"image_url_1\":\"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700\"}",
                    "x": null,
                    "y": 1,
                    "w": 2,
                    "h": 2
                }
            
        ];
        const newEventInput = {
            id: "59",
            title: "ergergerg",
            body: "ergergreg",
            image_url_1:
                "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
        };
        const actual = checkIfEventIsInLayout(layoutInput, newEventInput);
        expect(layoutInput).toEqual([
            
                {
                    "i": "Timeline",
                    "x": 0,
                    "y": 0,
                    "w": 8,
                    "h": 1
                },
                {
                    "i": "Event Card - 2",
                    "data": "{\"id\":\"59\",\"title\":\"ergergerg\",\"body\":\"ergergreg\",\"image_url_1\":\"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700\"}",
                    "x": null,
                    "y": 1,
                    "w": 2,
                    "h": 2
                }
            
        ]);
    });
    test("returns true if event exists", () => {
        const layoutInput = [
            
                {
                    i: "Timeline",
                    x: 0,
                    y: 0,
                    w: 8,
                    h: 1,
                },
                {
                    i: "Event Card - 2",
                    data: '{"id":"59","title":"ergergerg","body":"ergergreg","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                    x: null,
                    y: 1,
                    w: 2,
                    h: 2,
                },
            
        ];
        const newEventInput = {
            id: "59",
            title: "ergergerg",
            body: "ergergreg",
            image_url_1:
                "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
        };
        const actual = checkIfEventIsInLayout(layoutInput, newEventInput);

        expect(actual).toBe(true);
    });
    test("returns false if event doesnt exist", () => {
        const layoutInput = [
            
                {
                    i: "Timeline",
                    x: 0,
                    y: 0,
                    w: 8,
                    h: 1,
                },
            
        ];
        const newEventInput = {
            id: "59",
            title: "ergergerg",
            body: "ergergreg",
            image_url_1:
                "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
        };
        const actual = checkIfEventIsInLayout(layoutInput, newEventInput);
        expect(actual).toBe(false);
    });
});

describe("filterEventFromLayout", () => {
    test("takes an array and string and returns an array", () => {
        const layoutInput = [];
        const idInput = "49";
        const actual = filterEventFromLayout(layoutInput, idInput);

        expect(actual).toEqual([]);
    });
    test("doesnt mutate array", () => {
        const layoutInput = [
            { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
            { i: "Add Event", x: 0, y: null, w: 8, h: 1 },
            {
                i: "Event Card - 3",
                data: '{"id":"49","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
        ];
        const idInput = "49";
        const actual = filterEventFromLayout(layoutInput, idInput);
        expect(layoutInput).toEqual([
            { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
            { i: "Add Event", x: 0, y: null, w: 8, h: 1 },
            {
                i: "Event Card - 3",
                data: '{"id":"49","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
        ]);
    });
    test("returns new array", () => {
        const layoutInput = [
            { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
            { i: "Add Event", x: 0, y: null, w: 8, h: 1 },
            {
                i: "Event Card - 3",
                data: '{"id":"49","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
        ];
        const idInput = "49";
        const actual = filterEventFromLayout(layoutInput, idInput);

        expect(actual).not.toBe(layoutInput);
    });
    test("returns new layout array", () => {
        const layoutInput = [
            { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
            { i: "Add Event", x: 0, y: null, w: 8, h: 1 },
            {
                i: "Event Card - 3",
                data: '{"id":"49","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
        ];
        const idInput = "49";
        const expected = [
            { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
            { i: "Add Event", x: 0, y: null, w: 8, h: 1 },
        ];
        const actual = filterEventFromLayout(layoutInput, idInput);

        expect(actual).toEqual(expected);
    });
    test("returns new layout array with additional events", () => {
        const layoutInput = [
            { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
            { i: "Add Event", x: 0, y: null, w: 8, h: 1 },
            {
                i: "Event Card - 3",
                data: '{"id":"49","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
            {
                i: "Event Card - 4",
                data: '{"id":"50","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
            {
                i: "Event Card - 5",
                data: '{"id":"52","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
        ];
        const idInput = "49";
        const expected = [
            { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
            { i: "Add Event", x: 0, y: null, w: 8, h: 1 },
            {
                i: "Event Card - 4",
                data: '{"id":"50","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
            {
                i: "Event Card - 5",
                data: '{"id":"52","title":"regergre","body":"ergergre","image_url_1":"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"}',
                x: null,
                y: 1,
                w: 2,
                h: 2,
            },
        ];
        const actual = filterEventFromLayout(layoutInput, idInput);

        expect(actual).toEqual(expected);
    });
});
