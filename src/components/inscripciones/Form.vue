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
        <v-form @submit.prevent="enviarFormulario">
          <v-row>
            <v-col cols="12">
              <v-card variant="outlined">
                <v-card-title>
                  Datos del curso
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6" class="pb-0" v-if="form.id == null">
                      <v-select
                        density="compact"
                        label="Idioma"
                        variant="outlined"
                        :items="idiomas"
                        item-title="nombre"
                        item-value="id"
                        @update:model-value="getCursos"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0" v-else>
                      <v-text-field
                        density="compact"
                        v-model="curso.idioma.nombre"
                        label="Idioma"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-autocomplete
                        density="compact"
                        v-model="curso"
                        label="Curso"
                        :variant="form.id == null ? 'outlined' : 'underlined'"
                        :error="errores.cursoId.length > 0"
                        :error-messages="errores.cursoId.length ? errores.cursoId[0] : ''"
                        :items="cursos"
                        item-title="nombre"
                        return-object
                        @update:model-value="getEstudiantes"
                        :readonly="form.id !== null"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="curso.modalidad.nombre"
                        label="Modalidad"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="curso.horaInicial"
                        label="Hora Inicial"
                        variant="underlined"
                        type="time"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="curso.horaFinal"
                        label="Hora Final"
                        variant="underlined"
                        type="time"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="niveles"
                        label="Niveles"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="libros"
                        label="Libros"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card variant="outlined">
                <v-card-title>
                  Datos de la Inscripción
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="5" class="pb-0">
                      <v-autocomplete
                        density="compact"
                        v-model="estudiante"
                        label="Matrícula"
                        variant="outlined"
                        :items="estudiantes"
                        item-title="matricula"
                        return-object
                        @update:model-value="setDescuento"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="5" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="estudiante.tipoEstudianteId"
                        label="Tipo de Estudiante"
                        variant="outlined"
                        :error="errores.tipoEstudianteId.length > 0"
                        :error-messages="errores.tipoEstudianteId.length ? errores.tipoEstudianteId[0] : ''"
                        :items="tiposEstudiante"
                        item-title="nombre"
                        item-value="id"
                        persistent-hint
                        @update:model-value="setDescuento"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="2" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.descuentoPorcentaje"
                        label="Descuento [%]"
                        variant="outlined"
                        :error="errores.descuentoPorcentaje.length > 0"
                        :error-messages="errores.descuentoPorcentaje.length ? errores.descuentoPorcentaje[0] : ''"
                        type="number"
                        step="1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" lg="1" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.deposito"
                        label="Depósito"
                        variant="outlined"
                        :error="errores.deposito.length > 0"
                        :error-messages="errores.deposito.length ? errores.deposito[0] : ''"
                        :items="selectorSiNo"
                        item-title="codigo"
                        item-value="id"
                        @update:model-value="seleccionarDeposito"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="10" lg="5" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.numeroDeposito"
                        label="Número de Depósito"
                        variant="outlined"
                        :error="errores.numeroDeposito.length > 0"
                        :error-messages="errores.numeroDeposito.length ? errores.numeroDeposito[0] : ''"
                        :disabled="!form.deposito"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" lg="1" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.traspaso"
                        label="Traspaso"
                        variant="outlined"
                        :error="errores.traspaso.length > 0"
                        :error-messages="errores.traspaso.length ? errores.traspaso[0] : ''"
                        :items="selectorSiNo"
                        item-title="codigo"
                        item-value="id"
                        @update:model-value="seleccionarTraspaso"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="10" lg="5" class="pb-0">
                      <v-autocomplete
                        density="compact"
                        v-model="form.traspasoFilialId"
                        label="Traspaso desde"
                        variant="outlined"
                        :error="errores.traspasoFilialId.length > 0"
                        :error-messages="errores.traspasoFilialId.length ? errores.traspasoFilialId[0] : ''"
                        :items="filiales"
                        item-title="nombre"
                        item-value="id"
                        :disabled="!form.traspaso"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card variant="outlined">
                <v-card-title>
                  Datos del estudiante
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-autocomplete
                        density="compact"
                        v-model="estudiante"
                        label="Nombre"
                        variant="outlined"
                        :items="estudiantes"
                        item-title="nombreCompleto"
                        return-object
                        @update:model-value="setDescuento"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.cedula"
                        label="Cédula de Identidad"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.cedulaComplemento"
                        label="Complemento"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.ciudad.codigo"
                        label="Expedición"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" v-if="militar">
              <v-card variant="outlined">
                <v-card-title>
                  Datos militares
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="estudiante.fuerzaId"
                        label="FF.AA."
                        variant="underlined"
                        :items="fuerzas"
                        item-title="nombre"
                        item-value="id"
                        readonly
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.carnetCossmil"
                        label="Carnet COSSMIL"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.carnetMilitar"
                        label="Carnet Militar"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-combobox
                        density="compact"
                        v-model="estudiante.persona.grado"
                        label="Grado"
                        variant="underlined"
                        :items="grados"
                        readonly
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="8" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.destinoActual"
                        label="Destino Actual"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" v-else>
              <v-card variant="outlined">
                <v-card-title>
                  Datos del contacto
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6" lg="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.contactoNombre"
                        label="Nombre"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="2" class="pb-0">
                      <v-autocomplete
                        density="compact"
                        v-model="estudiante.persona.parentescoId"
                        label="Parentesco"
                        variant="underlined"
                        :items="parentescos"
                        item-title="nombre"
                        item-value="id"
                        readonly
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6" lg="2" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.contactoCarnetCossmil"
                        label="Carnet COSSMIL"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="2" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="estudiante.persona.contactoCarnetMilitar"
                        label="Carnet Militar"
                        variant="underlined"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mb-4" justify="end">
            <v-col cols="12" md="6" lg="4" xl="3" class="pb-0">
              <v-btn
                type="submit"
                color="success"
                prepend-icon="mdi-check-bold"
                block
              >Guardar</v-btn>
            </v-col>
            <v-col cols="12" md="6" lg="4" xl="3" class="pb-0">
              <v-btn
                :to="{ name: 'InscripcionesIndex' }"
                color="error"
                prepend-icon="mdi-close-thick"
                block
              >Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { inject, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const route = useRoute()
const router = useRouter()
const store = useAppStore()
const { alerta } = store
const { cargando, filial, selectorSiNo } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Inscripciones',
    to: { name: 'InscripcionesIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nuevo',
    to: { name: 'InscripcionesForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const errores = ref({
  tipoEstudianteId: [],
  descuentoPorcentaje: [],
  deposito: [],
  numeroDeposito: [],
  traspaso: [],
  traspasoFilialId: [],
  cursoId: [],
})
const form = ref({
  id: null,
  deposito: false,
  numeroDeposito: null,
  traspaso: false,
  traspasoFilialId: null,
})
const estudiante = ref({
  matricula: null,
  fuerza: {
    id: null,
  },
  tipoEstudianteId: null,
  descuentoPorcentaje: 0,
  nombreCompleto: null,
  persona: {
    nombre: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    cedula: null,
    cedulaComplemento: null,
    ciudadId: null,
    carnetCossmil: null,
    carnetMilitar: null,
    grado: null,
    destinoActual: null,
    contactoNombre: null,
    parentescoId: null,
    contactoCarnetCossmil: null,
    contactoCarnetMilitar: null,
    ciudad: {
      codigo: null,
    },
  },
})
const parentescos = ref([])
const nacionalidades = ref([])
const grados = ref([])
const tiposEstudiante = ref([])
const fuerzas = ref([])
const cursos = ref([])
const filiales = ref([])
const idiomas = ref([])
const estudiantes = ref([])
const curso = ref({
  id: null,
  nombre: null,
  horaInicial: null,
  horaFinal: null,
  modalidad: {
    nombre: null,
  },
  idioma: {
    nombre: null,
  },
  niveles: [],
})

const militar = computed({
  get() {
    if (tiposEstudiante.value.length > 0 && estudiante.value.tipoEstudianteId !== null) {
      return tiposEstudiante.value.find(o => o.id == estudiante.value.tipoEstudianteId).militar
    } else {
      return false
    }
  },
})

const niveles = computed({
  get() {
    if (curso.value.niveles.length > 0) {
      return curso.value.niveles.map(o => o.nombre).join(', ')
    } else {
      return null
    }
  },
})

const libros = computed({
  get() {
    if (curso.value.niveles.length > 0) {
      let libros = []
      curso.value.niveles.forEach(nivel => {
        libros = libros.concat(nivel.libros.map(o => o.nombre))
      })
      return [...new Set(libros)].join(', ')
    } else {
      return null
    }
  },
})

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response
    if (form.value.id !== null) {
      response = await axios.put(`inscripciones/${form.value.id}`, {
        deposito: form.value.deposito,
        numeroDeposito: form.value.numeroDeposito,
        traspaso: form.value.traspaso,
        traspasoFilialId: form.value.traspasoFilialId,
        estudianteId: estudiante.value.id,
        tipoEstudianteId: estudiante.value.tipoEstudianteId,
        descuentoPorcentaje: estudiante.value.descuentoPorcentaje,
        cursoId: curso.value.id,
        filialId: filial.value.id,
      })
    } else {
      response = await axios.post('inscripciones', {
        deposito: form.value.deposito,
        numeroDeposito: form.value.numeroDeposito,
        traspaso: form.value.traspaso,
        traspasoFilialId: form.value.traspasoFilialId,
        estudianteId: estudiante.value.id,
        tipoEstudianteId: estudiante.value.tipoEstudianteId,
        descuentoPorcentaje: estudiante.value.descuentoPorcentaje,
        cursoId: curso.value.id,
        filialId: filial.value.id,
      })
    }
    alerta(response.data.message)
    router.push({ name: 'InscripcionesIndex' })
  } catch(error) {
    Object.keys(error.response.data.errors).forEach((key) => {
      errores.value[key] = error.response.data.errors[key]
    })
  } finally {
    cargando.value = false
  }
}

