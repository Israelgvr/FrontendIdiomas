<template>
  <v-app-bar flat color="secondary">
    <v-app-bar-title>
      <div class="d-flex justify-start align-center">
        <div>
          <v-img
            width="80"
            height="50"
            max-height="50"
            :src="logoImg"
            class="mr-3"
          />
        </div>
        <router-link style="text-decoration: none; color: inherit;" class="d-flex justify-start align-center" :to="{ name: 'Inicio' }">
          {{ filial.nombre }}
        </router-link>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import logoImg from '@/assets/logo.png'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()

const { filial } = storeToRefs(store)

</script>
