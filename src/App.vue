<template>
  <router-view />
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const router = useRouter()
const store = useAppStore()
const { logout } = store
const { cargando, usuario, filial } = storeToRefs(store)

const getDatos = async function() {
  try {
    cargando.value = true
    let response = await axios.get('me')
    if (filial.value.id !== null) {
      response.data.payload.filial = true
    } else {
      response.data.payload.filial = false
    }
    usuario.value = response.data.payload
  } catch {
    logout()
    router.replace({ name: 'Login' })
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  const href = window.location.href.split('/')
  if (href.length > 0) {
    const enlace = href[href.length - 1].toLowerCase().split('?')
    if (enlace[0].toLowerCase() !== 'recuperacion') {
      getDatos()
    }
  } else {
    getDatos()
  }
})
</script>
