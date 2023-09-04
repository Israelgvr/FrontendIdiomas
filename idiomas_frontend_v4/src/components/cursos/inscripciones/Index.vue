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
        <v-row class="pt-4">
          <v-col cols="12">
            <span class="text-h6 text-md-h5">Incripciones del curso: </span>
            <span class="text-h6 text-md-h5 font-weight-bold">{{ curso.nombre }}</span>
          </v-col>
          <v-col cols="12" md="6">
            <v-card variant="outlined" density="compact">
              <v-card-text>
                <v-table density="compact">
                  <colgroup>
                    <col width="25%">
                    <col width="75%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="text-right pr-2">Idioma:</th>
                      <td class="font-weight-bold">{{ curso.idioma.nombre }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Modalidad:</th>
                      <td class="font-weight-bold">{{ curso.modalidad.nombre }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Horario:</th>
                      <td class="font-weight-bold">{{ $filters.hora(curso.horaInicial) }} - {{ $filters.hora(curso.horaFinal) }}</td>
                    </tr>
                    <tr>
                      <th class="text-right pr-2">Estado:</th>
                      <td class="font-weight-bold">{{ curso.activo ? 'EN CURSO' : 'FINALIZADO' }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card variant="outlined" density="compact">
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
                    <tr v-for="nivel in curso.niveles" :key="nivel.id" style="background-color: white;">
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
        <v-row class="pb-4">
          <v-col cols="12" sm="8" md="9" lg="10">
            <input-buscar :longitud="2" @input="buscar"/>
          </v-col>
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-btn color="info" prepend-icon="mdi-plus" variant="flat" block @click="formInscripcion.abrirModal(route.params.id, null)">
              Nuevo
            </v-btn>
          </v-col>
        </v-row>
        <v-table fixed-header hover density="comfortable">
          <thead class="grey--text text--darken-2">
            <tr>
              <th width="35%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Nombre
              </th>
              <th width="20%" class="text-center bg-secondary" style="min-width: 350px; border: 1px solid white; border-width: 0 1px 0 0;">
                Cédula de Identidad
              </th>
              <th width="10%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Matrícula
              </th>
              <th width="5%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Depósito
              </th>
              <th width="5%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Descuento
              </th>
              <th width="15%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Traspaso desde
              </th>
              <th width="10%" class="text-center bg-secondary" style="min-width: 152px;">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody v-if="items.length > 0">
            <tr v-for="item in items" :key="item.id">
              <td class="text-center">{{ [item.estudiante.persona.apellidoPaterno, item.estudiante.persona.apellidoMaterno, item.estudiante.persona.nombre].join(' ') }}</td>
              <td class="text-center">{{ [item.estudiante.persona.cedula, item.estudiante.persona.cedulaComplemento, item.estudiante.persona.ciudad.codigo].join(' ') }}</td>
              <td class="text-center">{{ item.estudiante.matricula }}</td>
              <td class="text-center">
                <v-chip :color="item.deposito ? 'success' : 'error'">
                  {{ item.deposito ? 'SI' : 'NO' }}
                </v-chip>
              </td>
              <td class="text-center">{{ item.descuentoPorcentaje }}%</td>
              <td class="text-center">{{ item.filial !== null ? item.filial.nombre : '-' }}</td>
              <td class="text-center">
                <v-btn
                  @click="detalle.abrirModal(curso.id, item.id)"
                  size="x-small"
                  icon="mdi-eye"
                  color="info"
                  class="mx-1"
                ></v-btn>
                <v-btn
                  @click="formInscripcion.abrirModal(route.params.id, item.id)"
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
  <modal-detalle ref="detalle" />
  <modal-eliminar :modal="modalEliminar" @eliminado="getDatos()" />
  <inscripciones-form :curso="curso" ref="formInscripcion" @inscrito="getDatos()" />
</template>

<script setup>
import { inject, reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import ModalDetalle from '@/components/cursos/inscripciones/Show.vue'
import ModalEliminar from '@/components/shared/ModalEliminar.vue'
import InscripcionesForm from '@/components/cursos/inscripciones/Form.vue'

const axios = inject('axios')
const route = useRoute()
const store = useAppStore()
const { cargando } = storeToRefs(store)
const { alerta } = store

const breadcrumbs = ref([
  {
    text: 'Cursos',
    to: { name: 'CursosIndex' },
    disabled: false,
  }, {
    text: '',
    to: { name: 'InscripcionesIndex', params: { id: route.params.id } },
    disabled: false,
  }
])
const formInscripcion = ref()
const buscarTexto = ref(null)
const curso = ref({
  id: null,
  nombre: '',
  idioma: {
    nombre: '',
  },
  modalidad: {
    nombre: '',
  },
  niveles: [],
})
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
  url: `cursos/${route.params.id}/inscripciones`,
  titulo: 'la inscripción',
  codigo: null,
  abrir: false,
})

const buscar = function(value) {
  paginacion.value.pagina = 1
  buscarTexto.value = value
  getDatos()
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

const getDatos = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`cursos/${route.params.id}/inscripciones`, {
      params: {
        pagina: paginacion.value.pagina,
        porPagina: paginacion.value.porPagina,
        buscar: buscarTexto.value,
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

const getCurso = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`cursos/${route.params.id}`)
    curso.value = response.data.payload
    breadcrumbs.value[1].text = curso.value.nombre
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getDatos()
  }
}

onMounted(() => {
  getCurso()
})

</script>

<style lang="css" scoped>
.v-data-table .v-data-table__wrapper{
  overflow-y: hidden;
}
</style>
