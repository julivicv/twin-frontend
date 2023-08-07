<template>
  <div class="q-pa-md tw-bg-black">
    <h1 class="tw-text-2xl tw-m-4 tw-text-center">Cadastre um novo Produto</h1>
    <q-form
      @submit="onSubmit"
      color="primary"
      animated
      class="tw-flex tw-flex-col tw-gap-3"
    >
      <q-input standout rounded v-model="name" label="Nome" dark />
      <q-input
        standout
        rounded
        v-model="description"
        label="Breve descrição"
        dark
      />
      <q-input
        standout
        dark
        rounded
        v-model="price"
        label="Preço do produto"
        type="number"
      />
      <q-input
        standout
        dark
        rounded
        v-model="quantity"
        label="Quantidade"
        type="number"
      />

      <q-select
        rounded
        standout
        dark
        id="coin_type"
        :options="options"
        v-model="coin_type"
        label="Tipo de Moeda"
      >
      </q-select>

      <q-select
        rounded
        dark
        standout
        id="shop"
        :options="shops"
        v-model="shop"
        label="Loja"
      >
      </q-select>

      <q-file
        rounded
        dark
        standout
        bottom-slots
        v-model="selectedFile"
        label="Image"
        counter
        ref="selectedFile"
        @change="onFileSelected"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop.prevent="model = null"
            class="cursor-pointer"
          />
        </template>
      </q-file>
      <q-btn rounded color="primary" label="Create" type="submit" />
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
    const coin_type = ref('real'); // Define o valor padrão para 'Real'
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
      console.log(file, 'file');
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
          value: e.title,
        }));
        console.log(shops);
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
        console.log('Selected File:', selectedFile.value);
        console.log('Data:', data);

        const { label } = shop.value;
        const formData = new FormData();

        formData.append('image', selectedFile.value);
        const data = {
          name: name.value,
          description: description.value,
          price: price.value,
          quantity: quantity.value,
          coin_type: coin_type.value,
          shop: label,
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
