<template>
  <div>
    <ProductCard />
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
      ProductCard
    };
  },
});
</script>
