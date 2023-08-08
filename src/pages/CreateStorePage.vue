<template>
  <div class="q-pa-md">
    <h1 class="tw-text-2xl  tw-m-4 tw-text-center">Cadastre sua Loja</h1>
    <q-form class="tw-w-[50%] tw-m-auto tw-flex tw-flex-col tw-gap-2" :dark="true" @submit="onSubmit" color="primary"
      animated>
      <q-input outlined :dark="true" v-model="title" label="Titulo" />
      <br />
      <q-input outlined :dark="true" v-model="description" label="Breve descrição" />
      <br />
      <q-input outlined :dark="true" v-model="content" type="textarea" label="Conteudo da pagina" />
      <q-btn color="primary" label="Create" type="submit" />
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const title = ref(null);
    const description = ref(null);
    const content = ref(null);
    const $q = useQuasar();

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
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body),
          };
          const api = process.env.API;
          return fetch(`${api}/shop`, options).then((T) => T.json());
        }

        createStore(data)
          .then((response) => {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'error',
              message: "Create store success",
              position: 'top-right',
            });

            window.location.href = `#/`;
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
