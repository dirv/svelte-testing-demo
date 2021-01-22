import HelloComponent from "../src/HelloComponent.svelte";

describe(HelloComponent.name, () => {
  it("can be instantiated", () => {
    new HelloComponent({});
  });
});
