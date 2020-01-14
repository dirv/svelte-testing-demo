<script>
  export let tags = [];

  const { tags: inputTags, ...inputProps } = $$props;

  const tagsToArray = stringValue => (
    stringValue.split(' ').map(t => t.trim()).filter(s => s !== ""));

  let stringValue = inputTags.join(" ");

  $: tags = tagsToArray(stringValue);
</script>

<input
  type="text"
  value={stringValue}
  on:input="{({ target: { value } }) => tags = tagsToArray(value)}"
  {...inputProps} />
