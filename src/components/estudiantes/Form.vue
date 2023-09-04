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
                  Datos del Estudiante
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="5" lg="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.matricula"
                        label="Matrícula"
                        variant="outlined"
                        :error="errores.matricula.length > 0"
                        :error-messages="errores.matricula.length ? errores.matricula[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="5" class="pb-0">
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
                        :hint="descuentoPorcentaje"
                        persistent-hint
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="2" lg="1" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.activo"
                        label="Activo"
                        variant="outlined"
                        :error="errores.activo.length > 0"
                        :error-messages="errores.activo.length ? errores.activo[0] : ''"
                        :items="selectorSiNo"
                        item-title="codigo"
                        item-value="id"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card variant="outlined">
                <v-card-title>
                  Datos personales
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.nombre"
                        label="Nombre(s)"
                        variant="outlined"
                        :error="errores.nombre.length > 0"
                        :error-messages="errores.nombre.length ? errores.nombre[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.apellidoPaterno"
                        label="Apellido Paterno"
                        variant="outlined"
                        :error="errores.apellidoPaterno.length > 0"
                        :error-messages="errores.apellidoPaterno.length ? errores.apellidoPaterno[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.apellidoMaterno"
                        label="Apellido Materno"
                        variant="outlined"
                        :error="errores.apellidoMaterno.length > 0"
                        :error-messages="errores.apellidoMaterno.length ? errores.apellidoMaterno[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.cedula"
                        label="Cédula de Identidad"
                        variant="outlined"
                        :error="errores.cedula.length > 0"
                        :error-messages="errores.cedula.length ? errores.cedula[0] : ''"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.cedulaComplemento"
                        label="Complemento"
                        variant="outlined"
                        :error="errores.cedulaComplemento.length > 0"
                        :error-messages="errores.cedulaComplemento.length ? errores.cedulaComplemento[0] : ''"
                        clearable
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.ciudadId"
                        label="Expedición"
                        variant="outlined"
                        :error="errores.ciudadId.length > 0"
                        :error-messages="errores.ciudadId.length ? errores.ciudadId[0] : ''"
                        :items="ciudades"
                        item-title="codigo"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" lg="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.fechaNacimiento"
                        label="Fecha de Nacimiento"
                        variant="outlined"
                        :error="errores.fechaNacimiento.length > 0"
                        :error-messages="errores.fechaNacimiento.length ? errores.fechaNacimiento[0] : ''"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.email"
                        label="Email"
                        variant="outlined"
                        :error="errores.email.length > 0"
                        :error-messages="errores.email.length ? errores.email[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.celular"
                        label="Celular"
                        variant="outlined"
                        :error="errores.celular.length > 0"
                        :error-messages="errores.celular.length ? errores.celular[0] : ''"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.telefono"
                        label="Teléfono"
                        variant="outlined"
                        :error="errores.telefono.length > 0"
                        :error-messages="errores.telefono.length ? errores.telefono[0] : ''"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.gestionDiploma"
                        label="Año Bachillerato"
                        variant="outlined"
                        :error="errores.gestionDiploma.length > 0"
                        :error-messages="errores.gestionDiploma.length ? errores.gestionDiploma[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="pb-0">
                      <v-combobox
                        density="compact"
                        v-model="form.nacionalidad"
                        label="Nacionalidad"
                        variant="outlined"
                        :error="errores.nacionalidad.length > 0"
                        :error-messages="errores.nacionalidad.length ? errores.nacionalidad[0] : ''"
                        :items="nacionalidades"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.direccion"
                        label="Dirección"
                        variant="outlined"
                        :error="errores.direccion.length > 0"
                        :error-messages="errores.direccion.length ? errores.direccion[0] : ''"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" v-if="militar">
              <v-card variant="outlined">
                <v-card-title>
                  Datos Militares
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.fuerzaId"
                        label="FF.AA."
                        variant="outlined"
                        :error="errores.fuerzaId.length > 0"
                        :error-messages="errores.fuerzaId.length ? errores.fuerzaId[0] : ''"
                        :items="fuerzas"
                        item-title="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.carnetCossmil"
                        label="Carnet COSSMIL"
                        variant="outlined"
                        :error="errores.carnetCossmil.length > 0"
                        :error-messages="errores.carnetCossmil.length ? errores.carnetCossmil[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.carnetMilitar"
                        label="Carnet Militar"
                        variant="outlined"
                        :error="errores.carnetMilitar.length > 0"
                        :error-messages="errores.carnetMilitar.length ? errores.carnetMilitar[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-combobox
                        density="compact"
                        v-model="form.grado"
                        label="Grado"
                        variant="outlined"
                        :error="errores.grado.length > 0"
                        :error-messages="errores.grado.length ? errores.grado[0] : ''"
                        :items="grados"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="2" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.gestionEgreso"
                        label="Año Egreso"
                        variant="outlined"
                        :error="errores.gestionEgreso.length > 0"
                        :error-messages="errores.gestionEgreso.length ? errores.gestionEgreso[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.destinoActual"
                        label="Destino Actual"
                        variant="outlined"
                        :error="errores.destinoActual.length > 0"
                        :error-messages="errores.destinoActual.length ? errores.destinoActual[0] : ''"
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
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.contactoNombre"
                        label="Nombre"
                        variant="outlined"
                        :error="errores.contactoNombre.length > 0"
                        :error-messages="errores.contactoNombre.length ? errores.contactoNombre[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.contactoCelular"
                        label="Celular"
                        variant="outlined"
                        :error="errores.contactoCelular.length > 0"
                        :error-messages="errores.contactoCelular.length ? errores.contactoCelular[0] : ''"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.contactoTelefono"
                        label="Teléfono"
                        variant="outlined"
                        :error="errores.contactoTelefono.length > 0"
                        :error-messages="errores.contactoTelefono.length ? errores.contactoTelefono[0] : ''"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" class="pb-0">
                      <v-autocomplete
                        density="compact"
                        v-model="form.parentescoId"
                        label="Parentesco"
                        variant="outlined"
                        :error="errores.contactoTelefono.length > 0"
                        :error-messages="errores.parentescoId.length ? errores.parentescoId[0] : ''"
                        :items="parentescos"
                        item-title="nombre"
                        item-value="id"
                        clearable
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="5" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.contactoCarnetCossmil"
                        label="Carnet COSSMIL"
                        variant="outlined"
                        :error="errores.contactoCarnetCossmil.length > 0"
                        :error-messages="errores.contactoCarnetCossmil.length ? errores.contactoCarnetCossmil[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.contactoCarnetMilitar"
                        label="Carnet Militar"
                        variant="outlined"
                        :error="errores.contactoCarnetMilitar.length > 0"
                        :error-messages="errores.contactoCarnetMilitar.length ? errores.contactoCarnetMilitar[0] : ''"
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
                :to="{ name: 'EstudiantesIndex' }"
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
    text: 'Estudiantes',
    to: { name: 'EstudiantesIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nuevo',
    to: { name: 'EstudiantesForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const errores = ref({
  matricula: [],
  tipoEstudianteId: [],
  activo: [],
  nombre: [],
  apellidoPaterno: [],
  apellidoMaterno: [],
  email: [],
  cedula: [],
  cedulaComplemento: [],
  ciudadId: [],
  celular: [],
  telefono: [],
  fechaNacimiento: [],
  carnetCossmil: [],
  carnetMilitar: [],
  fuerzaId: [],
  grado: [],
  gestionDiploma: [],
  gestionEgreso: [],
  nacionalidad: [],
  destinoActual: [],
  direccion: [],
  contactoNombre: [],
  contactoCelular: [],
  contactoTelefono: [],
  contactoCarnetCossmil: [],
  contactoCarnetMilitar: [],
  parentescoId: [],
})
const form = ref({
  id: null,
  matricula: null,
  tipoEstudianteId: null,
  activo: true,
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
  carnetCossmil: null,
  carnetMilitar: null,
  fuerzaId: null,
  grado: null,
  gestionDiploma: null,
  gestionEgreso: null,
  nacionalidad: null,
  destinoActual: null,
  direccion: null,
  contactoNombre: null,
  contactoCelular: null,
  contactoTelefono: null,
  contactoCarnetCossmil: null,
  contactoCarnetMilitar: null,
  parentescoId: null,
})
const ciudades = ref([])
const parentescos = ref([])
const nacionalidades = ref([])
const grados = ref([])
const tiposEstudiante = ref([])
const fuerzas = ref([])

