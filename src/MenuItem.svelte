<script>
  import { getContext, tick } from "svelte";
  import { key } from "./Menu.svelte";

  export let action;

  const { toggleMenu } = getContext(key);

  const closeMenuAndAct = async (event) => {
    event.stopPropagation();
    toggleMenu();
    await tick();
    action();
  };
</script>

<button on:click="{closeMenuAndAct}">
  <slot />
</button>
