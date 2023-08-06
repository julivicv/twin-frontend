<template>
  <q-page class="row items-center justify-evenly tw-overflow-hidden">
    <div class="img-container tw-w-[50%] tw-min-h-[100vh]">
      <div class="title-container tw-flex tw-flex-col tw-items-center">
        <h1 class="register-title">TWIN</h1>
        <span class="register-subtitle">Transforme seu sonho em realidade:
          <strong> crie seu e-commerce em segundos!</strong></span>
      </div>
      <div class="tw-bg-white tw-w-[50%] tw-h-[193px] absolute tw-bottom-[-100px]" ref="bgBubbles"></div>
      <img class="absolute tw-bottom-[-150px] tw-w-[50%] bubbles" ref="bubbles1" src="../assets/bubbles_bg1.svg" alt="" />
      <img class="absolute tw-bottom-[-150px] tw-w-[50%] bubbles" ref="bubbles2" src="../assets/bubbles_bg2.svg" alt="" />
      <div
        class="bubble1 bubble tw-rounded-full tw-bg-white tw-absolute tw-bottom-[40px] tw-left-[35vw] tw-h-[69px] tw-w-[69px]">
      </div>
      <div
        class="bubble2 bubble tw-rounded-full tw-bg-white tw-absolute tw-bottom-[140px] tw-left-[40vw] tw-h-[51px] tw-w-[51px]">
      </div>
      <div
        class="bubble3 bubble tw-rounded-full tw-bg-white tw-absolute tw-bottom-[140px] tw-left-[3vw] tw-h-[30px] tw-w-[30px]">
      </div>
      <div
        class="bubble4 bubble tw-rounded-full tw-bg-white tw-absolute tw-bottom-[140px] tw-left-[9vw] tw-h-[51px] tw-w-[51px]">
      </div>

      <img ref="twinny" class="twinny" src="../assets/twinny.png" alt="" />
    </div>
    <div
      class="tw-flex tw-flex-col tw-items-center tw-w-[50%] tw-justify-center form-container tw-z-0 register-form-container self-start">
      <span class="register-form-title">CADASTRE-SE</span>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input standout rounded v-model="nomeUsuario" label="Nome" lazy-rules :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite seu nome.',
        ]">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input standout rounded v-model="email" label="Email" lazy-rules :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Por favor, digite um email para contato.',
          (val) =>
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(
              val
            ) || 'Email inválido',
        ]" type="email">
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input standout rounded v-model="senha" label="Senha" lazy-rules :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Por favor, digite uma senha de acesso.',
          (val) =>
            (val.toString().length >= 6 && val.toString().length <= 120) ||
            'Senha inválida ou insuficiente.',
          (val) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(val) ||
            'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e pelo menos um número.',
        ]" :type="passwordType">
          <template v-slot:prepend>
            <q-icon v-if="passwordType === 'password'" class="cursor-pointer" @click="togglePassword" name="lock" />
            <q-icon v-if="passwordType === 'text'" class="cursor-pointer" @click="togglePassword" name="lock_open" />
          </template>
        </q-input>

        <div>
          <q-btn label="Termos e condições" class="tw-rounded-[1.5rem] tw-mx-auto" color="secondary" />

          <q-checkbox v-model="accept" label="Concordo que li e aceito os termos e condições" color="primary"
            keep-color />
        </div>

        <div>
          <q-btn v-if="!isLoading" label="Continuar" type="submit"
            class="submit-button tw-w-[40%] tw-rounded-[1.5rem] tw-mx-auto" color="primary" />

          <q-btn v-else class="submit-button tw-w-[40%] tw-rounded-[1.5rem] tw-mx-auto" color="primary">
            <q-spinner />
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import anime from 'animejs';

