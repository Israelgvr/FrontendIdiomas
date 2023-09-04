// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import '@/styles/main.scss'
import { registerPlugins } from '@/plugins'
const app = createApp(App)
registerPlugins(app)
import InputBuscar from '@/components/shared/InputBuscar.vue';
app.component('InputBuscar', InputBuscar)

// Store
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
const store = useAppStore()
const { logout } = store
const { autenticado, token, cargando } = storeToRefs(store)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = `${import.meta.env.VITE_APP_URL}/api/`
axios.defaults.timeout = 10000
axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept-Language'] = 'es-ES,es;'

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

// Router
import router from './router'
router.beforeEach((to, from, next) => {
  if (!autenticado.value) {
    if (to.name != 'Login' && to.name != 'Recuperacion') {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    if (to.name == 'Login' || to.name == 'Recuperacion') {
      next({ name: 'Inicio' })
    } else {
      next()
    }
  }
})

app.mount('#app')
