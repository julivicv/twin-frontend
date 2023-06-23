<template>
  <q-card class="product-card" flat bordered>
    <q-img class="" src="" />

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">Produto</div>
      </div>
      <q-rating v-model="stars" :max="5" size="15px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">R$ 120,00</div>
      <div class="text-caption text-green">Frete Grátis</div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="shopping_cart" />
      <q-btn flat color="primary"> Comprar </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductCard',
  props: {},
  setup() {
    return {};
  },
});
</script>

<style>
.product-card {
  width: 11%;
}
</style>