const getDatos = async function() {
  try {
    cargando.value = true
    if (route.params.id !== '0') {
      const response = await axios.get(`inscripciones/${route.params.id}`)
      estudiante.value = response.data.payload.estudiante
      estudiante.value.nombreCompleto = [estudiante.value.persona.nombre, estudiante.value.persona.apellidoPaterno, estudiante.value.persona.apellidoMaterno].join(' ')
      estudiante.value.descuentoPorcentaje = response.data.payload.descuentoPorcentaje
      curso.value = response.data.payload.curso
      form.value = {
        id: response.data.payload.id,
        deposito: response.data.payload.deposito,
        numeroDeposito: response.data.payload.numeroDeposito,
        traspaso: response.data.payload.traspaso,
        traspasoFilialId: response.data.payload.traspasoFilialId,
      }
    } else {
      form.value.id = null
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

const getIdiomas = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`idiomas`, {
      params: {
        combo: true,
        filialId: filial.value.id,
      },
    })
    idiomas.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getFiliales()
  }
}

const getFiliales = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`filiales`, {
      params: {
        combo: true,
      },
    })
    filiales.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getNacionalidades()
  }
}

const getCursos = async function(idiomaId) {
  try {
    cargando.value = true
    curso.value = {
      id: null,
      nombre: null,
      horaInicial: null,
      horaFinal: null,
      modalidad: {
        nombre: null,
      },
      idioma: {
        nombre: null,
      },
      niveles: [],
    }
    estudiantes.value = []
    estudiante.value = {
      matricula: null,
      fuerza: {
        id: null,
      },
      tipoEstudianteId: null,
      descuentoPorcentaje: 0,
      nombreCompleto: null,
      persona: {
        nombre: null,
        apellidoPaterno: null,
        apellidoMaterno: null,
        cedula: null,
        cedulaComplemento: null,
        ciudadId: null,
        carnetCossmil: null,
        carnetMilitar: null,
        grado: null,
        destinoActual: null,
        contactoNombre: null,
        parentescoId: null,
        contactoCarnetCossmil: null,
        contactoCarnetMilitar: null,
        ciudad: {
          codigo: null,
        },
      },
    }
    const response = await axios.get(`cursos`, {
      params: {
        combo: true,
        filialId: filial.value.id,
        idiomaId: idiomaId,
      },
    })
    cursos.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

const getNacionalidades = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`nacionalidades`)
    nacionalidades.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getGrados()
  }
}

