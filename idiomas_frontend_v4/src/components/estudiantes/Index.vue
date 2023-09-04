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
          <v-col cols="12" sm="4" md="6" lg="8">
            <input-buscar :longitud="2" @input="buscar"/>
          </v-col>
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-btn
              color="success"
              prepend-icon="mdi-printer"
              variant="flat"
              block
              :disabled="items.length == 0"
            >
              Reporte
              <v-menu activator="parent">
                <v-list>
                  <v-list-item
                    @click="imprimir(true)"
                  >
                    <template v-slot:prepend>
                      <v-icon color="success">mdi-file-excel-outline</v-icon>
                    </template>
                    <v-list-item-title>Excel</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="imprimir(false)"
                  >
                    <template v-slot:prepend>
                      <v-icon color="error">mdi-file-pdf-box</v-icon>
                    </template>
                    <v-list-item-title>PDF</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-btn color="info" prepend-icon="mdi-plus" variant="flat" block :to="{ name: 'EstudiantesForm', params: { id: '0' } }">
              Nuevo
            </v-btn>
          </v-col>
        </v-row>
        <v-table fixed-header hover density="comfortable">
          <thead class="grey--text text--darken-2">
            <tr>
              <th width="50%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Nombre
              </th>
              <th width="15%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Cédula de Identidad
              </th>
              <th width="15%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Matrícula
              </th>
              <th width="10%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Estado
              </th>
              <th width="10%" class="text-center bg-secondary" style="min-width: 152px;">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody v-if="paginacion.total > 0">
            <tr v-for="item in items" :key="item.id">
              <td class="text-center">{{ [item.persona.nombre, item.persona.apellidoPaterno, item.persona.apellidoMaterno].join(' ') }}</td>
              <td class="text-center">{{ [item.persona.cedula, item.persona.cedulaComplemento, item.persona.ciudad.codigo].join(' ') }}</td>
              <td class="text-center">{{ item.matricula || '-' }}</td>
              <td class="text-center">
                <v-chip :color="item.activo ? 'success' : 'error'">
                  {{ item.activo ? 'ACTIVO' : 'INACTIVO' }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-btn
                  @click="detalle.abrirModal(item.id)"
                  size="x-small"
                  icon="mdi-eye"
                  color="info"
                  class="mx-1"
                ></v-btn>
                <v-btn
                  :to="{ name: 'EstudiantesForm', params: { id: item.id } }"
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
        <v-row v-if="paginacion.total > 0" class="text-center bg-grey-lighten-5 mt-2" align="center" dense justify="end">
          <v-col cols="12" sm="4" md="2" xl="1" class="d-none d-sm-inline">
            <v-select
              v-model="paginacion.porPagina"
              density="compact"
              label="Filas a mostrar"
              :items="paginacion.opciones"
              hide-details
              @update:modelValue="cambiarPagina()"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="8" md="5" lg="4" xl="2">
            <v-pagination
              v-model="paginacion.pagina"
              density="compact"
              :length="paginacion.ultimaPagina"
              :total-visible="5"
              rounded="circle"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              @update:modelValue="getDatos()"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
  <modal-eliminar :modal="modalEliminar" @eliminado="getDatos()" />
  <modal-detalle ref="detalle" />
</template>

<script setup>
import { inject, reactive, ref, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import ModalEliminar from '@/components/shared/ModalEliminar.vue'
import ModalDetalle from '@/components/estudiantes/Show.vue'
import printJS from 'print-js'

const axios = inject('axios')
const store = useAppStore()
const { alerta } = store
const { cargando, filial } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Estudiantes',
    to: { name: 'EstudiantesIndex' },
    disabled: false,
  },
]
const detalle = ref()
const paginacion = ref({
  pagina: 1,
  ultimaPagina: 0,
  total: 0,
  porPagina: 8,
  opciones: [8, 15, 30],
})
const items = ref([])

const modalEliminar = reactive({
  id: null,
  url: 'estudiantes',
  titulo: 'el estudiante',
  codigo: null,
  abrir: false,
})

const buscar = function(value) {
  paginacion.value.pagina = 1
  getDatos(value)
}

const eliminar = function(id, nombre) {
  modalEliminar.id = id
  modalEliminar.codigo = nombre
  modalEliminar.abrir = true
}

const cambiarPagina = function() {
  paginacion.value.pagina = 1
  getDatos()
}

const getDatos = async function(buscar = '') {
  try {
    cargando.value = true
    const response = await axios.get('estudiantes', {
      params: {
        pagina: paginacion.value.pagina,
        porPagina: paginacion.value.porPagina,
        buscar: buscar,
        filialId: filial.value.id,
      },
    })
    items.value = response.data.payload.data
    paginacion.value.ultimaPagina = response.data.payload.meta.lastPage
    paginacion.value.total = response.data.payload.meta.total
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

const imprimir = async function(excel) {
  try {
    cargando.value = true
    if (excel) {
      const response = await axios.get('imprimir/estudiantes', {
        params: {
          filialId: filial.value.id,
          excel: excel,
        },
        responseType: 'blob',
      })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([response.data], {
        type: response.headers['content-type'],
      }))
      link.setAttribute('download', `estudiantes.xlsx`)
      document.body.appendChild(link)
      link.click()
    } else {
      const response = await axios.get('imprimir/estudiantes', {
        params: {
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

onMounted(() => {
  getDatos()
})

</script>
