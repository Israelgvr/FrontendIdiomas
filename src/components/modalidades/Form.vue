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
                  Datos de la Modalidad
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="9" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.nombre"
                        label="Nombre"
                        variant="outlined"
                        :error="errores.nombre.length > 0"
                        :error-messages="errores.nombre.length ? errores.nombre[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.posicion"
                        label="Posición"
                        variant="outlined"
                        :error="errores.posicion.length > 0"
                        :error-messages="errores.posicion.length ? errores.posicion[0] : ''"
                        type="number"
                        step="1"
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
                :to="{ name: 'ModalidadesIndex' }"
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
const { cargando } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Modalidades',
    to: { name: 'ModalidadesIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nueva',
    to: { name: 'ModalidadesForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const errores = ref({
  nombre: [],
  posicion: [],
})
const form = ref({
  id: null,
  nombre: null,
  posicion: 0,
})

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response
    if (form.value.id !== null) {
      response = await axios.put(`/modalidades/${form.value.id}`, form.value)
    } else {
      response = await axios.post('/modalidades', form.value)
    }
    alerta(response.data.message)
    router.push({ name: 'ModalidadesIndex' })
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
      const response = await axios.get(`/modalidades/${route.params.id}`)
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

onMounted(() => {
  getDatos()
})

</script>
