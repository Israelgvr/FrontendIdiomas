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
                  Datos del Libro
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="3" lg="2" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.idiomaId"
                        label="Idioma"
                        variant="outlined"
                        :error="errores.idiomaId.length > 0"
                        :error-messages="errores.idiomaId.length ? errores.idiomaId[0] : ''"
                        :items="idiomas"
                        item-title="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="3" lg="2" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.codigo"
                        label="Código"
                        variant="outlined"
                        :error="errores.codigo.length > 0"
                        :error-messages="errores.codigo.length ? errores.codigo[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.nombre"
                        label="Nombre"
                        variant="outlined"
                        :error="errores.nombre.length > 0"
                        :error-messages="errores.nombre.length ? errores.nombre[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.editorial"
                        label="Editorial"
                        variant="outlined"
                        :error="errores.editorial.length > 0"
                        :error-messages="errores.editorial.length ? errores.editorial[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="5" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.edicion"
                        label="Edición"
                        variant="outlined"
                        :error="errores.edicion.length > 0"
                        :error-messages="errores.edicion.length ? errores.edicion[0] : ''"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="9" lg="5" class="pb-0">
                      <v-file-input
                        density="compact"
                        v-model="imagen"
                        label="Imagen"
                        variant="outlined"
                        :error="errores.imagen.length > 0"
                        :error-messages="errores.imagen.length ? errores.imagen[0] : ''"
                        prepend-icon=""
                        prepend-inner-icon="mdi-image-area"
                        accept="image/png,image/gif,image/jpeg,image/svg+xml"
                        :multiple="false"
                        show-size
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" md="3" lg="2" class="pb-0 text-center">
                      <v-img
                        v-if="imagenActual != null"
                        class="mx-auto"
                        height="150"
                        max-height="150"
                        :src="imagenActual"
                      ></v-img>
                      <v-icon v-else size="60">
                        mdi-image-broken
                      </v-icon>
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
                :to="{ name: 'LibrosIndex' }"
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
import { inject, ref, onMounted, watch } from 'vue'
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
    text: 'Libros',
    to: { name: 'LibrosIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nuevo',
    to: { name: 'LibrosForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const errores = ref({
  codigo: [],
  nombre: [],
  editorial: [],
  edicion: [],
  idiomaId: [],
  imagen: [],

})
const form = ref({
  id: null,
  codigo: null,
  nombre: null,
  editorial: null,
  edicion: null,
  stock: 0,
  idiomaId: null,
  imagen: null,
})
const url = import.meta.env.VITE_APP_URL
const imagen = ref(null)
const imagenActual = ref(null)
const idiomas = ref([])

watch(imagen, (dato) => {
  if (dato) {
    if (dato.length > 0) {
      form.value.imagen = dato[0]
      imagenActual.value = URL.createObjectURL(form.value.imagen)
    } else {
      form.value.imagen = null
    }
  } else {
    form.value.imagen = null
  }
})

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response
    if (form.value.id !== null) {
      response = await axios.put(`/libros/${form.value.id}`, {
        ...form.value,
        filialId: filial.value.id,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      response = await axios.post('/libros', {
        ...form.value,
        filialId: filial.value.id,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
    alerta(response.data.message)
    router.push({ name: 'LibrosIndex' })
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
    if (route.params.id !== '0') {
      const response = await axios.get(`/libros/${route.params.id}`, {
        params: {
          filialId: filial.value.id,
        },
      })
      form.value = response.data.payload
    } else {
      form.value.id = null
    }
    if (form.value.imagen) {
      imagenActual.value = await `${url}/uploads/libros/${form.value.imagen}`
    }
    form.value.imagen = null
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
    getDatos()
  }
}

onMounted(() => {
  getIdiomas()
})

</script>
