<script>
  import { onMount } from "svelte";

  let price = '';

  onMount(async () => {
    const response = await window.fetch("/price", { method: "GET" });
    if (response.ok) {
      const data = await response.json();
      price = data.price;
    }
  });

</script>

<p>The price is: ${price}</p>
