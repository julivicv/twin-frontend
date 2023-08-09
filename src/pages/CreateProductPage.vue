<template>
  <div class="q-pa-md tw-bg-[#121212]">
    <h1 class="tw-text-2xl tw-text-white tw-m-3 tw-text-center">Cadastre um novo Produto</h1>
    <q-form @submit="onSubmit" color="primary" animated class="tw-grid tw-grid-cols-2 tw-w-[50%] tw-m-auto tw-gap-5">
      <q-input rounded v-model="name" label="Nome" dark class="tw-col-span-2" />
      <q-input rounded v-model="description" label="Breve descrição" dark class="tw-col-span-2" />
      <q-input dark rounded v-model="price" label="Preço do produto" type="number" class="tw-col-span-1" />
      <q-input dark rounded v-model="quantity" label="Quantidade" type="number" class="tw-col-span-1" />

      <q-select dark id="coin_type" :options="options" v-model="coin_type" label="Tipo de Moeda" class="tw-col-span-2" />

      <q-select dark id="shop" :options="shops" v-model="shop" label="Loja" class="tw-col-span-2" />

      <q-file dark bottom-slots v-model="selectedFile" label="Imagem" counter ref="fileInput" id="fileInput"
        @change="onFileSelected" class="tw-col-span-2">
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
        </template>
      </q-file>

      <q-btn rounded color="primary" label="Criar" type="submit" class="tw-col-span-2" />
    </q-form>


  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref(null);
    const description = ref(null);
    const price = ref(null);
    const quantity = ref(null);
    const coin_type = ref('real');
    const selectedFile = ref(null);
    const shop = ref(null);
    const shops = ref([]);

    const options = [
      {
        label: 'Real',
        value: 'real',
      },
      {
        label: 'Dólar',
        value: 'dolar',
      },
      {
        label: 'Pesos',
        value: 'pesos',
      },
    ];
    function onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
      }
    }

    const getShops = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const api = process.env.API;
      return fetch(`${api}/shop/saller`, options).then((T) => T.json());
    };

    getShops()
      .then((response) => {
        const data = response.data;
        shops.value = data.map((e) => ({
          label: e.title,
          value: e.id,
        }));
        return shops;
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      name,
      description,
      price,
      quantity,
      coin_type,
      shop,
      selectedFile,
      onFileSelected,
      options,
      shops,
      model: ref(null),

      onSubmit() {
        // const { label } = shop.value;
        const formData = new FormData();

        formData.append('image', selectedFile.value);
        const data = {
          name: name.value,
          description: description.value,
          price: price.value,
          quantity: quantity.value,
          coin_type: coin_type.value,
          shop: shop.value,
        };


        for (const key in data) {
          formData.append(key, data[key]);
        }

        function createProduct(body) {
          const options = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
          };
          const api = process.env.API;
          return fetch(`${api}/product`, options).then((T) => T.json());
        }
        createProduct(data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: error.message,
              position: 'top-right',
            });
          });
      },
    };
  },
};
</script>
