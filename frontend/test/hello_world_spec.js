import React from "react";
import ReactDOM from "react-dom";
import expect from "expect";

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
