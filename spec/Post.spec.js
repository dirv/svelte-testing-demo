import Post from "../src/Post.svelte";
import { mount, asSvelteComponent } from "./support/svelte.js";
import
  TagList, {
  rewire as rewire$TagList,
  restore as restore$TagList } from "../src/TagList.svelte";
import {
  savePost,
  rewire$savePost,
  restore as restore$api } from "../src/api.js";
import { componentDouble } from "svelte-component-double";
import { registerDoubleMatchers } from "svelte-component-double/matchers/jasmine.js";
import { tick } from "svelte";

describe(Post.name, () => {
  asSvelteComponent();
  beforeEach(registerDoubleMatchers);

  beforeEach(() => {
    rewire$TagList(componentDouble(TagList));
    rewire$savePost(jasmine.createSpy());
  });

  afterEach(() => {
    restore$TagList();
    restore$api();
  });

  it("renders a TagList with tags prop", () => {
    mount(Post, { tags: ["a", "b", "c" ] });

    expect(TagList).toBeRenderedWithProps({ tags: [ "a", "b", "c" ] });
  });

  it("saves post when TagList updates tags", async () => {
    const component = mount(Post, { tags: [] });

    TagList.firstInstance().updateBoundValue(
      component, "tags", ["a", "b", "c" ]);
    await tick();
    expect(savePost).toHaveBeenCalledWith({ tags: ["a", "b", "c"], content: "" });
  });
});
