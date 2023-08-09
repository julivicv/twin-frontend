<template>
  <div class="q-pa-md">
    <h1 class="tw-text-2xl tw-text-white tw-m-3 tw-text-center">Cadastre sua Loja</h1>
    <q-form class="tw-grid tw-grid-cols-2 tw-w-[50%] tw-m-auto tw-gap-5 tw-my-10" :dark="true" @submit="onSubmit"
      color="primary" animated>
      <q-input rounded :dark="true" v-model="title" label="Titulo" class="tw-col-span-1" />
      <q-input rounded :dark="true" v-model="description" label="Breve descrição" class="tw-col-span-1" />
      <q-input rounded :dark="true" v-model="content" type="textarea" class="tw-col-span-2" label="Conteudo da pagina" />
      <q-btn color="primary" class="tw-col-span-2" label="Create" type="submit" />
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
