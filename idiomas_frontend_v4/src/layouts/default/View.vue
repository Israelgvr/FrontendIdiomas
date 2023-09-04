<template>
  <v-main>
    <router-view />
    <v-overlay
      v-model="cargando"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="mostrarNotificacion"
      :color="errorNotificacion ? 'error' : 'success'"
      location="bottom"
      timeout="4000"
      rounded="pill"
    >
      {{ notificacion }}

      <template v-slot:actions>
        <v-btn
          color="orange-lighten-1"
          variant="plain"
          @click="mostrarNotificacion = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { cargando, notificacion, errorNotificacion, mostrarNotificacion } = storeToRefs(store)

</script>
