import Post from "../src/Post.svelte";
import { mount, asSvelteComponent } from "./support/svelte.js";
import
  TagList, {
  rewire as rewire$TagList,
  restore } from "../src/TagList.svelte";
import { componentDouble } from "svelte-component-double";
import { registerDoubleMatchers } from "svelte-component-double/matchers/jasmine.js";

describe(Post.name, () => {
  asSvelteComponent();
  beforeEach(registerDoubleMatchers);

  it("renders a TagList with tags prop", () => {
    rewire$TagList(componentDouble(TagList));

    mount(Post, { tags: ["a", "b", "c" ] });

    expect(TagList).toBeRenderedWithProps({ tags: [ "a", "b", "c" ] });
  });
});
