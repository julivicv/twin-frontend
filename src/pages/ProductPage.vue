<template>
  <q-page :key="$route.fullPath">
    <h1>{{ product.name }}</h1>
    <q-img class="tw-w-[250px] tw-h-[250px] tw-rounded-lg" :src="'https://twin-api.onrender.com' + product.url" />
    <p>
      {{ product.price }}
    </p>

    <q-btn label="Add to cart" color="primary" class="q-mt-md" @click="() => alert('Not implemented')" />

    <q-btn label="Buy now" color="primary" class="q-mt-md" @click="() => alert('Not implemented')" />

    <q-btn label="Go back" color="primary" class="q-mt-md" @click="() => $router.go(-1)" />


  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ProductPage',

  setup() {
    const route = useRoute();

    const page = route.params.id
    const api = process.env.API;

    const getProductData = async () => {
      try {
        const response = await fetch(api + `/product/${page}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status !== 200) {
          const data = await response.json();
          return alert(data.message);
        }

        const data = await response.json();
        product.value = data.product;
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    type ProductData = {
      id: number;
      name: string;
      price: string;
      url: string;
    };

    const product = ref<ProductData>({
      id: 0,
      name: '',
      price: '',
      url: '',
    });

    (async () => {
      await getProductData();
      console.log(product.value);
    })();

    return {
      page,
      product,
    };
  },

});

</script>
