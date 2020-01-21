import { writable } from "svelte/store";

const notLoaded = {};
const loggedOut = { "username": null };

const localStorageKey = "user";

export let user = writable(notLoaded);

export const loadUser = () => {
  const value = window.localStorage.getItem(localStorageKey);
  if (value !== null ) {
    user.set(JSON.parse(value));
  } else {
    user.set(loggedOut);
  }
};

export const login = username => {
  // do something to login here
  // ...
  user.set({ username });
  // if log in wasn't successful then you would want to do
  // user.set(loggedOut);
};

user.subscribe(newValue => {
  // have to check for notLoaded here as subscribe is always called once,
  // as soon as it is defined,
  // and this would overwrite localStorage before we had a chance to read it
  if (global.window && newValue !== notLoaded) {
    const json = JSON.stringify(newValue);
    window.localStorage.setItem(localStorageKey, json);
  }
});
