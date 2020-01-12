import { tick } from "svelte";
import { mount, asSvelteComponent } from "./support/svelte.js";
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

  it("makes a GET request to /price", () => {
    mount(CallbackComponent);
    expect(window.fetch).toHaveBeenCalledWith("/price", { method: "GET" });
  });

  it("sets the price when API returned", async () => {
    mount(CallbackComponent);
    await tick();
    await tick();
    expect(container.textContent).toContain("The price is: $99.99");
  });
});
