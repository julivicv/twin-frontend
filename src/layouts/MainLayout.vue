<template>
  <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md">
      <q-layout view="hHh Lpr lff">
        <q-header elevated>
          <q-toolbar elevated :class="$q.dark.isActive ? 'bg-black tw-gap-4' : 'bg-primary tw-gap-4'">
            <q-btn round dense flat icon="menu" class="q-mr-xs" @click="toggleLeftDrawer()" />
            <q-avatar class="gt-xs">
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>

            <q-space />

            <q-input dark dense standout v-model="text" input-class="text-left" class="q-ml-lg q-mr-lg search">
              <template v-slot:append>
                <q-icon v-if="text === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
              </template>
            </q-input>

            <q-space />

            <router-link v-if="!isAuthenticated" to="/login" class="hover:tw-underline" >Login</router-link>
            <router-link v-if="!isAuthenticated" to="/cadastro" class="hover:tw-underline" >Cadastro</router-link>

            <span v-if="isAuthenticated">Olá {{ user.name }}</span>
            <q-avatar v-if="isAuthenticated" class="q-mr-sm ">
              <img :src="user.img">
              <q-menu fit>
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>New tab</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>New incognito tab</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>Recent tabs</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>History</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Downloads</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>Help &amp; Feedback</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-avatar>
            <q-icon name="shopping_cart" size="md" class="q-mr-lg"></q-icon>
          </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" :width="300" :breakpoint="700" elevated
          class="bg-white text-black">
          <q-scroll-area class="menu-list" style="height: calc(100% - 90px); margin-top: 90px;">
            <q-list>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
          </q-list>
          </q-scroll-area>
          <q-img class="absolute-top tw-h-[90px] tw-items-center" src="https://cdn.quasar.dev/img/material.png">
          <div @click="login()" class="absolute-bottom row tw-items-center tw-gap-2 tw-bg-black hover:tw-cursor-pointer">
            <q-avatar v-if="isAuthenticated" size="56px" class="">
              <img :src="user.img">
            </q-avatar>
            <q-icon v-else name="account_circle" size="60px"/>
            <div v-if="isAuthenticated" class="text-weight-bold">{{user.name}}</div>

            <div v-else class="text-weight-bold">Olá, logue-se</div>
          </div>
        </q-img>
        </q-drawer>

        <q-page-container>
          <router-view />
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Placeholder',
    icon: 'school',
    link: '#'
  },
  {
    title: 'Placeholder',
    icon: 'code',
    link: '#'
  },
  {
    title: 'Placeholder',
    icon: 'chat',
    link: '#'
  },
  {
    title: 'Placeholder',
    icon: 'record_voice_over',
    link: '#'
  },
  {
    title: 'Placeholder',
    icon: 'rss_feed',
    link: '#'
  },
  {
    title: 'Placeholder',
    icon: 'public',
    link: '#'
  },
  {
    title: 'Placeholder',
    icon: 'favorite',
    link: '#'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  methods: {
    toggleSettingsPopover: function () {
      this.displaySettingsMenu = !this.displaySettingsMenu
    }
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const displaySettingsMenu = ref(false)
    const user = {
      name: 'Korra',
      email: 'korra@gmail.com',
      img: 'https://i.pinimg.com/originals/c5/01/79/c50179d3ea995d618a7bd0cd0e1e1b89.jpg'
    }
    const isAuthenticated = ref(false)

    return {
      text: ref(''),
      essentialLinks: linksList,
      leftDrawerOpen,
      user,
      isAuthenticated,
      displaySettingsMenu,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      login() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        isAuthenticated.value ? this.$router.push('/login') : isAuthenticated.value = true
      },
    }
  }
});
</script>

<style>
.search {
  width: 35rem;
}
.menu-list {
  height: full;
}
</style>
