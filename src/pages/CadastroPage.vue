<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="login"
        label="login"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Por favor, digite um login de acesso.',
        ]"
      />

      <q-input
        filled
        v-model="senha"
        label="Senha"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Por favor, digite uma senha de acesso.',
          (val) => (val > 0 && val < 100) || 'Senha inválida ou insuficiente.',
        ]"
      />

      <q-btn label="Termos e condições" color="accent" />

      <q-toggle v-model="accept" label="Aceito a licença e os termos." />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();

    const login = ref(null);
    const senha = ref(null);
    const accept = ref(false);

    return {
      login,
      senha,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Você precisa aceitar os termos antes de continuar.',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        }
      },

      onReset() {
        login.value = null;
        senha.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
