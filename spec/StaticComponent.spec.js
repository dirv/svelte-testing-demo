import { mount, setDomDocument, unmountAll } from "./support/svelte.js";
import StaticComponent from "../src/StaticComponent.svelte";

const toMatchSelector = (util, customEqualityTesters) => ({
  compare: (container, selector) => {
    if (container.querySelector(selector) === null) {
      return {
        pass: false,
        message: `Expected container to find element matching selector ${selector} but it did not.`
      }
    } else {
      return {
        pass: true,
        message: `Expected container not to find element matching selector ${selector} but it did.`
      }
    }
  }
});

describe(StaticComponent.name, () => {
  beforeEach(() => setDomDocument());
  beforeAll(() => {
    jasmine.addMatchers({ toMatchSelector });
  });
  afterEach(unmountAll);

  const element = selector => container.querySelector(selector);
  const elements = selector =>
    Array.from(container.querySelectorAll(selector));

  it("renders a button", () => {
    mount(StaticComponent);
    expect(container.querySelector("button")).not.toBe(null);
    expect(container).toMatchSelector("button");
  });

  it("renders a default name of human if no 'who' prop passed", () => {
    mount(StaticComponent);
    expect(element("button").textContent).toEqual("Click me, human!");
  });

  it("renders the passed 'who' prop in the button caption", () => {
    mount(StaticComponent, { who: "Daniel" });
    expect(element("button").textContent).toEqual("Click me, Daniel!");
  });
});
