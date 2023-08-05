<template>
  <div
    class="tw-grid tw-grid-flow-column xl:tw-grid-cols-5 lg:tw-grid-cols-4 md:tw-grid-cols-2 tw-row-auto tw-gap-4 tw-m-auto">
    <q-card v-for="p in productsData" :key="p.id"
      class="product-card tw-rounded-lg tw-transform tw-transition tw-duration-500 hover:tw-scale-[103%] hover:tw-bg-zinc-900"
      rounded>
      <q-img class="tw-w-[250px] tw-h-[250px] tw-rounded-lg" :src="'http://localhost:8080' + p.image" />

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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface ProductData {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default defineComponent({
  name: 'ProductsCards',
  props: {
    page: { type: Number }
  },
  setup(props) {
    const api = `http://localhost:8080/api`;
    let productsData: any = []
    const getProduct = async (): Promise<ProductData[]> => {
      try {
        const response = await fetch(`${api}/product/list/15/${props.page ? ((props.page - 1) * 15) : ''}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        const productData = data.product.map((product: any) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.url,
          };
        });
        console.log(productData)
        return productsData = productData;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    return { productsData };
  },
});
</script>

<style lang="scss">
.product-card {
  width: 250px;
  background-color: $dark;
  color: white;
}
</style>
