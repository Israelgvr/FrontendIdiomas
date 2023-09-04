/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import { es, en } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  // components: components,
  // directives: directives,
  locale: {
    locale: 'es',
    fallback: 'en',
    messages: { es, en },
  },
  blueprint: md3,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#EFEFEF',
          surface: '#ffffff',
          primary: '#4338ca',
          'primary-darken-1': '#312e81',
          secondary: '#4A4795',
          'secondary-darken-1': '#1E1B69',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
})
