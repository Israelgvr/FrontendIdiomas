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
          <v-col cols="11">Detalle del Curso</v-col>
          <v-col cols="1" class="text-end">
            <v-btn @click="abrir = false" density="compact" variant="plain" color="white" icon="mdi-close"></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-card variant="outlined" density="compact">
              <v-card-title>
                Datos del curso
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
                      <th class="text-right pr-2">Modalidad:</th>
                      <td class="font-weight-bold">{{ registro.modalidad.nombre }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Nombre:</th>
                      <td class="font-weight-bold">{{ registro.nombre }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Hora inicial:</th>
                      <td class="font-weight-bold">{{ registro.horaInicial }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Hora final:</th>
                      <td class="font-weight-bold">{{ registro.horaFinal }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Estado:</th>
                      <td class="font-weight-bold">{{ registro.activo ? 'EN CURSO' : 'FINALIZADO' }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined" density="compact">
              <v-card-title>
                Listado de niveles
              </v-card-title>
              <v-card-text>
                <v-table density="compact">
                  <colgroup>
                    <col width="40%">
                    <col width="60%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="text-center">Nivel</th>
                      <th class="text-center">Libros</th>
                    </tr>
                    <tr v-for="nivel in registro.niveles" :key="nivel.id" style="background-color: white;">
                      <td class="text-center">{{ nivel.nombre }}</td>
                      <td>
                        <v-list :lines="false" density="compact" class="my-0 py-0">
                          <v-list-item
                            v-for="item in nivel.libros"
                            :key="item.id"
                            class="pa-0 my-0"
                          >
                            <template v-slot:prepend>
                              <v-icon icon="mdi-menu-right" class="px-0 mx-0" size="25"></v-icon>
                            </template>
                            <template v-slot:title>
                              <div class="text-body-2 px-0 mx-0">{{ `${item.nombre} (${item.edicion})` }}</div>
                            </template>
                          </v-list-item>
                        </v-list>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
    nombre: '',
  },
  modalidad: {
    nombre: '',
  },
})

const getDatos = async function(id) {
  try {
    cargando.value = true
    const response = await axios.get(`/cursos/${id}`)
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
