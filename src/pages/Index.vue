<template>
  <q-page :key="$route.fullPath">
    <div class="tw-bg-black tw-p-5 tw-text-white tw-w-full tw-min-h-screen">
      <div class="header tw-flex tw-m-5 tw-bg-[#D95D39] tw-p-10 tw-text-5xl tw-font-bold">
        <div class="">
          <h1>SEU IMPÉRIO VIRTUAL COMEÇA AGORA</h1>
          <button class="tw-text-2xl tw-bg-[#202C59] tw-p-5 tw-rounded">Crie um e-comerce</button>
        </div>
        <img class="tw-w-[50%]" src="../assets/desenho.svg" alt="" srcset="">
      </div>
      <div class="tw-rounded tw-bg-slate-50 tw-text-black tw-flex tw-justify-around tw-p-5 tw-m-5">
        <div class="tw-p-5">
          <h2 class="tw-text-2xl tw-text-[#D95D39] tw-font-bold">Totalmente gratuito</h2>
          <p class="tw-text-gray-400">Crie seu site no twin sem nenhum custo.</p>
        </div>
        <div class="tw-border-l tw-p-5">
          <h2 class="tw-text-2xl tw-text-[#D95D39] tw-font-bold">Completamente on-line</h2>
          <p class="tw-text-gray-400">Administre seu negócio sem sair de casa.</p>
        </div>
        <div class="tw-flex tw-border-l tw-p-5">
          <div class="">
            <h2 class="tw-text-2xl tw-text-[#D95D39] tw-font-bold">Suporte 24 horas</h2>
            <p class="tw-text-gray-400">A equipe do twin está sempre disponível para você</p>
          </div>
        </div>
      </div>
      <div class="tw-flex tw-m-5">
        <h3 class="tw-text-4xl tw-w-full tw-py-5 tw-border-b tw-border-gray-500">Produtos</h3>
      </div>
      <div class="tw-mx-5">
        <ProductsCards :page="page" />
      </div>

      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :model-value="page" @update:model-value="updateModal" color="deep-orange"
          :max="25" :max-pages="6" boundary-links direction-links />
      </div>

      <div class="tw-flex tw-m-5">
        <h3 class="tw-text-4xl tw-w-full tw-py-5 tw-border-b tw-border-gray-500">CONHEÇA OUTROS E-COMMERCES CRIADOS PELO
          TWIN</h3>
      </div>

      <div class="tw-mx-5">
        <ShopsCards :shopsData="shopsData" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import ProductsCards from '../components/ProductsCards.vue';
import ShopsCards from '../components/ShopCards.vue';
import { useRoute, useRouter } from 'vue-router';

interface ShopData {
  id: number;
  title: string;
}


interface ProductData {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default defineComponent({
  name: 'IndexPage',
  components: {
    ProductsCards,
    ShopsCards
  },
  setup() {
    const router = useRouter();

    const route = useRoute();
    const page = ref(route.query.page ? parseInt(route.query.page as string) : 1);

    const updateModal = (val: number) => {
      console.log(val);
      router.push({ query: { page: val } });
      page.value = val;
    }
    const meta = ref({
      totalCount: 1200,
    });
    const api = process.env.API;

    const getShop = async () => {
      try {
        const response = await fetch(`${api}/shop/list/100/0`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        const shops = data.data.map((shop: any) => {
          return {
            id: shop.id,
            title: shop.title,
          };
        });

        return shops as ShopData[];

      } catch (error) {
        console.error(error);
        return [];
      }
    }

    var shopsData: Ref<ShopData[]> = ref([]);
    getShop().then((data) => {
      shopsData.value = data;
    });

    return {
      meta,
      shopsData,
      page,
      updateModal

    };
  },
});
</script>
