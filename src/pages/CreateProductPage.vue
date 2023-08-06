<template>
  <div class="q-pa-md">
    <h1 class="tw-text-2xl tw-m-4 tw-text-center">Cadastre um novo Produto</h1>
    <q-form @submit="onSubmit" color="primary" animated>
      <q-input outlined v-model="name" label="Nome" class="tw-bg-gray-500" />
      <br />
      <q-input outlined v-model="description" label="Breve descrição" class="tw-bg-gray-500" />
      <br />
      <q-input
        outlined
        v-model="price"
        label="Preço do produto"
        type="number"
        class="tw-bg-gray-500"
      />
      <br />
      <q-input outlined v-model="quantity" label="Quantidade" type="number" class="tw-bg-gray-500"/>
      <br />
      <label class="tw-bg-gray-500">Tipo de Moeda: </label>
      <select id="coin_type" v-model="coin_type" class="tw-bg-gray-500">
        <option value="real">Real</option>
        <option value="dolar">Dólar</option>
        <option value="pesos">Pesos</option>
      </select>
      <br />
      <input type="file" ref="fileInput" @change="onFileSelected" />
      <q-btn color="primary" label="Create" type="submit" />
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

    function onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
      }
    }

    return {
      name,
      description,
      price,
      quantity,
      coin_type,
      selectedFile,
      onFileSelected,

      onSubmit() {
        const formData = new FormData();
        formData.append('image', selectedFile.value);
        const data = {
          name: name.value,
          description: description.value,
          price: price.value,
          quantity: quantity.value,
          coin_type: coin_type.value,
          shop: "c895880c-508e-4df4-b20b-b625c9e55962"
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
          const api = `https://twin-api.onrender.com/api/`;
          return fetch(`${api}product`, options).then((T) => T.json());
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
