import { mount, asSvelteComponent } from "./support/svelte.js";
import { tick } from "svelte";
import {
  price,
  fetch as fetchPrice,
  rewire$fetch,
  restore
} from "../src/stores/price.js";
import CallbackComponent from "../src/CallbackComponent.svelte";

describe(CallbackComponent.name, () => {
  asSvelteComponent();

  beforeEach(() => {
    rewire$fetch(jasmine.createSpy());
  });

  afterEach(() => {
    restore();
  });

  it("displays the initial price", () => {
    price.set(99.99);
    mount(CallbackComponent);
    expect(container.textContent).toContain("The price is: $99.99");
  });

  it("updates when the price changes", async () => {
    mount(CallbackComponent);
    price.set(123.45);
    await tick();
    expect(container.textContent).toContain("The price is: $123.45");
  });

  it("fetches prices on mount", () => {
    mount(CallbackComponent);
    expect(fetchPrice).toHaveBeenCalled();
  });
});
