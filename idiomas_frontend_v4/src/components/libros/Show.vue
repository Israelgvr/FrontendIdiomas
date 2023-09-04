<template>
  <v-dialog
    v-model="abrir"
    persistent
    width="auto"
    min-width="360"
    max-width="480"
  >
    <v-card>
      <v-card-title class="bg-indigo">
        <v-row justify="space-between" aligh="center" align-content="center" dense>
          <v-col cols="11">Detalle del Libro</v-col>
          <v-col cols="1" class="text-end">
            <v-btn @click="abrir = false" density="compact" variant="plain" color="white" icon="mdi-close"></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-table density="compact">
          <colgroup>
            <col width="25%">
            <col width="75%">
          </colgroup>
          <tbody>
            <tr>
              <th class="text-right pr-2">Idioma:</th>
              <td class="font-weight-bold">{{ registro.idioma.nombre }}</td>
            </tr>
            <tr>
              <th class="text-right pr-2">Código:</th>
              <td class="font-weight-bold">{{ registro.codigo }}</td>
            </tr>
            <tr>
              <th class="text-right pr-2">Nombre:</th>
              <td class="font-weight-bold">{{ registro.nombre }}</td>
            </tr>
            <tr>
              <th class="text-right pr-2">Editorial:</th>
              <td class="font-weight-bold">{{ registro.editorial || '-' }}</td>
            </tr>
            <tr>
              <th class="text-right pr-2">Edición:</th>
              <td class="font-weight-bold">{{ registro.edicion || '-' }}</td>
            </tr>
            <tr>
              <th class="text-right pr-2">Imagen:</th>
              <td class="font-weight-bold">
                <v-img
                  v-if="registro.imagen"
                  class="mx-auto"
                  width="150px"
                  max-width="150px"
                  height="200px"
                  max-height="200px"
                  cover
                  :src="`${url}/uploads/libros/${registro.imagen}`"
                ></v-img>
                <div v-else>-</div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
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
import { ref, inject } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const store = useAppStore()
const { cargando } = storeToRefs(store)

const abrir = ref(false)
const registro = ref({
  idioma: {
    nombre: ''
  }
})
const url = import.meta.env.VITE_APP_URL

const getDatos = async function(id) {
  try {
    cargando.value = true
    const response = await axios.get(`/libros/${id}`)
    registro.value = response.data.payload
  } catch(error) {
    alert(error.response.data.message, true)
    abrir.value = false
  } finally {
    cargando.value = false
  }
}

const abrirModal = function(id) {
  abrir.value = true
  getDatos(id)
}

defineExpose({ abrirModal })

</script>
