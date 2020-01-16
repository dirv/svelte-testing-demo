<script context="module">
  export const key = {};
</script>

<script>
  import { setContext } from 'svelte';

  let open = false;

  const toggleMenu = () => open = !open;

  setContext(key, {
    toggleMenu
  });
</script>

<button on:click={toggleMenu} class="icon">Menu</button>
{#if open}
<div class="overlay" on:click={toggleMenu}>
  <slot />
</div>
{/if}
