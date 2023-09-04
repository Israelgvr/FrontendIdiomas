<template>
  <v-dialog
    v-model="abrir"
    persistent
    width="600px"
  >
    <v-card>
      <v-card-title class="bg-indigo">
        <v-row justify="space-between" aligh="center" align-content="center" dense>
          <v-col cols="11">Detalle de la Inscripción</v-col>
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
                Datos de la inscripción
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
                      <td class="font-weight-bold">{{ registro.estudiante.matricula }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Tipo:</th>
                      <td class="font-weight-bold">{{ registro.tipoEstudiante.nombre }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Descuento:</th>
                      <td class="font-weight-bold">{{ registro.descuentoPorcentaje }}%</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Depósito:</th>
                      <td class="font-weight-bold">{{ registro.deposito ? 'SI' : 'NO' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Número de Depósito:</th>
                      <td class="font-weight-bold">{{ registro.numeroDeposito || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Traspaso:</th>
                      <td class="font-weight-bold">{{ registro.traspaso ? 'SI' : 'NO' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Traspaso desde:</th>
                      <td class="font-weight-bold">{{ registro.filial ? registro.filial.nombre : '-' }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined" density="compact">
              <v-card-title>
                Datos del Estudiante
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
                      <td class="font-weight-bold">{{ [registro.estudiante.persona.apellidoPaterno, registro.estudiante.persona.apellidoMaterno, registro.estudiante.persona.nombre].join(' ') }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">C.I.:</th>
                      <td class="font-weight-bold">{{ [registro.estudiante.persona.cedula, registro.estudiante.persona.cedulaComplemento, registro.estudiante.persona.ciudad].join(' ') }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Celular:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.celular || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Teléfono:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.telefono || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Email:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.email || '-' }}</td>
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
                      <td class="font-weight-bold">{{ registro.estudiante.persona.contactoNombre || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Celular:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.contactoCelular || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Teléfono:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.contactoTelefono || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right">Parentesco:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.parentesco ? registro.estudiante.persona.parentesco.nombre : '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet COSSMIL:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.contactoCarnetCossmil || '-' }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Carnet Militar:</th>
                      <td class="font-weight-bold">{{ registro.estudiante.persona.contactoCarnetMilitar || '-' }}</td>
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
  id: null,
  deposito: null,
  numeroDeposito: null,
  traspaso: null,
  filialId: null,
  estudianteId: null,
  tipoEstudianteId: null,
  cursoId: null,
  descuentoPorcentaje: null,
  createdAt: null,
  updatedAt: null,
  tipoEstudiante: {
    id: null,
    nombre: null,
    descuento: null,
    posicion: null,
  },
  filial: null,
  estudiante: {
    id: null,
    activo: null,
    matricula: null,
    tipoEstudianteId: null,
    fuerzaId: null,
    personaId: null,
    createdAt: null,
    updatedAt: null,
    fuerza: {
      id: null,
      nombre: null,
      codigo: null,
      posicion: null,
    },
    persona: {
      id: null,
      nombre: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
      email: null,
      cedula: null,
      cedulaComplemento: null,
      ciudadId: null,
      celular: null,
      telefono: null,
      fechaNacimiento: null,
      contactoNombre: null,
      contactoCelular: null,
      contactoTelefono: null,
      parentescoId: null,
      createdAt: null,
      updatedAt: null,
      grado: null,
      gestionDiploma: null,
      gestionEgreso: null,
      nacionalidad: null,
      destinoActual: null,
      direccion: null,
      contactoCarnetCossmil: null,
      contactoCarnetMilitar: null,
      carnetCossmil: null,
      carnetMilitar: null,
      ciudad: {
        id: null,
        nombre: null,
        codigo: null,
        posicion: null,
      },
      parentesco: {
        id: null,
        nombre: null,
        posicion: null,
      },
    },
  },
})

const getDatos = async function(cursoId, inscripcionId) {
  try {
    cargando.value = true
    const response = await axios.get(`/cursos/${cursoId}/inscripciones/${inscripcionId}`)
    registro.value = response.data.payload
  } catch(error) {
    alert(error.response.data.message, true)
    abrir.value = false
  } finally {
    cargando.value = false
  }
}

const abrirModal = function(cursoId, inscripcionId) {
  abrir.value = true
  getDatos(cursoId, inscripcionId)
}

defineExpose({ abrirModal })

</script>
