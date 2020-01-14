<script>
  import TagList from "./TagList.svelte";
  import { savePost } from "./api.js";

  export let tags = [];
  export let content = '';

  $: savePost({ tags, content });
</script>

<textarea bind:value={content} />
<TagList bind:tags={tags} />
