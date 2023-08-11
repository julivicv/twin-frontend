<template>
  <q-page>
    <div class="contact-container">
      <div class="content-container">
        <div class="text-container">
          <p>
            Estamos comprometidos em oferecer suporte contínuo para seu negócio
            online. Nossa equipe está
            <strong
              >disponível 24h para atendê-lo. Entre em contato conosco e
              experimente um serviço de atendimento ao cliente excepcional,
              disponível a qualquer hora.
            </strong>
          </p>
        </div>
        <div class="form-content">
          <h1>CONTATE-NOS</h1>
          <q-form @submit="onSubmit">
            <div class="input-content">
              <q-input
                outlined
                v-model="name"
                label="Nome"
                lazy-rules
                type="text"
                class="form-input"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                standout
                rounded
                v-model="email"
                label="Email"
                class="form-input"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor, digite um email para realizar o login',
                  (val) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(
                      val
                    ) || 'Email inválido',
                ]"
                type="email"
              >
              </q-input>
              <q-input
                standout
                rounded
                v-model="message"
                label="Sua Mensagem"
                lazy-rules
                type="text"
                class="form-input"
              >
              </q-input>

              <q-btn
                v-if="!isLoading"
                class="submit-button tw-w-[40%] tw-rounded-[1.5rem] tw-mx-auto"
                label="ENVIAR"
                color="primary"
                type="submit"
              />

              <q-btn
                v-else
                class="submit-button tw-w-[40%] tw-rounded-[1.5rem] tw-mx-auto"
                color="primary"
              >
                <q-spinner />
              </q-btn>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export default {
  setup() {
    const $q = useQuasar();
    const isLoading = ref(false);

    const name = ref(null);
    const email = ref(null);
    const message = ref(null);

    return {
      isLoading,
      name,
      email,
      message,

      onSubmit() {
        const data = {
          name: name.value,
          email: email.value,
          message: message.value,
        };

        console.log(data);
      },
    };
  },
};
</script>
<style lang="scss">
strong {
  font-weight: bold;
}

.contact-container {
  background-color: $secondary;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  background-color: $primary;
  height: 35em;
  margin: 0 10em;
  display: flex;
  align-items: center;
}

.text-container {
  width: 40%;
  font-size: 30px;
  margin-left: 30px;
}

.form-content {
  background-color: #fff;
  height: 115%;
  width: 50%;
  margin-left: 30px;
  color: #000;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.form-content h1 {
  font-size: 5em;
  font-weight: bold;
  margin-top: 20px;
}

.input-content {
  width: 40em;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.form-input {
  border: solid 1px #121212;
  width: 80%;
  margin-top: 20px;
  background-color: #b3b1b1;
}

.submit-button {
  margin-top: 20px;
}
</style>
