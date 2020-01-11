import { mount, asSvelteComponent } from "./support/svelte.js";
import StaticComponent from "../src/StaticComponent.svelte";

describe(StaticComponent.name, () => {
  asSvelteComponent();

  const element = selector => container.querySelector(selector);
  const elements = selector =>
    Array.from(container.querySelectorAll(selector));

  it("renders a button", () => {
    mount(StaticComponent);
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
