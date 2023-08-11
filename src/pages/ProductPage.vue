<template>
  <q-page
    :key="$route.fullPath"
    class="tw-bg-[#121212] tw-text-white tw-border-white tw-p-10"
  >
    <div class="tw-grid tw-grid-cols-2 tw-gap-10 tw-w-fit tw-m-auto tw-my-10">
      <div class="">
        <q-img
          class="tw-w-[250px] tw-h-[250px] tw-rounded-lg"
          :src="'https://twin-api.onrender.com' + product.url"
        />
      </div>

      <div class="">
        <h1 class="tw-text-3xl">{{ product.name }}</h1>
        <p class="tw-text-1xl">{{ product.description }}</p>
        <p>R${{ product.price }}</p>
        <p>Quantidade em stoque: {{ product.quantity }}</p>

        <q-btn
          v-if="!isLoading"
          label="Add to cart"
          color="primary"
          class="q-mt-md"
          @click="() => addCartProdutct(product)"
        />

        <q-btn v-else class="q-mt-md" color="primary">
          <q-spinner />
        </q-btn>
      </div>
    </div>
    <h2 class="tw-text-2xl tw-text-center tw-m-10">Comentarios</h2>
    <div class="tw-flex tw-w-fit tw-m-auto tw-gap-2 tw-my-25">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md login-form tw-flex tw-mb-10"
      >
        <q-input
          class="tw-w-fit"
          :dark="true"
          standout=""
          v-model="comment"
          label="Deixe seu comentario"
        />
        <q-btn
          v-if="!isLoadingComment"
          color="red"
          text-color="#121212"
          type="submit"
          label="Adicionar"
        />
        <q-btn
          v-else
          color="red"
          text-color="#121212"
          type="button"
          disable
        >
          <q-spinner />
        </q-btn>
      </q-form>
    </div>
    <div class="tw-grid tw-grid-cols-4 tw-gap-4 tw-p-4">
      <q-card
        v-for="p in commentref"
        :key="p.id"
        class="tw-border tw-bg-[#111] tw-p-4"
        rounded
      >
        <h4 class="tw-border-b tw-mb-2">{{ p.name }}</h4>
        <p>
          {{ p.comment }}
        </p>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ProductPage',

  setup() {
    const route = useRoute();
    const comment = ref(null);
    const page = route.params.id;
    const api = process.env.API;

    const $q = useQuasar();
    const isLoading = ref(false);
    const isLoadingComment = ref(false);

    const getProductData = async () => {
      try {
        const response = await fetch(api + `/product/${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status !== 200) {
          const data = await response.json();
          return alert(data.message);
        }

        const data = await response.json();
        const comentario = data.product.comments.map((e: any, i: number) => {
          return {
            id: i,
            comment: e.comment,
            name: e.account.name,
          };
        });
        product.value = data.product;
        commentref.value = comentario;
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    type ProductData = {
      id: number;
      name: string;
      price: string;
      description: string;
      quantity: number;
      coin_type: string;
      url: string;
    };

    const product = ref<ProductData>({
      id: 0,
      name: '',
      price: '',
      coin_type: '',
      description: '',
      quantity: 0,
      url: '',
    });

    type Comment = {
      id: number;
      comment: string;
      name: string;
    };

    const commentref = ref<Comment[]>([]);

    const addCartProdutct = (idProduct) => {
      isLoading.value = true;
      if (localStorage.getItem('cart') === null) {
        let data = idProduct;
        data.quantity = 1;
        const dataCart = [data];
        localStorage.setItem('cart', JSON.stringify(dataCart));
      } else {
        const dataCart = JSON.parse(localStorage.getItem(`cart`));
        dataCart.push(idProduct);
        localStorage.setItem('cart', JSON.stringify(dataCart));
        isLoading.value = false;
      }
    };

    (async () => {
      await getProductData();
      console.log(product.value);
    })();

    return {
      page,
      product,
      commentref,
      comment,
      addCartProdutct,
      isLoading,
      isLoadingComment,

      onSubmit() {
        isLoadingComment.value = true;
        const data = {
          content: comment.value,
        };
        console.log(data);

        function commentSubmit(body: any) {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },

            body: JSON.stringify(body),
          };
          const api = process.env.API;
          return fetch(`${api}/comment/${page}`, options).then((T) => T.json());
        }

        commentSubmit(data)
          .then((response) => {
            if (response.error) {
              throw new Error(response.message);
            }
            $q.notify({
              color: 'green-5',
              textColor: 'white',
              icon: 'success',
              message: 'Comentário adicionado com sucesso!',
              position: 'top-right',
            });
          })
          .catch((error) => {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: error.message,
              position: 'top-right',
            });
          })
          .finally(() => {
            isLoadingComment.value = false;
          });
      },
    };
  },
});
</script>
