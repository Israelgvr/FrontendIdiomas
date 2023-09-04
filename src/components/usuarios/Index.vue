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
            <v-btn color="success" prepend-icon="mdi-file-excel-outline" variant="flat" block @click="descargarExcel" :disabled="items.length == 0">
              Reporte
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-btn color="info" prepend-icon="mdi-plus" variant="flat" block :to="{ name: 'UsuariosForm', params: { id: '0' } }">
              Nuevo
            </v-btn>
          </v-col>
        </v-row>
        <v-table fixed-header hover density="comfortable">
          <thead class="grey--text text--darken-2">
            <tr>
              <th width="20%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Usuario
              </th>
              <th width="35%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Nombre
              </th>
              <th width="25%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Rol
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
              <td class="text-center">{{ item.nombre }}</td>
              <td class="text-center">{{ [item.persona.nombre, item.persona.apellidoPaterno, item.persona.apellidoMaterno].join(' ') }}</td>
              <td class="text-center">{{ item.rol.nombre }}</td>
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
                  :to="{ name: 'UsuariosForm', params: { id: item.id } }"
                  size="x-small"
                  icon="mdi-pencil"
                  color="warning"
                  class="mx-1"
                ></v-btn>
                <v-btn
                  :disabled="item.id == usuario.id"
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
import ModalDetalle from '@/components/usuarios/Show.vue'

const axios = inject('axios')
const store = useAppStore()
const { alerta } = store
const { cargando, filial, usuario } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Usuarios',
    to: { name: 'UsuariosIndex' },
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
  url: 'usuarios',
  titulo: 'el usuario',
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
    const response = await axios.get('usuarios', {
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

const descargarExcel = async function() {
  try {
    cargando.value = true
    const response = await axios.get('excel/usuarios', {
      params: {
        filialId: filial.value.id,
      },
      responseType: 'blob',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([response.data], {
      type: response.headers['content-type'],
    }))
    link.setAttribute('download', `usuarios.xlsx`)
    document.body.appendChild(link)
    link.click()
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
