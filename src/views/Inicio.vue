<template>
  <v-container class="px-xl-16">
    <v-sheet>
      <v-container>
        <div class="text-h6 text-md-h5">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:title="{ item }">
              {{ item.text }}
            </template>
          </v-breadcrumbs>
        </div>
        <v-row>
          <v-col cols="12">
            {{ filial.nombre }} - {{ filial.codigo }}
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { filial } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Inicio',
    to: { name: 'Inicio' },
    disabled: false,
  },
]

const getDatos = async function() {
  console.log('TODO: obtener datos para dashboard');
}

onMounted(() => {
  getDatos()
})

</script>
