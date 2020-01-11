import { JSDOM } from "jsdom";
import { bind, binding_callbacks } from "svelte/internal";

let mountedComponents;

const setupGlobalJsdom = (url = "https://localhost") => {
  const dom = new JSDOM("", { url, pretendToBeVisual: true });
  global.document = dom.window.document;
  global.window = { ...global.window, ...dom.window };
  global.navigator = dom.window.navigator;
};

const createContainer = () => {
  global.container = document.createElement("div");
  document.body.appendChild(container);
};

export const setDomDocument = url => {
  setupGlobalJsdom(url);
  createContainer();
  mountedComponents = [];
};

const setBindingCallbacks = (bindings, component) =>
  Object.keys(bindings).forEach(binding => {
    binding_callbacks.push(() => {
      bind(mounted, binding, value => {
        bindings[binding] = value
      });
    });
  });

export const mount = (component, props = {}, { bindings = {} } = {}) => {
  const mounted = new component({
    target: global.container,
    props
  });
  setBindingCallbacks(bindings, mounted);
  mountedComponents = [ mounted, ...mountedComponents ];
  return mounted;
};

export const unmountAll = () => {
  mountedComponents.forEach(component => {
    component.$destroy()
  });
  mountedComponents = [];
};

const toMatchSelector = (util, customEqualityTesters) => ({
  compare: (container, selector) => {
    if (container.querySelector(selector) === null) {
      return {
        pass: false,
        message: `Expected container to match CSS selector "${selector}" but it did not.`
      }
    } else {
      return {
        pass: true,
        message: `Expected container not to match CSS selector "${selector}" but it did.`
      }
    }
  }
});

export const asSvelteComponent = () => {
  beforeEach(() => setDomDocument());
  beforeAll(() => {
    jasmine.addMatchers({ toMatchSelector });
  });
  afterEach(unmountAll);
};

