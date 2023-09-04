/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import moment from 'moment'

export function registerPlugins (app) {
  loadFonts()
  app.config.globalProperties.$filters = {
    fecha: function(date) {
      if (!date)  {
        return '-'
      } else {
        return moment(date).format('DD/MM/YYYY')
      }
    },
    hora: function(date) {
      if (!date)  {
        return '-'
      } else {
        return moment(date, 'HH-mm:ss').format('HH:mm')
      }
    },
  }
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
}
