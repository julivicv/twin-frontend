<template>
  <q-page
    class="cart-page row items-center justify-evenly tw-overflow-hidden tw-text-white"
  >
    <div class="tw-w-[70%] tw-h-[100%]">
      <h1 class="cart-title">MEU CARRINHO</h1>
    </div>
    <div class="tw-w-[30%] tw-h-[100%]"></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CartPage',
});
</script>

<style lang="scss">
.cart-page {
  background-color: black;
}
.cart-title {
  font-family: 'Oswald', sans-serif;
}
</style>
