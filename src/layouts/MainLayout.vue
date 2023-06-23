<template>
  <div id="q-app" style="min-height: 100vh">
    <q-layout view="hHh Lpr lff">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {};
  },
});
</script>

<style></style>
