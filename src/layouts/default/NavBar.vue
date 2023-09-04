<template>
  <v-navigation-drawer
    color="secondary-darken-1"
    expand-on-hover
    rail
    permanent
    @update:rail="onHover"
  >
    <v-row justify="center" align-content="center" align="center" dense>
      <v-col cols="12" class="text-center px-3">
        <v-avatar
          color="grey"
          :size="hover ? 40 : 150"
          rounded="50"
          class="mx-auto"
        >
          <!-- <v-img cover :src="perfilMujerImg"></v-img> -->
          <v-icon
            icon="mdi-account-circle"
            :size="hover ? 40 : 165"
          ></v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="12" v-show="!hover">
        <div class="text-subtitle-2 text-center">Usuario:</div>
        <div class="text-subtitle-1 font-weight-bold text-center">{{ usuario.nombre }}</div>
        <div class="text-subtitle-2 text-center">{{ usuario.rol.nombre }}</div>
      </v-col>
      <v-col cols="12" v-show="!hover && usuario.filial">
        <div class="text-subtitle-2 text-center">Filial:</div>
        <div class="text-subtitle-1 font-weight-bold text-center">{{ filial.codigo }}</div>
      </v-col>
      <v-col cols="12" v-show="!hover">
        <v-list density="compact" nav>
          <v-list-item v-show="usuario.rol.nombre === 'ADMINISTRADOR'" prepend-icon="mdi-store-marker" title="Cambiar Filial" @click="cambiarFilial.abrirModal()"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box-outline" title="Perfil" :to="{ name: 'Perfil' }"></v-list-item>
          <v-list-item prepend-icon="mdi-power" title="Salir" @click="cerrarSesion"></v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-divider style="border-color: white;" thickness="2"></v-divider>
    <v-list density="compact" nav>
      <v-list-group v-show="permiso('PARAMETROS')">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-arrange-send-backward" title="Parámetros"></v-list-item>
        </template>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-map-marker" title="Departamentos" :to="{ name: 'CiudadesIndex' }"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-account-multiple-outline" title="Parentescos" :to="{ name: 'ParentescosIndex' }"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-table-chair" title="Modalidades" :to="{ name: 'ModalidadesIndex' }"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-tank" title="Fuerzas" :to="{ name: 'FuerzasIndex' }"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-package-variant" title="Módulos" :to="{ name: 'ModulosIndex' }"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-lock" title="Roles" :to="{ name: 'RolesIndex' }"></v-list-item>
      </v-list-group>
      <v-divider v-show="permiso('PARAMETROS')" style="border-color: white;" thickness="2"></v-divider>
      <v-list-group v-show="permiso('TIPOS DE ESTUDIANTE') || permiso('IDIOMAS') || permiso('LIBROS') || permiso('FIRMAS')">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-cog" title="Configuración"></v-list-item>
        </template>
        <v-list-item v-show="permiso('FIRMAS')" :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-signature-text" title="Pie de Firma" :to="{ name: 'FirmasForm' }"></v-list-item>
        <v-list-item v-show="permiso('TIPOS DE ESTUDIANTE')" :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-school" title="Tipos de Estudiante" :to="{ name: 'TiposEstudianteIndex' }"></v-list-item>
        <v-list-item v-show="permiso('IDIOMAS')" :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-flag-checkered" title="Idiomas" :to="{ name: 'IdiomasIndex' }"></v-list-item>
        <v-list-item v-show="permiso('LIBROS')" :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-book-open-page-variant-outline" title="Libros" :to="{ name: 'LibrosIndex' }"></v-list-item>
      </v-list-group>
      <v-divider v-show="permiso('TIPOS DE ESTUDIANTE') || permiso('IDIOMAS') || permiso('LIBROS')" style="border-color: white;" thickness="2"></v-divider>
      <v-list-item v-show="permiso('FILIALES')" prepend-icon="mdi-store-outline" title="Filiales" :to="{ name: 'FilialesIndex' }"></v-list-item>
      <v-list-item v-show="permiso('USUARIOS')" prepend-icon="mdi-account" title="Usuarios" :to="{ name: 'UsuariosIndex' }"></v-list-item>

        <v-list-item v-show="permiso('REPORTES')" prepend-icon="mdi-chart-bar" title="Dashboard" :to="{ name: 'inicioDashboard' }"></v-list-item>


      <v-list-item v-show="permiso('CURSOS')" prepend-icon="mdi-table-chair" title="Cursos" :to="{ name: 'CursosIndex' }"></v-list-item>
      <v-list-item v-show="permiso('ESTUDIANTES')" prepend-icon="mdi-account-school-outline" title="Estudiantes" :to="{ name: 'EstudiantesIndex' }"></v-list-item>
      <v-list-item v-show="permiso('INSCRIPCIONES')" prepend-icon="mdi-list-box" title="Inscripciones" :to="{ name: 'InscripcionesIndex' }"></v-list-item>
      <v-list-group v-show="permiso('CURSOS')">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-chart-bar" title="Registro Notas"></v-list-item>
        </template>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-file-chart-outline" title="Notas por libro " :to="{ name: 'CursoForm'}"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-file-chart-outline" title="Notas por Nivel " :to="{ name: 'CursoForm'}"></v-list-item>
      </v-list-group>
      <v-list-group v-show="permiso('REPORTES')">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-chart-bar" title="Contabilidad"></v-list-item>
        </template>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-file-chart-outline" title="Compra de libros" :to="{ name: 'compras'}"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-file-chart-outline" title="Venta de libros" :to="{ name: 'ventas'}"></v-list-item>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-file-chart-outline" title="Pago de mensualidad" :to="{ name: 'Pagosmensu'}"></v-list-item>
      </v-list-group>
      <v-list-group v-show="permiso('REPORTES')">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-chart-bar" title="Reportes"></v-list-item>
        </template>
        <v-list-item :style="{ paddingLeft: paddingLeft }" prepend-icon="mdi-file-chart-outline" title="Inscripciones" :to="{ name: 'ReportesInscripciones' }"></v-list-item>
      </v-list-group>
      <v-list-item v-show="permiso('PREINSCRIPCIONES')" prepend-icon="mdi-list-box-outline" title="Pre-Inscripciones" :to="{ name: 'PreInscripcionesIndex' }"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <cambiar-filial ref="cambiarFilial" />
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import CambiarFilial from '@/layouts/default/CambiarFilial.vue'

const axios = inject('axios')
const router = useRouter()
const store = useAppStore()
const { cargando, usuario, filial } = storeToRefs(store)
const { logout, permiso, alerta } = store

const hover = ref(true)
const cambiarFilial = ref()

const onHover = function(value) {
  hover.value = value
}

const paddingLeft = computed(() => hover.value ? '10px !important' : '20px !important')

const cerrarSesion = async function() {
  try {
    cargando.value = true
    await axios.post('logout')
    logout()
    router.replace({ name: 'Login' })
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  if (!usuario.value.filial) {
    cambiarFilial.value.abrirModal()
  }
})

</script>
