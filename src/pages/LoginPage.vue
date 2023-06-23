<template>
  <q-layout>
    <q-page class="column items-center justify-evenly">
      <img class="absolute-top-left" src="../assets/twinny_left.svg" alt="" />
      <div
        class="tw-flex tw-items-center tw-w-[60%] tw-justify-center form-container self-start"
      >
        <q-form @submit="onSubmit" class="q-gutter-md login-form tw-w-[40%]">
          <q-input
            standout
            rounded
            v-model="login"
            label="login"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, digite um login de acesso.',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            standout
            rounded
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
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <div class="flex">
            <q-btn
              class="tw-w-[40%] tw-rounded-[1.5rem] tw-mx-auto"
              label="Logar-se"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </div>
      <div class="bubbles-container">
        <div class="title-container tw-absolute z-1">
          <h1 class="title">Bem Vindo(a)!</h1>
          <span class="subtitle">Faça o login para continuar</span>
        </div>
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
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
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
              return ['100%', anime.random(104, 109) + '%'];
            },
            duration: function () {
              return anime.random(1600, 1900);
            },
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuad',
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
    $q.dark.set(true);

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
    };
  },
};
</script>

<style lang="scss">
.form-container {
  background-image: linear-gradient(to top right, $secondary, $primary);
  height: 100vh;
}
.bubbles {
  position: absolute;
}
.btop {
  top: -110px;
  left: calc(100vw - 35%);
}
.bright {
  left: calc(100vw - 110px);
  top: -70px;
}
.bbottom {
  bottom: -110px;
  left: calc(100vw - 40%);
}
.q-page {
  overflow-x: hidden;
  overflow-y: hidden;
}
.title {
  font-family: 'Passion One', cursive;
  font-weight: bold;
  font-size: 50pt;
  color: $primary;
  z-index: 1;
}
.title-container {
  top: 45vh;
  left: 71vw;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
.subtitle {
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 15pt;
  align-self: center;
  color: $secondary;
}
</style>
