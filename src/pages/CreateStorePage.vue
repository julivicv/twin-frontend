<template>
  <div class="q-pa-md">
    <h1 class="tw-text-2xl tw-m-4 tw-text-center">Cadastre sua Loja</h1>
    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step :name="1" title="Configuração basica" icon="settings" :done="done1">
        <q-input outlined v-model="text" label="Titulo" />
        <br>
        <q-input outlined v-model="description" label="Breve descrição" />
        <br>
        <q-input outlined v-model="content" label="Conteudo da pagina" />


        <q-stepper-navigation>
          <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="Create an ad group" caption="Optional" icon="create_new_folder" :done="done2">
        An ad group contains one or more ads which target a shared set of keywords.

        <q-stepper-navigation>
          <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Create an ad" icon="add_comment" :done="done3">
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn color="primary" @click="done3 = true" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const step = ref(1)
    const done1 = ref(false)
    const done2 = ref(false)
    const done3 = ref(false)

    return {
      step,
      done1,
      done2,
      done3,
      description: ref(''),
      text: ref(''),

      reset() {
        done1.value = false
        done2.value = false
        done3.value = false
        step.value = 1
      }
    }
  }
}
</script>