<template>
  <div>
    <h1 class="tw-text-white tw-text-4xl tw-text-center tw-m-10">SUAS LOJAS</h1>

    <div class="tw-grid tw-grid-cols-3 tw-m-10">
      <q-card
        :dark="true"
        v-for="s in shops"
        :key="s.id"
        class="q-mb-md"
        style="max-width: 400px"
      >
        <q-card-section>
          <q-item-label
            class="tw-text-2xl tw-text-center tw-text-white"
            header
            >{{ s.title }}</q-item-label
          >
          <q-item-label class="tw-text-gray-400" caption>{{
            s.description
          }}</q-item-label>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn color="primary" label="Ver" @click="handlePage(s.id)" />
        </q-card-actions>
      </q-card>

      <q-btn
        color="primary"
        label="Criar nova loja"
        @click="handleCreatePage()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'shopPage',
  methods: {
    handlePage(id: number) {
      window.location.href = `#/shop/${id}`;
    },
    handleCreatePage() {
      window.location.href = `#/createShop`;
    },
  },

  setup() {
    const getShops = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const api = process.env.API;
      return fetch(`${api}/shop/saller`, options).then((T) => T.json());
    };

    type IShop = {
      id: number;
      title: string;
      description: string;
    };

    const shops = ref<IShop[]>([]);

    getShops().then((response) => {
      const data = response.data;
      shops.value = data.map((e: any) => ({
        id: e.id,
        title: e.title,
        description: e.description,
      }));
    });

    return {
      shops,
    };
  },
});
</script>
