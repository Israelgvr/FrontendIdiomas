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
                <v-card-title class="pb-4">
                  Datos del Curso
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.idiomaId"
                        label="Idioma"
                        variant="outlined"
                        :items="idiomas"
                        item-title="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.modalidadId"
                        label="Modalidad"
                        variant="outlined"
                        :error="errores.modalidadId.length > 0"
                        :error-messages="errores.modalidadId.length ? errores.modalidadId[0] : ''"
                        clearable
                        :items="modalidades"
                        item-title="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card variant="outlined">
                <v-card-title class="pb-4">
                  Datos Personales
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
                    <v-col cols="12" md="6" lg="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.email"
                        label="Email"
                        variant="outlined"
                        :error="errores.email.length > 0"
                        :error-messages="errores.email.length ? errores.email[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="4" class="pb-0">
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
                    <v-col cols="12" md="6" lg="4" class="pb-0">
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
                :to="{ name: 'PreInscripcionesIndex' }"
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
import { inject, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const route = useRoute()
const router = useRouter()
const store = useAppStore()
const { alerta } = store
const { cargando, filial } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Pre-Inscripciones',
    to: { name: 'PreInscripcionesIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nuevo',
    to: { name: 'PreInscripcionesForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const ciudades = ref([])
const idiomas = ref([])
const modalidades = ref([])
const errores = ref({
  nombre: [],
  apellidoPaterno: [],
  apellidoMaterno: [],
  email: [],
  cedula: [],
  cedulaComplemento: [],
  ciudadId: [],
  celular: [],
  telefono: [],
  idiomaId: [],
  modalidadId: [],
})
const form = ref({
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
  idiomaId: null,
  modalidadId: null,
})

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response
    if (form.value.id !== null) {
      response = await axios.put(`/pre_inscripciones/${form.value.id}`, {
        ...form.value,
        filialId: filial.value.id,
      })
    } else {
      response = await axios.post('/pre_inscripciones', {
        ...form.value,
        filialId: filial.value.id,
      })
    }
    alerta(response.data.message)
    router.push({ name: 'PreInscripcionesIndex' })
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
      const response = await axios.get(`/pre_inscripciones/${route.params.id}`)
      form.value = response.data.payload
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
    const response = await axios.get(`/idiomas`, {
      params: {
        combo: true,
        filialId: filial.value.id,
      },
    })
    idiomas.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getModalidades()
  }
}

const getModalidades = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/modalidades`, {
      params: {
        combo: true,
      },
    })
    modalidades.value = response.data.payload
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
    getDatos()
  }
}

onMounted(() => {
  getIdiomas()
})

</script>