export default {
  methods: {
    moveTwinny() {
      anime({
        targets: this.twinny,
        duration: 900,
        direction: 'alternate',
        easing: 'easeInOutSine',
        translateX: function () {
          return [anime.random(-30, 30) + 'px'];
        },
        translateY: function () {
          return [anime.random(-30, 30) + 'px'];
        },
        complete: this.moveTwinny,
      });
    },
    animateOnPageLoad() {
      var tl = anime.timeline({
        easing: 'easeInOutSine',
        duration: 1100,
      });
      tl.add({ targets: this.bubbles1, translateY: -50 })
        .add(
          {
            targets: this.bubbles2,
            translateY: -50,
          },
          100
        )
        .add(
          {
            targets: this.bgBubbles,
            translateY: -50,
          },
          100
        )
        .finished.then(() =>
          anime({
            targets: '.bubbles',
            scale: function () {
              return ['100%', anime.random(101, 103) + '%'];
            },
            duration: function () {
              return anime.random(1600, 1900);
            },
            direction: 'alternate',
            loop: true,
            easing: 'linear',
          })
        );
      var risingBubbles = anime.timeline({
        targets: '.bubble',
        duration: 1900,
        loop: true,
        easing: 'easeInOutQuad',
      });
      risingBubbles
        .add(
          {
            targets: '.bubble1',
            translateY: -800,
            opacity: 0,
          },
          '-=300'
        )
        .add(
          {
            targets: '.bubble2',
            translateY: -700,
            opacity: 0,
          },
          '-=300'
        )
        .add(
          {
            targets: '.bubble4',
            translateY: -700,
            opacity: 0,
          },
          '-=300'
        )
        .add(
          {
            targets: '.bubble3',
            translateY: -700,
            opacity: 0,
          },
          '-=600'
        );
      anime({
        targets: this.twinny,
        easing: 'easeInOutQuad',
        duration: 900,
        opacity: 1,
      }).finished.then(() => this.moveTwinny());
    },
  },
  mounted: function mounted() {
    this.animateOnPageLoad();
  },
  setup() {
    const $q = useQuasar();
    const isLoading = ref(false);

    const api = `https://twin-api.onrender.com/api`
    const nomeUsuario = ref(null);
    const senha = ref(null);
    const confirmSenha = ref(null);
    const email = ref(null);
    const accept = ref(false);
    const bgBubbles = ref(false);
    const bubbles1 = ref(false);
    const bubbles2 = ref(false);
    const twinny = ref(false);
    var passwordType = ref('password');
    $q.dark.set(true);

    const togglePassword = () => (
      (passwordType.value =
        passwordType.value == 'password' ? 'text' : 'password'),
      console.log(passwordType.value)
    );

    return {
      isLoading,
      nomeUsuario,
      confirmSenha,
      email,
      senha,
      accept,
      bgBubbles,
      bubbles1,
      bubbles2,
      twinny,
      passwordType,
      togglePassword,

      onSubmit() {
        if (accept.value === false) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Você precisa aceitar os termos antes de continuar.',
            position: 'top-right',
          });
        } else {
          isLoading.value = true;
          const data = {
            name: nomeUsuario.value,
            email: email.value,
            password: senha.value,
          };

          function cadastraUsuario(body: any) {
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            };

            return fetch(
              `${api}/user`,
              options
            ).then((T) => T.json());
          }

          cadastraUsuario(data)
            .then((response) => {
              if (response.message == 'Account already exists') {
                $q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'error',
                  message: 'Account already exists',
                  position: 'top-right',
                });
              }

              if (response.message == 'success') {
                // localStorage.setItem('token', response.data);
                $q.notify({
                  color: 'green-5',
                  textColor: 'white',
                  icon: 'success',
                  message: 'Usuário cadastrado com sucesso!',
                  position: 'top-right',
                });

                location.href = '#/ConfirmEmail';
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              isLoading.value = false;
            });
        }
      },

      onReset() {
        nomeUsuario.value = null;
        senha.value = null;
        email.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
<style lang="scss">
.register-form-container {
  background-image: linear-gradient(28deg, black 60%, $primary);
  height: 100vh;
}

.img-container {
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.twinny {
  opacity: 0;
  z-index: 0;
  position: absolute;
  bottom: calc(35vh - 250px);
  left: calc(30vw - 300px);
}

.register-title {
  font-family: 'Kodchasan', sans-serif;
  font-size: 128pt;
  justify-self: center;
  margin-top: 45px;
  margin-bottom: 25px;
}

.register-subtitle {
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 35pt;
  max-width: max(75%, 300px);
  text-align: justify;
}

.register-form-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 40pt;
  margin-bottom: 20px;
}

strong {
  font-weight: bold;
}
</style>
