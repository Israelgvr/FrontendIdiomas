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
                  Datos del Rol
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="9" md="9" lg="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.nombre"
                        label="Nombre"
                        variant="outlined"
                        :error="errores.nombre.length > 0"
                        :error-messages="errores.nombre.length ? errores.nombre[0] : ''"
                        :readonly="isAdmin"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="2" xl="1" class="pb-0">
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
                    <v-col cols="12" lg="6" xl="7" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.modulos"
                        label="Permisos"
                        variant="outlined"
                        :error="errores.modulos.length > 0"
                        :error-messages="errores.modulos.length ? errores.modulos[0] : ''"
                        multiple
                        chips
                        :items="modulos"
                        item-title="nombre"
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
                :to="{ name: 'RolesIndex' }"
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
const { cargando } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Roles',
    to: { name: 'RolesIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nuevo',
    to: { name: 'RolesForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const errores = ref({
  nombre: [],
  posicion: [],
  modulos: [],
})
const form = ref({
  id: null,
  nombre: null,
  posicion: 0,
  modulos: [],
})
const modulos = ref([])
const isAdmin = computed(() => {
  if (form.value.id !== null) {
    if (form.value.nombre === 'ADMINISTRADOR') {
      return true
    } else {
      return false
    }
  } else {
    return false
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
      response = await axios.put(`/roles/${form.value.id}`, form.value)
    } else {
      response = await axios.post('/roles', form.value)
    }
    alerta(response.data.message)
    router.push({ name: 'RolesIndex' })
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
      const response = await axios.get(`/roles/${route.params.id}`)
      response.data.payload.modulos = response.data.payload.modulos.map(o => o.id)
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

const getModulos = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/modulos`, {
      params: {
        combo: true,
      },
    })
    modulos.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getDatos()
  }
}

onMounted(() => {
  getModulos()
})

</script>
