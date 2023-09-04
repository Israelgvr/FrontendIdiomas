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
                    <v-col cols="12" md="6" lg="3" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.idiomaId"
                        label="Idioma"
                        variant="outlined"
                        :items="idiomas"
                        item-title="nombre"
                        item-value="id"
                        @update:modelValue="getNiveles"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" lg="3" class="pb-0">
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
                    <v-col cols="12" md="6" lg="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.horaInicial"
                        label="Hora Inicial"
                        variant="outlined"
                        :error="errores.horaInicial.length > 0"
                        :error-messages="errores.horaInicial.length ? errores.horaInicial[0] : ''"
                        type="time"
                        step="1"
                        hint="En formato de 24 horas"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.horaFinal"
                        label="Hora Final"
                        variant="outlined"
                        :error="errores.horaFinal.length > 0"
                        :error-messages="errores.horaFinal.length ? errores.horaFinal[0] : ''"
                        type="time"
                        step="1"
                        hint="En formato de 24 horas"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.niveles"
                        label="Niveles"
                        variant="outlined"
                        chips
                        multiple
                        :items="niveles"
                        item-title="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" lg="4" xl="5" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.nombre"
                        label="Nombre"
                        variant="outlined"
                        :error="errores.nombre.length > 0"
                        :error-messages="errores.nombre.length ? errores.nombre[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" xl="1" class="pb-0">
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
                :to="{ name: 'CursosIndex' }"
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
const { cargando, filial, selectorSiNo } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Cursos',
    to: { name: 'CursosIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nuevo',
    to: { name: 'CursosForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const idiomas = ref([])
const modalidades = ref([])
const niveles = ref([])
const errores = ref({
  nombre: [],
  idiomaId: [],
  modalidadId: [],
  horaInicial: [],
  horaFinal: [],
  niveles: [],
  activo: [],
})
const form = ref({
  id: null,
  nombre: null,
  idiomaId: null,
  modalidadId: null,
  horaInicial: null,
  horaFinal: null,
  niveles: [],
  activo: true,
})

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response
    if (form.value.id !== null) {
      response = await axios.put(`/cursos/${form.value.id}`, {
        ...form.value,
        filialId: filial.value.id,
      })
    } else {
      response = await axios.post('/cursos', {
        ...form.value,
        filialId: filial.value.id,
      })
    }
    alerta(response.data.message)
    router.push({ name: 'CursosIndex' })
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
      const response = await axios.get(`/cursos/${route.params.id}`)
      response.data.payload.niveles = response.data.payload.niveles.map(o => o.id)
      form.value = response.data.payload
      getNiveles(form.value.idiomaId)
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
    form.value.niveles = []
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
    getDatos()
  }
}

const getNiveles = async function(id) {
  try {
    cargando.value = true
    const response = await axios.get(`/idiomas/${id}/niveles`)
    niveles.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  getIdiomas()
})

</script>
