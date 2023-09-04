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
          <v-col cols="11">Detalle del Usuario</v-col>
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
                Datos del usuario
              </v-card-title>
              <v-card-text>
                <v-table density="compact">
                  <colgroup>
                    <col width="25%">
                    <col width="75%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="text-right pr-2">Usuario:</th>
                      <td class="font-weight-bold">{{ registro.nombre }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Rol:</th>
                      <td class="font-weight-bold">{{ registro.rol.nombre }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Estado:</th>
                      <td class="font-weight-bold">{{ registro.activo ? 'ACTIVO' : 'INACTIVO' }}</td>
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
                      <td class="font-weight-bold">{{ [registro.persona.nombre, registro.persona.apellidoPaterno, registro.persona.apellidoMaterno].join(' ') }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">C.I.:</th>
                      <td class="font-weight-bold">{{ [registro.persona.cedula, registro.persona.cedulaComplemento, registro.persona.ciudad.codigo].join(' ') }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Fecha de Nacimiento:</th>
                      <td class="font-weight-bold">{{ $filters.fecha(registro.persona.fechaNacimiento) }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Celular:</th>
                      <td class="font-weight-bold">{{ registro.persona.celular || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Teléfono:</th>
                      <td class="font-weight-bold">{{ registro.persona.telefono || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Email:</th>
                      <td class="font-weight-bold">{{ registro.persona.email || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet COSSMIL:</th>
                      <td class="font-weight-bold">{{ registro.persona.carnetCossmil || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet Militar:</th>
                      <td class="font-weight-bold">{{ registro.persona.carnetMilitar || '-' }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined" density="compact">
              <v-card-title>
                Datos del contacto
              </v-card-title>
              <v-card-text>
                <v-table density="compact">
                  <colgroup>
                    <col width="25%">
                    <col width="75%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="text-right">Nombre:</th>
                      <td class="font-weight-bold">{{ registro.persona.contactoNombre || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Celular:</th>
                      <td class="font-weight-bold">{{ registro.persona.contactoCelular || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Teléfono:</th>
                      <td class="font-weight-bold">{{ registro.persona.contactoTelefono || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Parentesco:</th>
                      <td class="font-weight-bold">{{ registro.persona.parentesco ? registro.persona.parentesco.nombre : '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet COSSMIL:</th>
                      <td class="font-weight-bold">{{ registro.persona.contactoCarnetCossmil || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet Militar:</th>
                      <td class="font-weight-bold">{{ registro.persona.contactoCarnetMilitar || '-' }}</td>
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
          color="success"
          prepend-icon="mdi-file-excel-outline"
          variant="flat"
          @click="descargarExcel"
        >
          Imprimir
        </v-btn>
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
  rol: {
    nombre: '',
  },
  persona: {
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombre: '',
    cedula: '',
    cedulaComplemento: '',
    ciudad: '',
    fechaNacimiento: '',
    celular: '',
    telefono: '',
    email: '',
    carnetCossmil: '',
    carnetMilitar: '',
    contactoNombre: '',
    contactoCelular: '',
    contactoTelefono: '',
    parentescoId: '',
    parentesco: '',
    contactoCarnetCossmil: '',
    contactoCarnetMilitar: '',
  },
})

const getDatos = async function(id) {
  try {
    cargando.value = true
    const response = await axios.get(`/usuarios/${id}`)
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

const descargarExcel = async function() {
  try {
    cargando.value = true
    const response = await axios.get('excel/usuarios', {
      params: {
        id: registro.value.id,
      },
      responseType: 'blob',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([response.data], {
      type: response.headers['content-type'],
    }))
    link.setAttribute('download', `usuario_${registro.value.id}.xlsx`)
    document.body.appendChild(link)
    link.click()
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

defineExpose({ abrirModal })

</script>
