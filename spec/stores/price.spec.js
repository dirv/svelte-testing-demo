import { get } from "svelte/store";
import { tick } from "svelte";
import { fetch, price, reset as resetPrice } from "../../src/stores/price.js";

const fetchOkResponse = data =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

describe(fetch.name, () => {
  beforeEach(() => {
    global.window = {};
    global.window.fetch = () => ({});
    spyOn(window, "fetch")
      .and.returnValue(fetchOkResponse({ price: 99.99 }));
    resetPrice();
  });

  it("makes a GET request to /price", () => {
    fetch();
    expect(window.fetch).toHaveBeenCalledWith("/price", { method: "GET" });
  });

  it("sets the price when API returned", async () => {
    fetch();
    await tick();
    await tick();
    expect(get(price)).toEqual(99.99);
  });
});
