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
          <v-col cols="11">Detalle de la Pre-Inscripción</v-col>
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
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined" density="compact">
              <v-card-title>
                Datos personales
              </v-card-title>
              <v-card-text>
                <v-table density="compact">
                  <colgroup>
                    <col width="25%">
                    <col width="75%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="text-right pr-2">Nombre:</th>
                      <td class="font-weight-bold">{{ [registro.nombre, registro.apellidoPaterno, registro.apellidoMaterno].join(' ') }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">C.I.:</th>
                      <td class="font-weight-bold">{{ [registro.cedula, registro.cedulaComplemento, registro.ciudad.codigo].join(' ') }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Celular:</th>
                      <td class="font-weight-bold">{{ registro.celular || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Teléfono:</th>
                      <td class="font-weight-bold">{{ registro.telefono || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Email:</th>
                      <td class="font-weight-bold">{{ registro.email || '-' }}</td>
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
  ciudad: {
    codigo: ''
  }
})

const getDatos = async function(id) {
  try {
    cargando.value = true
    const response = await axios.get(`/pre_inscripciones/${id}`)
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
