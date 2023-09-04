<template>
  <v-app :style="{ backgroundImage: `url(${fondoImg})`, backgroundSize: 'cover' }">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align-content="center" align="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-sheet elevation="4" rounded="xl" class="px-sm-8" style="background: rgba(239,239,239,0.85);">
              <v-row>
                <v-col cols="6" class="py-10 pr-5">
                  <v-img
                    width="100%"
                    cover
                    :src="logoImg"
                  ></v-img>
                </v-col>
                <v-col cols="6">
                  <div class="text-center text-h4 mb-3">Recuperación de Contraseña</div>
                  <v-form @submit.prevent="onSubmit">
                    <v-text-field
                      v-model="form.password"
                      label="Nueva contraseña"
                      variant="underlined"
                      type="password"
                      prepend-inner-icon="mdi-lock"
                      :error="errores.password.length > 0"
                      :error-messages="errores.password.length ? errores.password[0] : ''"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.passwordConfirmacion"
                      label="Confirmación de la nueva contraseña"
                      variant="underlined"
                      type="password"
                      prepend-inner-icon="mdi-lock-outline"
                      :error="errores.passwordConfirmacion.length > 0"
                      :error-messages="errores.passwordConfirmacion.length ? errores.passwordConfirmacion[0] : ''"
                      required
                    ></v-text-field>
                    <v-btn
                      type="submit"
                      class="mt-2"
                      color="primary"
                      block
                    >Enviar</v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
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
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import fondoImg from '@/assets/fondo.svg'
import logoImg from '@/assets/logo.png'

const axios = inject('axios')
const router = useRouter()
const route = useRoute()
const store = useAppStore()
const { cargando, token, usuario } = storeToRefs(store)
const { login } = store

const errores = ref({
  password: [],
  passwordConfirmacion: [],
})
const form = ref({
  password: null,
  passwordConfirmacion: null,
})

const onSubmit = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    const response = await axios.post('reset_password', {
      ...form.value,
      nombre: route.query.u,
      resetPasswordToken: route.query.q,
    })
    login(response.data.payload)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    router.replace({ name: 'Inicio' })
  } catch(error) {
    Object.keys(error.response.data.errors).forEach((key) => {
      errores.value[key] = error.response.data.errors[key]
    })
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  if (usuario.value.autenticado) {
    router.replace({ name: 'Inicio' })
  } else {
    if (!route.query.u || !route.query.q) {
      router.replace({ name: 'Login' })
    }
  }
})

</script>
