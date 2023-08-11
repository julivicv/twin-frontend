<template>
  <div id="q-app" style="min-height: 100vh">
    <q-layout view="hHh Lpr lff">
      <q-header elevated>
        <q-toolbar elevated class="$tw-gap-[16px]'">
          <a href="./">
            <img class="tw-w-14" src="../assets/twinny.png" />
          </a>
          <q-space />

          <q-input
            dark
            dense
            standout
            v-model="text"
            input-class="text-left"
            class="q-ml-lg q-mr-lg search"
          >
            <template v-slot:append>
              <q-form @submit="onSubmit">
                <q-icon v-if="text === ''" name="search" />
                <q-btn name="clear" class="cursor-pointer" @click="text = ''">
                </q-btn>
              </q-form>
            </template>
          </q-input>

          <q-space />

          <router-link
            v-if="!isAuthenticated"
            to="/login"
            class="hover:tw-underline"
            >Login</router-link
          >

          <router-link
            v-if="!isAuthenticated"
            to="/cadastro"
            class="hover:tw-underline tw-ml-10"
            >Cadastro</router-link
          >
          <div class="tw-flex tw-items-center tw-gap-5">
            <div v-if="isAuthenticated" class="text-weight-bold">
              Olá, {{ user.name }}
            </div>
            <div v-else class="text-weight-bold tw-ml-10">Bem-Vindo(a)</div>
            <q-avatar v-if="isAuthenticated" class="q-mr-sm">
              <img :src="user.img" />
              <q-menu fit>
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section v-on:click="perfil">Perfil</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section v-on:click="leave">Sair</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section v-on:click="loja"
                      >Suas Lojas</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-avatar>

            <router-link to="/carrinho">
              <q-icon name="shopping_cart" size="md" class="q-mr-lg"></q-icon>
            </router-link>
          </div>
        </q-toolbar>

        <div
          class="tw-flex tw-p-2 tw-bg-slate-50 tw-justify-between tw-text-[#121212]"
        >
          <nav class="tw-flex tw-gap-4">
            <router-link class="menu-text" to="/">PÁGINA INICIAL</router-link>
            <router-link class="menu-text" to="/createShop"
              >CRIAR LOJAS</router-link
            >
            <router-link class="menu-text" to="/createProduct"
              >CRIAR PRODUTOS</router-link
            >
          </nav>
          <router-link class="menu-text" to="/createShop"
            >CRIE SEU E-COMMERCE</router-link
          >
        </div>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HeaderLayout',

  components: {},

  setup() {
    const user = {
      name: localStorage.getItem('name') || 'Korra',
      email: localStorage.getItem('email') || '',
      img: 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png',
    };
    const isAuthenticated = ref(localStorage.getItem('token') !== null);
    const text = ref('');

    return {
      text,
      user,
      isAuthenticated,
      login() {
        isAuthenticated.value
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            this.$router.push('/login')
          : (isAuthenticated.value = true);
      },

      onSubmit() {
        const data = {
          text: text.value,
        };
        console.log(data);
      },
    };
  },

  methods: {
    loja() {
      this.$router.push('/shops');
    },
    leave() {
      localStorage.clear();
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
  },
});
</script>

<style>
.search {
  width: 35rem;
}

.menu-list {
  height: full;
}

.butao {
  background-color: #121212;
  color: white;
}

.menu-text {
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 12pt;
}

img {
  cursor: pointer;
}
</style>
