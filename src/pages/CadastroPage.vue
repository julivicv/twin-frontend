<template>
  <q-page class="row items-center justify-evenly formCad">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="nomeUsuario"
        label="Nome"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite seu nome.',
        ]"
      />

      <q-input
        filled
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Por favor, digite um email para contato.',
          (val) => (val > 0 && val < 10000) || 'Email inválido',
        ]"
        type="email"
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
          (val) => (val > 0 && val < 1000) || 'Senha inválida ou insuficiente.',
        ]"
        type="password"
      />

      <q-input
        filled
        v-model="confirmSenha"
        label="Confirme a senha"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Por favor, digite a senha.',
          (val) => {
            if (val === senha) {
              return true;
            } else {
              return 'As senhas não correspondem.';
            }
          },
        ]"
        type="password"
      />

      <q-btn label="Termos e condições" />

      <q-toggle
        v-model="accept"
        label="Aceito a licença e os termos."
        color="positive"
      />

      <div>
        <q-btn label="Continuar" type="submit" class="buttonConfirm" />
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

    const nomeUsuario = ref(null);
    const senha = ref(null);
    const confirmSenha = ref(null);
    const email = ref(null);
    const accept = ref(false);

    return {
      nomeUsuario,
      confirmSenha,
      email,
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
        nomeUsuario.value = null;
        senha.value = null;
        email.value = null;
        confirmSenha.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
<style>
.formCad {
  background-image: linear-gradient(to top left, #202c59, #d95d39);
  height: calc(100vh - 50px);
}

.buttonConfirm {
  color-text: white;
}
</style>
