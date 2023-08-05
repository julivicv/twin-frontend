<template>
  <q-page>
    <div class="confirm-form-container">
      <div class="flex align-center justify-items-center tw-h-[100vh] justify-center items-center">
        <div class="tw-flex tw-flex-center tw-flex-col">
          <h1 class="register-subtitle tw-min-w-full tw-m-10 tw-text-center tw-justify-center">
            Um email foi enviado para a ativação de conta. Verifique!
          </h1>
          <router-link to="/login"
            class="redirectToLogin tw-text-2xl tw-w-min tw-px-4 tw-rounded tw-py-2 tw-mx-auto hover:tw-underline">Login</router-link>
        </div>
      </div>
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
              'https://twin-api.onrender.com/api/user',
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
                localStorage.setItem('token', response.data);
                $q.notify({
                  color: 'green-5',
                  textColor: 'white',
                  icon: 'success',
                  message: 'Usuário cadastrado com sucesso!',
                  position: 'top-right',
                });

                location.href = '/home';
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
.redirectToLogin {
  background-color: $primary;
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

.confirm-form-container {
  background-image: linear-gradient(to top right, $secondary, $primary);
  height: 100vh;
}
</style>
