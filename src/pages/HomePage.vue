<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <ProductCard />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from '../components/ProductCard.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductCard,
  },
  setup() {
    return {
      ProductCard,
    };
  },
});
</script>
