<template>
  <q-page
    :key="$route.fullPath"
    class="tw-bg-black tw-text-white tw-border-white tw-p-10"
  >
    <h1 class="tw-text-4xl tw-text-center">Loja - {{ shop.title }}</h1>
    <p class="tw-text-center tw-m-4 tw-text-1xl">{{ shop.description }}</p>
    <p class="tw-text-justify">{{ shop.content }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'shopPage',

  setup() {
    const route = useRoute();
    const page = route.params.id;
    const api = process.env.API;

    const getshopData = async () => {
      try {
        const response = await fetch(api + `/shop/${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status !== 200) {
          const data = await response.json();
          return alert(data.message);
        }

        const data = await response.json();
        shop.value = data.shop;
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };

    type shopData = {
      id: number;
      title: string;
      description: string;
      content: string;
    };

    const shop = ref<shopData>({
      id: 0,
      title: '',
      description: '',
      content: '',
    });

    (async () => {
      await getshopData();
      console.log(shop.value);
    })();

    return {
      page,
      shop,
    };
  },
});
</script>
