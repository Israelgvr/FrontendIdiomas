import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const cargando = ref(false)
  const selectorSiNo = ref([
    {
      id: true,
      codigo: 'SI',
    }, {
      id: false,
      codigo: 'NO',
    }
  ])
  const autenticado = ref(useLocalStorage('autenticado', false))
  const token = ref(useLocalStorage('token', ''))
  const usuario = ref(useLocalStorage('usuario', {
    nombre: '',
    filial: false,
    rol: {
      nombre: '',
      modulos: [],
    },
  }))
  const filial = ref(useLocalStorage('filial', {
    id: null,
    codigo: '',
    nombre: '',
  }))
  const notificacion = ref('')
  const errorNotificacion = ref(false)
  const mostrarNotificacion = ref(false)

  function login(payload) {
    autenticado.value = true
    token.value = payload.token
    if (payload.usuario.filial) {
      filial.value = payload.usuario.filial
      payload.usuario.filial = true
    } else {
      payload.usuario.filial = false
    }
    usuario.value = payload.usuario
  }
  function logout() {
    autenticado.value = false
    token.value = ''
    filial.value = {
      id: null,
      codigo: '',
      nombre: '',
    }
    usuario.value = {
      nombre: '',
      filial: false,
      rol: {
        nombre: '',
        modulos: [],
      },
    }
  }
  function cambiarFilial(payload) {
    usuario.value.filial = true
    filial.value = payload
  }
  function alerta(mensaje, error = false) {
    notificacion.value = mensaje
    errorNotificacion.value = error
    mostrarNotificacion.value = true
  }
  function permiso(modulo) {
    return usuario.value.rol.modulos.some(m => m.nombre == modulo)
  }

  return {
    cargando,
    selectorSiNo,
    autenticado,
    token,
    filial,
    usuario,
    notificacion,
    errorNotificacion,
    mostrarNotificacion,
    login,
    logout,
    cambiarFilial,
    alerta,
    permiso,
  }
})
