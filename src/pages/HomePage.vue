<template>
  <HeaderTwin />
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <ProductsCards :productsData="productsData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductsCards from '../components/ProductsCards.vue';
import HeaderTwin from 'src/components/HeaderTwin.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductsCards,
    HeaderTwin
  },
  setup() {
    return {
      ProductsCards,
      productsData: [
        {
          id: 1,
          name: 'Produto 1',
          price: 'R$ 120,00',
          isFreeShipping: true
        },
        {
          id: 2,
          name: 'Produto 2',
          price: 'R$ 3550,00',
          isFreeShipping: false
        },
        {
          id: 3,
          name: 'Produto 3',
          price: 'R$ 745,00',
          isFreeShipping: true
        },
        {
          id: 4,
          name: 'Produto 4',
          price: 'R$ 12,00',
          isFreeShipping: false
        },
        {
          id: 5,
          name: 'Produto 5',
          price: 'R$ 23,00',
          isFreeShipping: true
        },
        {
          id: 6,
          name: 'Produto 1',
          price: 'R$ 120,00',
          isFreeShipping: true
        },
        {
          id: 7,
          name: 'Produto 2',
          price: 'R$ 3550,00',
          isFreeShipping: false
        },
        {
          id: 8,
          name: 'Produto 3',
          price: 'R$ 745,00',
          isFreeShipping: true
        },
        {
          id: 9,
          name: 'Produto 4',
          price: 'R$ 12,00',
          isFreeShipping: true
        },
        {
          id: 0,
          name: 'Produto 5',
          price: 'R$ 23,00',
          isFreeShipping: true
        },
      ]
    };
  },
});
</script>
