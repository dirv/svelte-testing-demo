import { get } from "svelte/store";
import { user, loadUser, login } from "../../src/stores/user.js";
import { setupGlobalJsdom } from "../support/svelte.js";

describe("user store", () => {
  beforeEach(() => setupGlobalJsdom());

  let getItemSpy, setItemSpy;

  beforeEach(() => {
    getItemSpy = jasmine
      .createSpy()
      .and.returnValue('{ "username": "dan" }');

    setItemSpy = jasmine.createSpy();

    Object.defineProperty(window, "localStorage", {
      writable: true,
      value: {
        getItem: getItemSpy,
        setItem: setItemSpy
      }
    });
  });

  describe(loadUser.name, () => {

    it("retrieves the value from localStorage", () => {
      loadUser();
      expect(window.localStorage.getItem).toHaveBeenCalledWith("user");
    });

    it("sets the user", () => {
      loadUser();
      expect(get(user)).toEqual({ "username": "dan" });
    });
  });

  describe(login.name, () => {
    it("saves the user information to localStorage", () => {
      login("dan");
      expect(setItemSpy).toHaveBeenCalledWith(
        "user",
        JSON.stringify({ username:"dan" }));
    });
  });
});
