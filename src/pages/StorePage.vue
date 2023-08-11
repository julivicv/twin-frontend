<template>
  <q-page :key="$route.fullPath" class="tw-bg-[#121212] tw-text-white tw-border-white tw-p-10">
    <h1 class="tw-text-4xl tw-text-center">Loja - {{ shop.title }}</h1>
    <p class="tw-text-center tw-m-4 tw-text-1xl">{{ shop.description }}</p>
    <p class="tw-text-justify">{{ shop.content }}</p>
    <h3 class="tw-text-4xl tw-text-center">Produtos</h3>
    <div
      class="tw-grid tw-grid-flow-column xl:tw-grid-cols-5 lg:tw-grid-cols-4 md:tw-grid-cols-2 tw-row-auto tw-gap-4 tw-m-auto">
      <q-card :dark="true" @click="redirectToProductPage(p.id)" v-for="p in productref" :key="p.id"
        class="product-card tw-rounded-lg tw-transform tw-transition tw-duration-500 hover:tw-scale-[103%] hover:tw-bg-zinc-900"
        rounded>
        <q-img class="tw-w-[250px] tw-h-[250px] tw-rounded-lg" :src="'https://twin-api.onrender.com' + p.url" />

        <q-card-section class="q-py-none tw-py-[7px]">
          <div class="tw-w-0 tw-h-0">
            <q-btn round icon="shopping_cart" class="tw-translate-y-[-47px] tw-translate-x-[175px]" color="primary" />
          </div>
          <div class="row no-wrap items-center">
            <div class="col tw-text-[1.05rem] tw-font-bold tw-break-words tw-line-clamp-2">
              {{ p.name }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">R$ {{ p.price }}</div>
        </q-card-section>
        <q-separator />
      </q-card>

    </div>
    <q-btn v-if="isYourpageref" @click="redirect()" label="Adicionar produto" color="primary" class="tw-m-auto tw-mt-10" />

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'shopPage',
  methods: {
    redirectToProductPage(productId: number) {
      // Replace the following line with the actual URL of the product page and any routing logic you have
      window.location.href = `#/product/${productId}`;
    },
    redirect() {
      window.location.href = `#/createproduct/`;
    }
  },

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
        const valuesProduct = data.shop.products?.map((e: any, i: number) => {
          return {
            id: e.id,
            name: e.name,
            price: e.price,
            url: e.url,
          };
        });

        productref.value = valuesProduct

        shop.value = data.shop;

        if (data.shop.owner_id === localStorage.getItem('id')) {
          isYourpageref.value = true;
        }

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
    type productData = {
      id: number;
      name: string;
      price: string;
      url: string;
    };

    const productref = ref<productData[]>([]);
    const isYourpageref = ref<boolean>(false);
    const shop = ref<shopData>({
      id: 0,
      title: '',
      description: '',
      content: '',
    });


    (async () => {
      await getshopData();
    })();

    return {
      page,
      shop,
      productref,
      isYourpageref
    };
  },
});
</script>