const descuentoPorcentaje = computed({
  get() {
    if (form.value.tipoEstudianteId > 0) {
      return `Descuento: ${tiposEstudiante.value.find(o => o.id == form.value.tipoEstudianteId).descuentoPorcentaje}%`
    } else {
      return ''
    }
  },
})

const militar = computed({
  get() {
    if (tiposEstudiante.value.length > 0 && form.value.tipoEstudianteId !== null) {
      return tiposEstudiante.value.find(o => o.id == form.value.tipoEstudianteId).militar
    } else {
      return false
    }
  },
})

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    if (militar.value) {
      form.value.contactoCarnetCossmil = null
      form.value.contactoCarnetMilitar = null
      form.value.contactoCelular = null
      form.value.contactoNombre = null
      form.value.contactoTelefono = null
      form.value.parentescoId = null
    } else {
      form.value.fuerzaId = null
      form.value.carnetCossmil = null
      form.value.carnetMilitar = null
      form.value.grado = null
      form.value.gestionEgreso = null
      form.value.destinoActual = null
    }
    let response
    if (form.value.id !== null) {
      response = await axios.put(`/estudiantes/${form.value.id}`, {
        ...form.value,
        filialId: filial.value.id,
      })
    } else {
      response = await axios.post('/estudiantes', {
        ...form.value,
        filialId: filial.value.id,
      })
    }
    alerta(response.data.message)
    router.push({ name: 'EstudiantesIndex' })
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
      const response = await axios.get(`/estudiantes/${route.params.id}`)
      form.value.id = response.data.payload.id
      form.value.matricula = response.data.payload.matricula
      form.value.tipoEstudianteId = response.data.payload.tipoEstudianteId
      form.value.activo = response.data.payload.activo
      form.value.nombre = response.data.payload.persona.nombre
      form.value.apellidoPaterno = response.data.payload.persona.apellidoPaterno
      form.value.apellidoMaterno = response.data.payload.persona.apellidoMaterno
      form.value.email = response.data.payload.persona.email
      form.value.cedula = response.data.payload.persona.cedula
      form.value.cedulaComplemento = response.data.payload.persona.cedulaComplemento
      form.value.ciudadId = response.data.payload.persona.ciudadId
      form.value.celular = response.data.payload.persona.celular
      form.value.telefono = response.data.payload.persona.telefono
      form.value.fechaNacimiento = response.data.payload.persona.fechaNacimiento
      form.value.carnetCossmil = response.data.payload.persona.carnetCossmil
      form.value.carnetMilitar = response.data.payload.persona.carnetMilitar
      form.value.fuerzaId = response.data.payload.fuerzaId
      form.value.grado = response.data.payload.persona.grado
      form.value.gestionDiploma = response.data.payload.persona.gestionDiploma
      form.value.gestionEgreso = response.data.payload.persona.gestionEgreso
      form.value.nacionalidad = response.data.payload.persona.nacionalidad
      form.value.destinoActual = response.data.payload.persona.destinoActual
      form.value.direccion = response.data.payload.persona.direccion
      form.value.contactoNombre = response.data.payload.persona.contactoNombre
      form.value.contactoCelular = response.data.payload.persona.contactoCelular
      form.value.contactoTelefono = response.data.payload.persona.contactoTelefono
      form.value.contactoCarnetCossmil = response.data.payload.persona.contactoCarnetCossmil
      form.value.contactoCarnetMilitar = response.data.payload.persona.contactoCarnetMilitar
      form.value.parentescoId = response.data.payload.persona.parentescoId
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

const getNacionalidades = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/nacionalidades`)
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
    const response = await axios.get(`/grados`)
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
    const response = await axios.get(`/parentescos`, {
      params: {
        combo: true,
      },
    })
    parentescos.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getCiudades()
  }
}

const getCiudades = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/ciudades`, {
      params: {
        combo: true,
      },
    })
    ciudades.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
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
    const response = await axios.get(`/fuerzas`, {
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

onMounted(() => {
  getNacionalidades()
})

</script>
