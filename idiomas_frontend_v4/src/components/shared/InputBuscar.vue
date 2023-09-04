<template>
  <v-text-field
    v-model="texto"
    label="Buscar"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    density="compact"
    clearable
    @update:modelValue="inputUpdated"
    @keyup.enter="(texto.length > 0) && emit('input', texto)"
    @keyup.esc="clearInput"
    single-line
    hide-details
  ></v-text-field>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import _ from 'lodash'

const emit = defineEmits(['input'])
const props = defineProps({
  longitud: {
    type: Number,
    default: 2
  },
})
const { longitud } = toRefs(props)
const texto = ref('')

const inputUpdated = _.debounce(function () {
  if (texto.value == null || texto.value.length >= longitud.value || texto.value.length == 0) {
    emit('input', texto.value)
  }
}, 500)

const clearInput = function () {
  texto.value = ''
  emit('input', texto.value)
}

</script>
