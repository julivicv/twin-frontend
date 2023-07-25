<template>
  <div class="tw-grid tw-grid-flow-column tw-grid-cols-5 tw-row-auto tw-gap-4 tw-m-auto tw-">
    <q-card v-for="p in   productsData  " :key="p.id" class="product-card tw-rounded-lg" rounded>
      <q-img class="tw-w-[250px] tw-h-[250px] tw-rounded-lg" src="" />

      <q-card-section class="q-py-none tw-py-[7px]">
        <div class="tw-w-0 tw-h-0">
          <q-btn round icon="shopping_cart" class="tw-translate-y-[-47px] tw-translate-x-[175px]" color="primary" />
        </div>
        <div class="row no-wrap items-center">
          <div class="col tw-text-[1.05rem] tw-font-bold tw-break-words tw-line-clamp-2">
            {{ p.name }}
          </div>
        </div>
        <!-- <q-rating v-model="stars" :max="5" size="15px" /> -->
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">{{ p.price }}</div>
        <div :v-if=p.isFreeShipping class="text-caption text-green">Frete Grátis <q-icon name="local_shipping" />
        </div>


      </q-card-section>

      <q-separator />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface ProductData {
  id: number,
  name: string,
  price: string,
  isFreeShipping: boolean
}

export default defineComponent({
  name: 'ProductsCards',
  props: { productsData: { type: Array<ProductData> } },
  setup() {
    return {

    };
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
