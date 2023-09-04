<template>
  <v-container>
    <v-sheet>
      <v-container>
        <div class="text-h6 text-md-h5">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:title="{ item }">
              {{ item.text }}
            </template>
          </v-breadcrumbs>
        </div>
        <v-row class="py-4">
          <v-col cols="12" sm="8" md="9" lg="10">
            <span class="text-h6 text-md-h5">Niveles del idioma </span>
            <span class="text-h6 text-md-h5 font-weight-bold">{{ idioma.nombre }}</span>
          </v-col>
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-btn color="info" prepend-icon="mdi-plus" variant="flat" block @click="formNivel.abrirModal(route.params.id, null)">
              Nuevo
            </v-btn>
          </v-col>
        </v-row>
        <v-table fixed-header hover density="comfortable">
          <thead class="grey--text text--darken-2">
            <tr>
              <th width="5%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                #
              </th>
              <th width="10%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Código
              </th>
              <th width="20%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Nombre
              </th>
              <th width="55%" class="text-center bg-secondary" style="min-width: 350px; border: 1px solid white; border-width: 0 1px 0 0;">
                Libros
              </th>
              <th width="10%" class="text-center bg-secondary" style="min-width: 152px;">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody v-if="items.length > 0">
            <tr v-for="item in items" :key="item.id">
              <td class="text-center">{{ item.posicion }}</td>
              <td class="text-center">{{ item.codigo }}</td>
              <td class="text-center">{{ item.nombre }}</td>
              <td class="text-center">
                <v-row v-for="libro in item.libros" dense>
                  <v-col cols="3" lg="2" xl="1">
                    <v-img
                      v-if="libro.imagen"
                      class="mx-auto"
                      height="45"
                      max-height="45"
                      :src="`${url}/uploads/libros/${libro.imagen}`"
                    ></v-img>
                    <div v-else>-</div>
                  </v-col>
                  <v-col cols="9" lg="10" xl="11" class="text-left">
                    {{ libro.nombre }} ({{ libro.edicion }})
                  </v-col>
                </v-row>
              </td>
              <td class="text-center">
                <v-btn
                  @click="formNivel.abrirModal(route.params.id, item.id)"
                  size="x-small"
                  icon="mdi-pencil"
                  color="warning"
                  class="mx-1"
                ></v-btn>
                <v-btn
                  @click="eliminar(item.id, item.nombre)"
                  size="x-small"
                  icon="mdi-delete"
                  color="error"
                  class="mx-1"
                ></v-btn>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7" class="text-center">No hay datos para mostrar</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-sheet>
  </v-container>
  <modal-eliminar :modal="modalEliminar" @eliminado="getDatos()" />
  <niveles-form ref="formNivel" @enviado="getDatos()" />
</template>

<script setup>
import { inject, reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import ModalEliminar from '@/components/shared/ModalEliminar.vue'
import NivelesForm from '@/components/idiomas/niveles/Form.vue'

const axios = inject('axios')
const route = useRoute()
const store = useAppStore()
const { cargando } = storeToRefs(store)
const { alerta } = store

const breadcrumbs = ref([
  {
    text: 'Idiomas',
    to: { name: 'IdiomasIndex' },
    disabled: false,
  }, {
    text: '',
    to: { name: 'NivelesIndex', params: { id: route.params.id } },
    disabled: false,
  }
])
const formNivel = ref()
const idioma = ref({
  id: null,
  codigo: '',
  nombre: '',
})
const items = ref([])
const url = import.meta.env.VITE_APP_URL

const modalEliminar = reactive({
  id: null,
  url: `idiomas/${route.params.id}/niveles`,
  titulo: 'el nivel',
  codigo: null,
  abrir: false,
})

const eliminar = function(id, nombre) {
  modalEliminar.id = id
  modalEliminar.codigo = nombre
  modalEliminar.abrir = true
}

const getDatos = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`idiomas/${route.params.id}/niveles`)
    items.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

const getIdioma = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`idiomas/${route.params.id}`)
    idioma.value = response.data.payload
    breadcrumbs.value[1].text = idioma.value.codigo
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getDatos()
  }
}

onMounted(() => {
  getIdioma()
})

</script>

<style lang="css" scoped>
.v-data-table .v-data-table__wrapper{
  overflow-y: hidden;
}
</style>
