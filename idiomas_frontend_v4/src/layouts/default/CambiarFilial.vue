<template>
  <v-dialog
    v-model="abrir"
    persistent
    width="auto"
    max-width="480"
  >
    <v-card>
      <v-card-title class="bg-indigo">
        <v-row justify="space-between" aligh="center" align-content="center" dense>
          <v-col cols="11">Cambiar Filial</v-col>
          <v-col cols="1" class="text-end" v-show="filial.id !== null">
            <v-btn @click="abrir = false" density="compact" variant="plain" color="white" icon="mdi-close"></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.id"
            :value="item"
            active-color="primary"
            :disabled="item.id == filial.id"
            :style="{ paddingLeft: 0 }"
            @click="seleccionar(item)"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-menu-right" class="px-0 mx-0" size="25"></v-icon>
            </template>
            <v-list-item-title v-text="item.nombre"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions v-show="filial.id !== null">
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          variant="flat"
          @click="abrir = false"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const router = useRouter()
const axios = inject('axios')
const store = useAppStore()
const { cambiarFilial, alerta } = store
const { cargando, usuario, filial } = storeToRefs(store)

const abrir = ref(false)
const items = ref([])

const seleccionar = function(item) {
  cargando.value = true
  cambiarFilial(item)
  router.push({ name: 'Inicio', replace: false })
  abrir.value = false
  cargando.value = false
}

const abrirModal = function() {
  getDatos()
}

const getDatos = async function() {
  try {
    cargando.value = true
    const response = await axios.get('filiales', {
      params: {
        combo: true,
      },
    })
    items.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
    abrir.value = true
  }
}

defineExpose({ abrirModal })

</script>
