// import Jasmine from "jasmine";
//
// var describe = Jasmine.describe;
// var it = Jasmine.it;
// var expect = Jasmine.expect;
// import React from "react";
// import ReactDOM from "react-dom";
define(["react", "react-dom"], (React, ReactDOM) => {
    describe("Hello world test", () => {
        it("Should start up test", () => {
            expect(true).toEqual(true);
        });

        it("Should handle react and es6", () => {
            var wrapper = document.createElement("div");
            wrapper.id = "test";
            document.body.appendChild(wrapper);
            ReactDOM.render(<h1 id="title">ReactTest</h1>, wrapper);
            expect(document.getElementById("title").textContent).toBe("ReactTest");
        });
    });

});
