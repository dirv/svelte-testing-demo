import { mount, asSvelteComponent } from "./support/svelte.js";
import { tick } from "svelte";
import { price } from "../src/stores/price.js";
import CallbackComponent from "../src/CallbackComponent.svelte";

const fetchOkResponse = data =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

describe(CallbackComponent.name, () => {
  asSvelteComponent();

  beforeEach(() => {
    global.window = {};
    global.window.fetch = () => ({});
    spyOn(window, "fetch")
      .and.returnValue(fetchOkResponse({ price: 99.99 }));
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
});
