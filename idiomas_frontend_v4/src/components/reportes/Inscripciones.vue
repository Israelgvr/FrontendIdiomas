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
        <v-form @submit.prevent="getDatos(false, false)">
          <v-row class="py-4">
            <v-col cols="10" sm="5" md="4">
              <v-text-field
                density="compact"
                v-model="form.fechaInicial"
                label="Desde"
                variant="outlined"
                :error="errores.fechaInicial.length > 0"
                :error-messages="errores.fechaInicial.length ? errores.fechaInicial[0] : ''"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="10" sm="5" md="4">
              <v-text-field
                density="compact"
                v-model="form.fechaFinal"
                label="Hasta"
                variant="outlined"
                :error="errores.fechaFinal.length > 0"
                :error-messages="errores.fechaFinal.length ? errores.fechaFinal[0] : ''"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="2" md="1">
              <v-btn
                icon="mdi-magnify"
                size="small"
                type="submit"
              ></v-btn>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="6" offset-md="0" md="3">
              <v-btn
                color="success"
                prepend-icon="mdi-printer"
                variant="flat"
                block
                :disabled="!form.fechaInicial || !form.fechaFinal || errores.fechaInicial.length > 0 || errores.fechaFinal.length > 0 || items.length == 0"
              >
                Reporte
                <v-menu activator="parent">
                  <v-list>
                    <v-list-item
                      @click="getDatos(true, false)"
                    >
                      <template v-slot:prepend>
                        <v-icon color="success">mdi-file-excel-outline</v-icon>
                      </template>
                      <v-list-item-title>Excel</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      @click="getDatos(false, true)"
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
          </v-row>
        </v-form>
        <v-table fixed-header hover density="comfortable">
          <thead class="grey--text text--darken-2">
            <tr>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Fecha de Inscripción
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Idioma
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Modalidad
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Curso
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Matrícula
              </th>
              <th width="18%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Nombre
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Cédula de Identidad
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Tipo
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Descuento
              </th>
              <th width="8%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Nro. de Depósito
              </th>
              <th width="11%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
                Traspaso desde
              </th>
            </tr>
          </thead>
          <tbody v-if="paginacion.total > 0">
            <tr v-for="item in items" :key="item.id">
              <td class="text-center">{{ $filters.fecha(item.createdAt) }}</td>
              <td class="text-center">{{ item.curso.idioma.nombre }}</td>
              <td class="text-center">{{ item.curso.modalidad.nombre }}</td>
              <td class="text-center">{{ item.curso.nombre }}</td>
              <td class="text-center">{{ item.estudiante.matricula }}</td>
              <td class="text-center">{{ [item.estudiante.persona.nombre, item.estudiante.persona.apellidoPaterno, item.estudiante.persona.apellidoMaterno].join(' ') }}</td>
              <td class="text-center">{{ [item.estudiante.persona.cedula, item.estudiante.persona.cedulaComplemento, item.estudiante.persona.ciudad.codigo].join(' ') }}</td>
              <td class="text-center">{{ item.tipoEstudiante.nombre }}</td>
              <td class="text-center">{{ item.descuentoPorcentaje }}%</td>
              <td class="text-center">{{ item.deposito ? item.numeroDeposito : '-' }}</td>
              <td class="text-center">{{ item.traspaso ? item.filial.nombre : '-' }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="11" class="text-center">No hay datos para mostrar</td>
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
              @update:modelValue="getDatos(false, false)"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import printJS from 'print-js'

const axios = inject('axios')
const store = useAppStore()
const { cargando, filial } = storeToRefs(store)
const { alerta } = store

const breadcrumbs = [
  {
    text: 'Reporte de Inscripciones',
    to: { name: 'ReportesInscripciones' },
    disabled: false,
  },
]
const paginacion = ref({
  pagina: 1,
  ultimaPagina: 0,
  total: 0,
  porPagina: 8,
  opciones: [8, 15, 30],
})
const items = ref([])
const errores = ref({
  fechaInicial: [],
  fechaFinal: [],
})
const form = ref({
  fechaInicial: null,
  fechaFinal: null,
})

const cambiarPagina = function() {
  paginacion.value.pagina = 1
  getDatos(false, false)
}

const getDatos = async function(excel = false, pdf = false) {
  if (form.value.fechaInicial !== null && form.value.fechaFinal !== null) {
    try {
      cargando.value = true
      Object.keys(errores.value).forEach((key) => {
        errores.value[key] = []
      })
      if (excel) {
        const response = await axios.get('reportes/inscripciones', {
          params: {
            fechaInicial: form.value.fechaInicial,
            fechaFinal: form.value.fechaFinal,
            excel: excel,
            pdf: pdf,
            filialId: filial.value.id,
          },
          responseType: 'blob',
        })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(new Blob([response.data], {
          type: response.headers['content-type'],
        }))
        link.setAttribute('download', `inscripciones.xlsx`)
        document.body.appendChild(link)
        link.click()
      } else if (pdf) {
        const response = await axios.get('reportes/inscripciones', {
          params: {
            fechaInicial: form.value.fechaInicial,
            fechaFinal: form.value.fechaFinal,
            excel: excel,
            pdf: pdf,
            filialId: filial.value.id,
          },
        })
        printJS({
          printable: response.data.payload.pdf,
          documentTitle: response.data.payload.filename,
          type: 'pdf',
          base64: true,
        })
      } else {
        const response = await axios.get('reportes/inscripciones', {
          params: {
            fechaInicial: form.value.fechaInicial,
            fechaFinal: form.value.fechaFinal,
            excel: false,
            pdf: false,
            filialId: filial.value.id,
          },
        })
        items.value = response.data.payload.data
        paginacion.value.ultimaPagina = response.data.payload.meta.lastPage
        paginacion.value.total = response.data.payload.meta.total
      }
    } catch(error) {
      alerta(error.response.data.message, true)
      Object.keys(error.response.data.errors).forEach((key) => {
        errores.value[key] = error.response.data.errors[key]
      })
    } finally {
      cargando.value = false
    }
  }
}

onMounted(() => {
  getDatos(false, false)
})

</script>
