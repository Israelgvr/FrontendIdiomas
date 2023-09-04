<template>
  <v-dialog
    v-model="modal.abrir"
    persistent
    width="auto"
  >
    <v-card>
      <v-card-title class="text-h6 bg-primary">
        ¿Seguro que desea eliminar el registro?
      </v-card-title>
      <v-card-text>
        Confirme para elminar {{ modal.titulo }} {{ modal.codigo }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          variant="flat"
          @click="onSubmit"
        >
          SI
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          @click="modal.abrir = false"
        >
          NO
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { inject, toRefs } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const store = useAppStore()
const { cargando } = storeToRefs(store)
const { alerta } = store

const emit = defineEmits(['eliminado'])
const props = defineProps({
  modal: {
    type: Object,
    default: {
      id: null,
      url: null,
      titulo: null,
      codigo: null,
      abrir: false,
    },
  },
})
const { modal } = toRefs(props)

const onSubmit = async function() {
  try {
    cargando.value = true
    const response = await axios.delete(`/${modal.value.url}/${modal.value.id}`)
    alerta(response.data.message)
    modal.value.abrir = false
    emit('eliminado')
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

</script>
