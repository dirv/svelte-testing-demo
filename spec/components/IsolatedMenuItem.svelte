<script>
  import Menu from "../../src/Menu.svelte";
  import MenuItem from "../../src/MenuItem.svelte";

  export let spy = () => {};
</script>

<Menu>
  <MenuItem action={spy}>Spy</MenuItem>
</Menu>
