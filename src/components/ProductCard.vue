<template>
<<<<<<< Updated upstream
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
=======
  <q-card class="my-card" flat bordered>
    <q-img class="tw-max" src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

    <q-card-section>
      <q-btn
        fab
        color="primary"
        icon="place"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">Cafe Basilico</div>
        <div
          class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
        >
          <q-icon name="place" />
          250 ft
        </div>
      </div>

      <q-rating v-model="stars" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">$・Italian, Cafe</div>
      <div class="text-caption text-grey">
        Small plates, salads & sandwiches in an intimate setting.
      </div>
>>>>>>> Stashed changes
    </q-card-section>

    <q-separator />

    <q-card-actions>
<<<<<<< Updated upstream
      <q-btn flat round icon="shopping_cart" />
      <q-btn flat color="primary"> Comprar </q-btn>
=======
      <q-btn flat round icon="event" />
      <q-btn flat color="primary"> Reserve </q-btn>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

<style>
.product-card {
  width: 11%;
}
</style>
=======
>>>>>>> Stashed changes
