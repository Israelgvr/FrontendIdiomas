<template>
  <v-container class="px-xl-16">
    <v-sheet>
      <v-container>
        <div class="text-h6 text-md-h5">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:title="{ item }">
              {{ item.text }}
            </template>
          </v-breadcrumbs>
        </div>
        <v-row>
          <v-col cols="12">
            <v-card variant="outlined">
              <v-card-title>
                Datos del usuario
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Usuario:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.nombre }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Rol:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.rol.nombre }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined">
              <v-card-title>
                Datos personales
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Nombre:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ [usuario.persona.nombre, usuario.persona.apellidoPaterno, usuario.persona.apellidoMaterno].join(' ') }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">C.I.:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="2" xl="1" class="pb-0">
                    <div class="font-weight-bold">{{ [usuario.persona.cedula, usuario.persona.cedulaComplemento, usuario.persona.ciudad.codigo].join(' ') }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="2" xl="2" class="pb-0">
                    <div class="text-right">Fecha de Nacimiento:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ $filters.fecha(usuario.persona.fechaNacimiento) }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Celular:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.persona.celular || '-' }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Teléfono:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="2" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.persona.telefono || '-' }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="2" xl="1" class="pb-0">
                    <div class="text-right">Email:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.persona.email || '-' }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined">
              <v-card-title>
                Datos del contacto
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Nombre:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.persona.contactoNombre }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Celular:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.persona.contactoCelular }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Teléfono:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.persona.contactoTelefono }}</div>
                  </v-col>
                  <v-col cols="3" md="2" lg="1" xl="1" class="pb-0">
                    <div class="text-right">Parentesco:</div>
                  </v-col>
                  <v-col cols="9" md="4" lg="3" xl="2" class="pb-0">
                    <div class="font-weight-bold">{{ usuario.persona.parentescoId ? usuario.persona.parentesco.nombre : '-' }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined">
              <v-card-title>
                Cambiar contraseña
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="onSubmit">
                  <v-row justify="end" dense>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.passwordAnterior"
                        label="Contraseña actual"
                        variant="outlined"
                        type="password"
                        :error="errores.passwordAnterior.length > 0"
                        :error-messages="errores.passwordAnterior.length ? errores.passwordAnterior[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.password"
                        label="Nueva contraseña"
                        variant="outlined"
                        type="password"
                        :error="errores.password.length > 0"
                        :error-messages="errores.password.length ? errores.password[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="pb-0">
                      <v-text-field
                        density="compact"
                        v-model="form.passwordConfirmacion"
                        label="Confirmación de la nueva contraseña"
                        variant="outlined"
                        type="password"
                        :error="errores.passwordConfirmacion.length > 0"
                        :error-messages="errores.passwordConfirmacion.length ? errores.passwordConfirmacion[0] : ''"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-btn
                        type="submit"
                        color="success"
                        prepend-icon="mdi-check-bold"
                        block
                      >Enviar</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const axios = inject('axios')
const store = useAppStore()
const { alerta } = store
const { cargando, usuario } = storeToRefs(store)

const breadcrumbs = [
  {
    text: 'Perfil',
    to: { name: 'Perfil' },
    disabled: false,
  },
]

const errores = ref({
  passwordAnterior: [],
  password: [],
  passwordConfirmacion: [],
})
const form = ref({
  passwordAnterior: null,
  password: null,
  passwordConfirmacion: null,
})

const onSubmit = async function() {
  try {
    cargando.value = true
    Object.keys(errores.value).forEach((key) => {
      errores.value[key] = []
    })
    let response = await axios.put(`perfil/${usuario.value.id}`, form.value)
    alerta(response.data.message)
    form.value = {
      passwordAnterior: null,
      password: null,
      passwordConfirmacion: null,
    }
  } catch(error) {
    Object.keys(error.response.data.errors).forEach((key) => {
      errores.value[key] = error.response.data.errors[key]
    })
  } finally {
    cargando.value = false
  }
}

</script>
