<template>
  <v-dialog
    v-model="abrir"
    persistent
    width="480"
  >
    <v-card>
      <v-card-title class="bg-indigo">
        <v-row justify="space-between" aligh="center" align-content="center" dense>
          <v-col cols="11">Datos del Nivel</v-col>
          <v-col cols="1" class="text-end">
            <v-btn @click="cerrarFormulario()" density="compact" variant="plain" color="white" icon="mdi-close"></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-form @submit.prevent="enviarFormulario">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" lg="3" class="pb-0">
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
            <v-col cols="12" md="8" lg="9" class="pb-0">
              <v-text-field
                density="compact"
                v-model="form.codigo"
                label="Código"
                variant="outlined"
                :error="errores.codigo.length > 0"
                :error-messages="errores.codigo.length ? errores.codigo[0] : ''"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                density="compact"
                v-model="form.nombre"
                label="Nombre"
                variant="outlined"
                :error="errores.nombre.length > 0"
                :error-messages="errores.nombre.length ? errores.nombre[0] : ''"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-select
                density="compact"
                v-model="form.libros"
                label="Libros"
                variant="outlined"
                :error="errores.libros.length > 0"
                :error-messages="errores.libros.length ? errores.libros[0] : ''"
                multiple
                chips
                :items="libros"
                item-title="nombre"
                item-value="id"
              ></v-select>
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
import { ref, inject } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const store = useAppStore()
const { alerta } = store
const { cargando, filial } = storeToRefs(store)

const emit = defineEmits(['enviado'])
const abrir = ref(false)
const libros = ref([])
const errores = ref({
  codigo: [],
  nombre: [],
  posicion: [],
  libros: [],
})
const form = ref({
  id: null,
  idiomaId: null,
  codigo: null,
  nombre: null,
  posicion: 0,
  libros: [],
})

const cerrarFormulario = function() {
  form.value = {
    id: null,
    idiomaId: null,
    codigo: null,
    nombre: null,
    posicion: 0,
    libros: [],
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
      response = await axios.put(`/idiomas/${form.value.idiomaId}/niveles/${form.value.id}`, form.value)
    } else {
      response = await axios.post(`/idiomas/${form.value.idiomaId}/niveles`, form.value)
    }
    alerta(response.data.message)
    emit('enviado')
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
      const response = await axios.get(`/idiomas/${form.value.idiomaId}/niveles/${form.value.id}`)
      response.data.payload.libros = response.data.payload.libros.map(o => o.id)
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

const getLibros = async function() {
  try {
    cargando.value = true
    const response = await axios.get('/libros', {
      params: {
        combo: true,
        idiomaId: form.value.idiomaId,
        filialId: filial.value.id,
      }
    })
    libros.value = response.data.payload
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
  getLibros()
}

defineExpose({ abrirModal })

</script>
