<template>
  <q-page class="column items-center justify-evenly">
    <div
      class="tw-flex tw-items-center tw-w-[60%] tw-justify-center form-container self-start"
    >
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md login-form"
      >
        <q-input
          filled
          v-model="login"
          label="login"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Por favor, digite um login de acesso.',
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
            (val) =>
              (val > 0 && val < 100) || 'Senha inválida ou insuficiente.',
          ]"
        />

        <q-btn
          label="Termos e condições"
          color="accent"
          @click="animateBubbles"
        />

        <q-toggle v-model="accept" label="Aceito a licença e os termos." />

        <div>
          <q-btn label="Continuar" type="submit" class="buttonConfirm" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    <div class="bubbles-container">
      <img
        ref="top"
        class="bubbles btop"
        src="../assets/bubbles_top.svg"
        alt=""
      />
      <img
        ref="right"
        class="bubbles bright"
        src="../assets/bubbles_right.svg"
        alt=""
      />
      <img
        ref="bottom"
        class="bubbles bbottom"
        src="../assets/bubbles_bottom.svg"
        alt=""
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import anime from 'animejs';

export default {
  methods: {
    animateBubbles() {
      anime({
        targets: this.$refs.top,
        translateY: 250,
      });
      anime({
        targets: this.$refs.right,
        translateX: -250,
      });
      anime({
        targets: this.$refs.bottom,
        translateY: -250,
      });
    },
  },
  mounted: function mounted() {
    this.animateBubbles();
  },
  setup() {
    const $q = useQuasar();

    const login = ref(null);
    const senha = ref(null);
    const accept = ref(false);
    const top = ref(false);
    const right = ref(false);
    const bottom = ref(false);

    return {
      login,
      senha,
      accept,
      top,
      right,
      bottom,

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

<style>
.form-container {
  background-image: linear-gradient(to bottom right, #202c59, #d95d39);
  height: calc(100vh - 50px);
}
.bubbles {
  position: absolute;
}
.btop {
  top: -280px;
  right: 15%;
}
.bright {
  right: -280px;
  top: 0;
}
.bbottom {
  bottom: -280px;
  right: 10%;
}
</style>
