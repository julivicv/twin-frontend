<template>
  <q-page
    class="cart-page row items-center justify-evenly tw-overflow-hidden tw-text-white"
  >
    <div class="tw-h-[100%] tw-mb-20">
      <h1 class="cart-title">MEU CARRINHO</h1>
      <div>
        <q-card
          v-for="p in productsData"
          :key="p.id"
          class="tw-rounded-lg tw-bg-black tw-transform tw-transition tw-duration-500 hover:tw-scale-[103%] hover:tw-bg-zinc-900"
          rounded
        >
          <q-img
            class="tw-w-[250px] tw-h-[250px] tw-rounded-lg"
            :src="'https://twin-api.onrender.com' + p.image"
          />

          <q-card-section class="q-py-none tw-py-[7px]">
            <div class="tw-w-0 tw-h-0">
              <q-btn
                round
                class="tw-translate-y-[-47px] tw-translate-x-[175px]"
                color="primary"
                icon="delete"
                @click="deleteFromCart(p.id)"
              />
            </div>
            <div class="row no-wrap items-center">
              <div
                class="col tw-text-[1.05rem] tw-font-bold tw-break-words tw-line-clamp-2"
              >
                {{ p.name }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">R$ {{ p.price }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Quantidade:
              <q-select
                dark
                id="quantity"
                :options="options_quantity"
                v-model="quantity"
                label="Quantidade"
                class="tw-col-span-2"
                @change="(e: any) => changeQtd(p.id, e)"
              />
            </div>
          </q-card-section>
          <q-separator />
        </q-card>
      </div>
    </div>
    <div class="tw-w-[30%] tw-h-[100%]"></div>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
// import { useQuasar } from 'quasar';

interface ProductData {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

//const api = process.env.API;

export default {
  methods: {
    changeQtd(id: number, event: any) {
      const data = JSON.stringify(
        productsData.value.map((e) =>
          e.id == id ? { ...e, quantity: event.target.value } : e
        )
      );
      console.log(data);

      localStorage.setItem('cart', data);
    },
  },
  setup() {
    const productsData = ref<ProductData[]>([]);
    const quantity = ref(null);

    const options_quantity = [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
      {
        label: '4',
        value: '4',
      },
    ];

    const deleteFromCart = (id) => {
      const data = productsData.value.filter((e) => e.id != id);
      console.log(id);

      localStorage.setItem('cart', JSON.stringify(data));
      getCartProducts();
    };

    const getCartProducts = async () => {
      const productsString = localStorage.getItem('cart');
      //const productsArray = [];

      if (productsString !== null) {
        const productsId = JSON.parse(productsString).map((e) => e.id);
        const products = JSON.parse(productsString);

        if (Array.isArray(productsId)) {
          //   for (const productId of productsId) {
          //     try {
          //       const response = await fetch(api + `/product/${productId}`, {
          //         headers: {
          //           Authorization: `Bearer ${localStorage.getItem('token')}`,
          //         },
          //       });

          //       if (response.status !== 200) {
          //         const data = await response.json();
          //         alert(data.message);
          //         continue;
          //       }

          //       const data = await response.json();
          //       if (
          //         !productsArray.some(
          //           (existingProduct) => existingProduct.id === data.product.id
          //         )
          //       ) {
          //         productsArray.push(data.product);
          //       }
          //     } catch (error) {
          //       console.error('Error fetching product data:', error);
          //     }
          //   }

          return products.map((product: Array<ProductData>) => {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.url,
              quantity: product.quantity,
            };
          });
        } else {
          console.log('Os produtos não estão em um formato de array válido');
        }
      } else {
        console.log('Nenhum produto no carrinho');
      }
    };

    onMounted(async () => {
      const data = await getCartProducts();
      productsData.value = data;
    });

    return { productsData, quantity, options_quantity, deleteFromCart };
  },
};
</script>

<style lang="scss">
.cart-page {
  background-color: #121212;
}

.cart-title {
  font-family: 'Oswald', sans-serif;
  font-size: 30pt;
  text-align: center;
}
</style>
