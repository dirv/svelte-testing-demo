<script>
  import TagList from "./TagList.svelte";
  export let tags = [];
  export let content = '';
</script>

<textarea bind:value={content} />
<TagList bind:tags={tags} />
