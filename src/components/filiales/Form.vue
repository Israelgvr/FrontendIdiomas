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
                  Datos de la Filial
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="3" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.codigo"
                        label="Código"
                        variant="outlined"
                        :error="errores.codigo.length > 0"
                        :error-messages="errores.codigo.length ? errores.codigo[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="7" lg="8" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.nombre"
                        label="Nombre"
                        variant="outlined"
                        :error="errores.nombre.length > 0"
                        :error-messages="errores.nombre.length ? errores.nombre[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" lg="1" class="pb-0">
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
                    <v-col cols="12" md="5" lg="2" class="pb-0">
                      <v-select
                        density="compact"
                        v-model="form.ciudadId"
                        label="Ciudad"
                        variant="outlined"
                        :error="errores.ciudadId.length > 0"
                        :error-messages="errores.ciudadId.length ? errores.ciudadId[0] : ''"
                        :items="ciudades"
                        item-title="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="7" lg="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.localidad"
                        label="Localidad"
                        variant="outlined"
                        :error="errores.localidad.length > 0"
                        :error-messages="errores.localidad.length ? errores.localidad[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.direccion"
                        label="Dirección"
                        variant="outlined"
                        :error="errores.direccion.length > 0"
                        :error-messages="errores.direccion.length ? errores.direccion[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
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
                    <v-col cols="12" md="6" class="pb-0">
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
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.enlaceWhatsApp"
                        label="Enlace de WhatsApp"
                        variant="outlined"
                        :error="errores.enlaceWhatsApp.length > 0"
                        :error-messages="errores.enlaceWhatsApp.length ? errores.enlaceWhatsApp[0] : ''"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon icon="mdi-whatsapp" color="green"></v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.enlaceFacebook"
                        label="Enlace de Facebook"
                        variant="outlined"
                        :error="errores.enlaceFacebook.length > 0"
                        :error-messages="errores.enlaceFacebook.length ? errores.enlaceFacebook[0] : ''"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon icon="mdi-facebook" color="blue"></v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.enlaceYouTube"
                        label="Enlace de YouTube"
                        variant="outlined"
                        :error="errores.enlaceYouTube.length > 0"
                        :error-messages="errores.enlaceYouTube.length ? errores.enlaceYouTube[0] : ''"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon icon="mdi-youtube" color="red"></v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.enlaceInstagram"
                        label="Enlace de Instagram"
                        variant="outlined"
                        :error="errores.enlaceInstagram.length > 0"
                        :error-messages="errores.enlaceInstagram.length ? errores.enlaceInstagram[0] : ''"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon icon="mdi-instagram" color="orange"></v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.enlaceTikTok"
                        label="Enlace de TikTok"
                        variant="outlined"
                        :error="errores.enlaceTikTok.length > 0"
                        :error-messages="errores.enlaceTikTok.length ? errores.enlaceTikTok[0] : ''"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon icon="mdi-music-note" color="black"></v-icon>
                        </template>
                      </v-text-field>
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
                :to="{ name: 'FilialesIndex' }"
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
    text: 'Filiales',
    to: { name: 'FilialesIndex' },
    disabled: false,
  }, {
    text: route.params.id != '0' ? 'Editar' : 'Nueva',
    to: { name: 'FilialesForm', params: { id: route.params.id } },
    disabled: false,
  },
]

const errores = ref({
  codigo: [],
  nombre: [],
  ciudadId: [],
  localidad: [],
  direccion: [],
  celular: [],
  telefono: [],
  posicion: [],
  enlaceWhatsApp: [],
  enlaceFacebook: [],
  enlaceYouTube: [],
  enlaceInstagram: [],
  enlaceTikTok: [],
})
const form = ref({
  id: null,
  codigo: null,
  nombre: null,
  ciudadId: null,
  localidad: null,
  direccion: null,
  celular: null,
  telefono: null,
  posicion: 0,
  enlaceWhatsApp: null,
  enlaceFacebook: null,
  enlaceYouTube: null,
  enlaceInstagram: null,
  enlaceTikTok: null,
})
const ciudades = ref([])

const enviarFormulario = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response
    if (form.value.id !== null) {
      response = await axios.put(`/filiales/${form.value.id}`, form.value)
    } else {
      response = await axios.post('/filiales', form.value)
    }
    alerta(response.data.message)
    router.push({ name: 'FilialesIndex' })
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
      const response = await axios.get(`/filiales/${route.params.id}`)
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
  getCiudades()
})

</script>
