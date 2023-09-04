<template>
  <v-dialog
    v-model="abrir"
    persistent
    width="480"
  >
    <v-card>
      <v-card-title class="bg-indigo">
        <v-row justify="space-between" aligh="center" align-content="center" dense>
          <v-col cols="11">Inscripción</v-col>
          <v-col cols="1" class="text-end">
            <v-btn @click="cerrarFormulario()" density="compact" variant="plain" color="white" icon="mdi-close"></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-form @submit.prevent="enviarFormulario">
        <v-card-text>
          <v-row>
            <v-col cols="12" class="pb-0" v-if="form.id === null">
              <v-autocomplete
                density="compact"
                v-model="form.estudianteId"
                label="Matrícula"
                variant="outlined"
                :error="errores.estudianteId.length > 0"
                :error-messages="errores.estudianteId.length ? errores.estudianteId[0] : ''"
                :items="estudiantes"
                item-title="matricula"
                item-value="id"
                @update:model-value="seleccionarEstudiante"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="pb-0" v-else>
              <v-text-field
                density="compact"
                label="Matrícula"
                variant="outlined"
                :model-value="form.estudiante.matricula"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                density="compact"
                label="Nombre"
                variant="outlined"
                :model-value="[persona.apellidoPaterno, persona.apellidoMaterno, persona.nombre].join(' ')"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-select
                density="compact"
                v-model="form.tipoEstudianteId"
                label="Tipo de Estudiante"
                variant="outlined"
                :error="errores.tipoEstudianteId.length > 0"
                :error-messages="errores.tipoEstudianteId.length ? errores.tipoEstudianteId[0] : ''"
                :items="tiposEstudiante"
                item-title="nombre"
                item-value="id"
              ></v-select>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                density="compact"
                v-model="form.descuentoPorcentaje"
                label="Descuento [%]"
                variant="outlined"
                :error="errores.descuentoPorcentaje.length > 0"
                :error-messages="errores.descuentoPorcentaje.length ? errores.descuentoPorcentaje[0] : ''"
                type="number"
                step="1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
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
            <v-col cols="12" class="pb-0">
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
            <v-col cols="12" class="pb-0">
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
            <v-col cols="12" class="pb-0">
              <v-autocomplete
                density="compact"
                v-model="form.filialId"
                label="Traspaso desde"
                variant="outlined"
                :error="errores.filialId.length > 0"
                :error-messages="errores.filialId.length ? errores.filialId[0] : ''"
                :items="filiales"
                item-title="nombre"
                item-value="id"
                :disabled="!form.traspaso"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row class="mb-4" dense>
            <v-col cols="12" md="6" class="pb-0">
              <v-btn
                type="submit"
                color="success"
                prepend-icon="mdi-check-bold"
                block
                variant="flat"
              >Guardar</v-btn>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-btn
                @click="cerrarFormulario()"
                color="error"
                prepend-icon="mdi-close-thick"
                block
                variant="flat"
              >Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, inject, toRefs } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const store = useAppStore()
const { alerta } = store
const { cargando, selectorSiNo } = storeToRefs(store)

const emit = defineEmits(['inscrito'])
const props = defineProps({
  curso: {
    type: Object,
    default: {
      id: null,
      nombre: '',
      idioma: {
        nombre: '',
      },
      modalidad: {
        nombre: '',
      },
    },
  },
})
const { curso } = toRefs(props)
const abrir = ref(false)
const libros = ref([])
const errores = ref({
  deposito: [],
  numeroDeposito: [],
  traspaso: [],
  filialId: [],
  estudianteId: [],
  tipoEstudianteId: [],
  descuentoPorcentaje: [],
})
const form = ref({
  id: null,
  deposito: true,
  numeroDeposito: null,
  traspaso: false,
  filialId: null,
  estudianteId: null,
  tipoEstudianteId: null,
  descuentoPorcentaje: null,
  estudiante: {
    matricula: null,
  },
})
const estudiantes = ref([])
const tiposEstudiante = ref([])
const filiales = ref([])
const persona = ref({
  nombre: 'matrícula',
  apellidoPaterno: 'Seleccione',
  apellidoMaterno: 'una',
  cedula: null,
  cedulaComplemento: null,
  ciudad: {
    codigo: null,
  },
})

const cerrarFormulario = function() {
  form.value = {
    id: null,
    deposito: true,
    numeroDeposito: null,
    traspaso: false,
    filialId: null,
    estudianteId: null,
    tipoEstudianteId: null,
    descuentoPorcentaje: null,
    estudiante: {
      matricula: null,
    },
  }
  persona.value = {
    nombre: 'matrícula',
    apellidoPaterno: 'Seleccione',
    apellidoMaterno: 'una',
    cedula: null,
    cedulaComplemento: null,
    ciudad: {
      codigo: null,
    },
  }
  abrir.value = false
}

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response
    if (form.value.id !== null) {
      response = await axios.put(`/cursos/${curso.value.id}/inscripciones/${form.value.id}`, form.value)
    } else {
      response = await axios.post(`/cursos/${curso.value.id}/inscripciones`, form.value)
    }
    alerta(response.data.message)
    emit('inscrito')
    cerrarFormulario()
  } catch (error) {
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
    if (form.value.id !== null) {
      const response = await axios.get(`/cursos/${curso.value.id}/inscripciones/${form.value.id}`)
      form.value = response.data.payload
      persona.value = response.data.payload.estudiante.persona
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

const getEstudiantes = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/cursos/${curso.value.id}/estudiantes`)
    estudiantes.value = response.data.payload
  } catch(error) {
    alert(error.response.data.message, true)
    cerrarFormulario()
  } finally {
    getTiposEstudiante()
  }
}

const getTiposEstudiante = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/tipos_estudiante`, {
      params: {
        combo: true,
      },
    })
    tiposEstudiante.value = response.data.payload
  } catch(error) {
    alert(error.response.data.message, true)
    cerrarFormulario()
  } finally {
    getFiliales()
  }
}

const getFiliales = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/filiales`, {
      params: {
        combo: true,
      },
    })
    filiales.value = response.data.payload
  } catch(error) {
    alert(error.response.data.message, true)
    cerrarFormulario()
  } finally {
    getDatos()
  }
}

const abrirModal = function(idiomaId, nivelId = null) {
  abrir.value = true
  form.value.id = nivelId
  form.value.idiomaId = idiomaId
  getEstudiantes()
}

const seleccionarEstudiante = function(id) {
  if (id !== '' && id !== null) {
    const estudiante = estudiantes.value.find(o => o.id == id)
    persona.value = estudiante.persona
    form.value.tipoEstudianteId = estudiante.tipoEstudianteId
    form.value.descuentoPorcentaje = estudiante.tipoEstudiante.descuento
  }
}

const seleccionarTraspaso = function(valor) {
  if (valor === false) {
    form.value.filialId = null
  }
}

const seleccionarDeposito = function(valor) {
  if (valor === false) {
    form.value.numeroDeposito = null
  }
}

defineExpose({ abrirModal })

</script>
