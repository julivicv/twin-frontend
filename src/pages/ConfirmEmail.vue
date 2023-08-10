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

export default {
  setup() {
    const $q = useQuasar();
    const isLoading = ref(false);
    return {
      isLoading,
    };
  },
};
</script>
<style lang="scss">
.redirectToLogin {
  background-color: $primary;
}

.img-container {
  background-color: #121212;
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
