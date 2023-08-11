<template>
  <q-page :key="$route.fullPath">
    <div class="tw-bg-[#121212] tw-p-0 tw-text-white tw-w-full tw-min-h-screen">
      <div
        class="header tw-flex tw-justify-between tw-bg-[#D95D39] mx-0 lg:mx-auto tw-p-5 tw-font-bold h-[10vh]"
      >
        <div class="">
<<<<<<< HEAD
          <h1
            class="tw-leading-[4rem] tw-text-8xl tw-sm:text-6xl tw-md:text-5xl tw-lg:text-2xl tw-xl:text-7xl tw-ml-2 tw-mr-6 tw-mt-10"
            id="CRewufpi"
          >
            SEU IMPÉRIO VIRTUAL COMEÇA AGORA
          </h1>
          <button class="tw-m-5 tw-text-2xl tw-bg-[#202C59] tw-p-3 tw-ml-1 tw-mt-9">
            Crie um e-comerce
          </button>
=======
          <h1 class="tw-leading-[4rem] tw-text-6xl tw-mb-5 tw-sm:text-4xl tw-md:text-5xl tw-lg:text-6xl tw-xl:text-7xl " id="CRewufpi">SEU IMPÉRIO VIRTUAL COMEÇA AGORA</h1>
          <router-link to="/createShop" class="tw-mt-10 tw-text-2xl tw-bg-[#202C59] tw-p-2 tw-ml-1">Crie um E-commerce</router-link>
>>>>>>> 24ab5bed2c08e39200b03c004de9996c6d894753
        </div>
        <div class="tw-max-w-[20%] tw-ml-6">
          <img
            class="tw-max-h-[100%] "
            src="../assets/imgIndex.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div
        class="tw-rounded tw-bg-slate-50 tw-text-[#121212] tw-flex tw-justify-around tw-p-5 tw-m-5"
      >
        <div class="tw-p-5">
          <h2 class="tw-text-2xl tw-text-[#D95D39] tw-font-bold">
            Totalmente gratuito
          </h2>
          <p class="tw-text-gray-400">
            Crie seu site no twin sem nenhum custo.
          </p>
        </div>
        <div class="tw-border-l tw-p-5">
          <h2 class="tw-text-2xl tw-text-[#D95D39] tw-font-bold">
            Completamente on-line
          </h2>
          <p class="tw-text-gray-400">
            Administre seu negócio sem sair de casa.
          </p>
        </div>
        <div class="tw-flex tw-border-l tw-p-5">
          <div class="">
            <h2 class="tw-text-2xl tw-text-[#D95D39] tw-font-bold">
              Suporte 24 horas
            </h2>
            <p class="tw-text-gray-400">
              A equipe do twin está sempre disponível para você
            </p>
          </div>
        </div>
      </div>
      <div class="tw-flex tw-m-5">
        <h3
          class="tw-text-4xl tw-w-full tw-py-5 tw-border-b tw-border-gray-500"
        >
          Produtos
        </h3>
      </div>
      <div class="tw-mx-5">
        <ProductsCards :page="page" />
      </div>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          :model-value="page"
          @update:model-value="updateModal"
          color="deep-orange"
          :max="25"
          :max-pages="6"
          boundary-links
          direction-links
        />
      </div>

      <div class="tw-flex tw-m-5">
        <h3
          class="tw-text-4xl tw-w-full tw-py-5 tw-border-b tw-border-gray-500"
        >
          CONHEÇA OUTROS E-COMMERCES CRIADOS PELO TWIN
        </h3>
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
    ShopsCards,
  },
  setup() {
    const router = useRouter();

    const route = useRoute();
    const page = ref(
      route.query.page ? parseInt(route.query.page as string) : 1
    );

    const updateModal = (val: number) => {
      console.log(val);
      router.push({ query: { page: val } });
      page.value = val;
    };
    const meta = ref({
      totalCount: 1200,
    });
    const api = process.env.API;

    const getShop = async () => {
      try {
        const response = await fetch(`${api}/shop/list/100/0`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
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
    };

    var shopsData: Ref<ShopData[]> = ref([]);
    getShop().then((data) => {
      shopsData.value = data;
    });

    return {
      meta,
      shopsData,
      page,
      updateModal,
    };
  },
});
</script>

<style>
#CRewufpi {
  font-family: 'Passion One', cursive;
}
</style>
