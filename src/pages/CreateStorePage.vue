<template>
  <div class="q-pa-md">
    <h1 class="tw-text-2xl tw-m-4 tw-text-center">Cadastre sua Loja</h1>
    <q-form @submit="onSubmit" color="primary" animated>
      <q-input outlined v-model="title" label="Titulo" />
      <br />
      <q-input outlined v-model="description" label="Breve descrição" />
      <br />
      <q-input outlined v-model="content" label="Conteudo da pagina" />
      <q-btn color="primary" label="Create" type="submit" />
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const title = ref(null);
    const description = ref(null);
    const content = ref(null);

    return {
      title,
      description,
      content,

      onSubmit() {
        const data = {
          title: title.value,
          description: description.value,
          content: content.value,
        };

        function createStore(body) {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body),
          };
          const api = `https://twin-api.onrender.com/api/`;
          return fetch(`${api}shop`, options).then((T) => T.json());
        }

        createStore(data)
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
