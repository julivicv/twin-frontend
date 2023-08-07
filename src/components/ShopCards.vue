<template>
  <div class="tw-grid tw-grid-cols-4 tw-gap-5">
    <q-card
      @click="redirectToProductPage(p.id)"
      v-for="p in shopsData"
      :key="p.id"
    >
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-52"
      >
        <div class="tw-text-black tw-flex tw-flex-col">
          <h3 class="tw-text-center tw-text-2xl tw-p-5">
            {{ p.title }}
          </h3>
          <button
            class="tw-bg-slate-950 tw-px-5 tw-w-fit tw-m-auto tw-py-2 tw-rounded-md tw-text-white"
          >
            Visit
          </button>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface ShopData {
  id: number;
  title: string;
}

export default defineComponent({
  name: 'ShopsCards',
  props: { shopsData: { type: Array<ShopData> } },
  methods: {
    redirectToProductPage(productId: number) {
      // Replace the following line with the actual URL of the product page and any routing logic you have
      window.location.href = `#/shop/${productId}`;
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.product-card {
  width: 250px;
  background-color: $dark;
  color: white;
}
</style>