const getGrados = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`grados`)
    grados.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getParentescos()
  }
}

const getParentescos = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`parentescos`, {
      params: {
        combo: true,
      },
    })
    parentescos.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getTiposEstudiante()
  }
}

const getTiposEstudiante = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`tipos_estudiante`, {
      params: {
        combo: true,
        filialId: filial.value.id,
      },
    })
    tiposEstudiante.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getFuerzas()
  }
}

const getFuerzas = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`fuerzas`, {
      params: {
        combo: true,
      },
    })
    fuerzas.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getDatos()
  }
}

const getEstudiantes = async function(cursoSeleccionado) {
  try {
    cargando.value = true
    const response = await axios.get(`inscripciones/estudiantes`, {
      params: {
        buscar: null,
        cursoId: cursoSeleccionado.id,
        filialId: filial.value.id,
      },
    })
    estudiantes.value = response.data.payload
    estudiantes.value.forEach(estudiante => {
      estudiante.nombreCompleto = [estudiante.persona.nombre, estudiante.persona.apellidoPaterno, estudiante.persona.apellidoMaterno].join(' ')
    })
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

const setDescuento = function() {
  if (tiposEstudiante.value.length > 0) {
    const tipoEstudiante = tiposEstudiante.value.find(o => o.id == estudiante.value.tipoEstudianteId)
    if (tipoEstudiante) {
      estudiante.value.descuentoPorcentaje = tipoEstudiante.descuentoPorcentaje
    } else {
      estudiante.value.descuentoPorcentaje = 0
    }
  } else {
    estudiante.value.descuentoPorcentaje = 0
  }
}

const seleccionarTraspaso = function(valor) {
  if (valor === false) {
    form.value.traspasoFilialId = null
  }
}

const seleccionarDeposito = function(valor) {
  if (valor === false) {
    form.value.numeroDeposito = null
  }
}

onMounted(() => {
  getIdiomas()
})

</script>
