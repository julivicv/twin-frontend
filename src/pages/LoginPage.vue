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
      var tl = anime.timeline({
        easing: 'easeInOutQuad',
        duration: 1100,
      });
      tl.add({ targets: this.$refs.top, translateY: 110, translateX: 15 })
        .add(
          {
            targets: this.$refs.right,
            translateX: -110,
            translateY: -70,
            easing: 'easeInOutQuad',
            duration: 1100,
          },
          '-=990'
        )
        .add(
          {
            targets: this.$refs.bottom,
            translateY: -110,
            translateX: 15,
            easing: 'easeInOutQuad',
            duration: 1100,
          },
          '-=990'
        )
        .finished.then(() =>
          anime({
            targets: '.bubbles',
            scale: function () {
              return ['100%', anime.random(101, 105) + '%'];
            },
            duration: function () {
              return anime.random(1500, 1800);
            },
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
          })
        );
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
  top: -110px;
  right: 15%;
}
.bright {
  right: -110px;
  top: -70px;
}
.bbottom {
  bottom: -110px;
  right: 10%;
}
.q-page {
  overflow: hidden;
}
</style>
