import { tick } from "svelte";
import { mount, asSvelteComponent } from "./support/svelte.js";
import Menu from "../src/Menu.svelte";
import IsolatedMenuItem from "./components/IsolatedMenuItem.svelte";

const menuIcon = () => container.querySelector(".icon");
const menuBox = () => container.querySelector("div[class*=overlay]");

const click = async formElement => {
  const evt = document.createEvent("MouseEvents");
  evt.initEvent("click", true, true);
  formElement.dispatchEvent(evt);
  await tick();
  return evt;
};

describe(Menu.name, () => {
  asSvelteComponent();

  it("closes the menu when a menu item is selected", async () => {
    mount(IsolatedMenuItem);
    await click(menuIcon());
    await click(menuBox().querySelector("button"));
    expect(menuBox()).toBe(null);
  });

  it("performs action when menu item chosen", async () => {
    const action = jasmine.createSpy();
    mount(IsolatedMenuItem, { spy: action });
    await click(menuIcon());
    await click(menuBox().querySelector("button"));
    expect(action).toHaveBeenCalled();
  });
});
