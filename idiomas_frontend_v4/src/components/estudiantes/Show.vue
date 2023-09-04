<template>
  <v-dialog
    v-model="abrir"
    persistent
    width="auto"
    min-width="600"
    max-width="720"
  >
    <v-card>
      <v-card-title class="bg-indigo">
        <v-row justify="space-between" aligh="center" align-content="center" dense>
          <v-col cols="11">Detalle del Estudiante</v-col>
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
                Datos del estudiante
              </v-card-title>
              <v-card-text>
                <v-table density="compact">
                  <colgroup>
                    <col width="25%">
                    <col width="75%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="text-right pr-2">Matrícula:</th>
                      <td class="font-weight-bold">{{ registro.matricula || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Tipo:</th>
                      <td class="font-weight-bold">{{ registro.tipoEstudiante.nombre }}</td>
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
                      <th class="text-right pr-2">Año de Bachillerato:</th>
                      <td class="font-weight-bold">{{ registro.persona.gestionDiploma || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Nacionalidad:</th>
                      <td class="font-weight-bold">{{ registro.persona.nacionalidad || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Dirección:</th>
                      <td class="font-weight-bold">{{ registro.persona.direccion || '-' }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="registro.tipoEstudiante.militar">
            <v-card variant="outlined" density="compact">
              <v-card-title>
                Datos militares
              </v-card-title>
              <v-card-text>
                <v-table density="compact">
                  <colgroup>
                    <col width="25%">
                    <col width="75%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="text-right pr-2">FF.AA.:</th>
                      <td class="font-weight-bold">{{ registro.fuerza ? registro.fuerza.nombre : '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet COSSMIL:</th>
                      <td class="font-weight-bold">{{ registro.persona.carnetCossmil || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet Militar:</th>
                      <td class="font-weight-bold">{{ registro.persona.carnetMilitar || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Grado:</th>
                      <td class="font-weight-bold">{{ registro.persona.grado || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Año de Egreso:</th>
                      <td class="font-weight-bold">{{ registro.persona.gestionEgreso || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Destino Actual:</th>
                      <td class="font-weight-bold">{{ registro.persona.destinoActual || '-' }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" v-else>
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
          class="px-3"
          color="success"
          prepend-icon="mdi-file-excel-outline"
          variant="flat"
          @click="imprimir(true)"
        >
          Reporte
        </v-btn>
        <v-btn
          class="px-3"
          color="error"
          prepend-icon="mdi-file-pdf-box"
          variant="flat"
          @click="imprimir(false)"
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
import printJS from 'print-js'

const axios = inject('axios')
const store = useAppStore()
const { cargando, filial } = storeToRefs(store)

const abrir = ref(false)
const registro = ref({
  tipoEstudiante: {
    militar: false,
  },
  persona: {
    ciudad: {},
    parentesco: {},
  },
  fuerza: {},
})

const getDatos = async function(id) {
  try {
    cargando.value = true
    const response = await axios.get(`/estudiantes/${id}`)
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

const imprimir = async function(excel) {
  try {
    cargando.value = true
    if (excel) {
      const response = await axios.get('imprimir/estudiantes', {
        params: {
          id: registro.value.id,
          excel: excel,
          filialId: filial.value.id,
        },
        responseType: 'blob',
      })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([response.data], {
        type: response.headers['content-type'],
      }))
      link.setAttribute('download', `estudiante_${registro.value.id}.xlsx`)
      document.body.appendChild(link)
      link.click()
    } else {
      const response = await axios.get('imprimir/estudiantes', {
        params: {
          id: registro.value.id,
          filialId: filial.value.id,
          excel: excel,
        },
      })
      printJS({
        printable: response.data.payload.pdf,
        documentTitle: response.data.payload.filename,
        type: 'pdf',
        base64: true,
      })
    }
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

defineExpose({ abrirModal })

</script>
