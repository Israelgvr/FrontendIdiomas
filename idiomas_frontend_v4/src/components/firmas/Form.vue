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
                <v-card-text>
                  <v-row v-for="(item, idx) in items">
                    <v-col cols="12" sm="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="items[idx].nombre"
                        :label="`Nombre ${idx+1}`"
                        variant="outlined"
                        :error="errores[idx].nombre.length > 0"
                        :error-messages="errores[idx].nombre.length ? errores[idx].nombre[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="items[idx].cargo"
                        :label="`Cargo ${idx+1}`"
                        variant="outlined"
                        :error="errores[idx].cargo.length > 0"
                        :error-messages="errores[idx].cargo.length ? errores[idx].cargo[0] : ''"
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
          </v-row>
        </v-form>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const store = useAppStore()
const { alerta } = store
const { cargando, filial } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Pie de Firma',
    to: { name: 'FirmasForm' },
    disabled: false,
  },
]

const errores = ref([
  {
    nombre: [],
    cargo: [],
  }, {
    nombre: [],
    cargo: [],
  }, {
    nombre: [],
    cargo: [],
  },
])
const items = ref([
  {
    id: null,
    nombre: null,
    cargo: null,
    posicion: 0,
  }, {
    id: null,
    nombre: null,
    cargo: null,
    posicion: 0,
  }, {
    id: null,
    nombre: null,
    cargo: null,
    posicion: 0,
  },
])

const enviarFormulario = async function() {
  cargando.value = true
  let idx = 0
  for await (const item of items.value) {
    const error = await enviarFirma(item, idx)
    if (error) {
      alerta('Error al actualizar los registros', true)
      break
    } else {
      idx = idx + 1
    }
  }
  alerta('Registros actualizados')
  cargando.value = false
}

const enviarFirma = async function(item, idx) {
  try {
    Object.keys(errores.value[idx]).forEach((key) => {
      errores.value[idx][key] = []
    })
    await axios.put(`/firmas/${item.id}`, {
      ...item,
      filialId: filial.value.id,
    })
    return false
  } catch(error) {
    Object.keys(error.response.data.errors).forEach((key) => {
      errores.value[idx][key] = error.response.data.errors[key]
    })
    return true
  }
}

const getDatos = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`/firmas`, {
      params: {
        combo: true,
        filialId: filial.value.id,
      },
    })
    items.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  getDatos()
})

</script>
