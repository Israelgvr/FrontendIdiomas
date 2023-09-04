<template>
  <v-app>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" sm="4">
                <v-icon slot="prepend-icon">mdi-account</v-icon>
                <v-text-field v-model="nombre" label="Nombre" required>

                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-icon slot="prepend-icon">mdi-barcode</v-icon>
                <v-text-field v-model="codigo" label="Código" required>

                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-icon slot="prepend-icon">mdi-label</v-icon>
                <v-select v-model="categoria" :items="categorias" label="Categoría" required>

                </v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-icon slot="prepend-icon">mdi-domain</v-icon>
                <v-text-field v-model="proveedor" label="Proveedor" required>

                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-icon slot="prepend-icon">mdi-package-variant</v-icon>
                <v-text-field v-model.number="stock" label="Stock" type="number" required>

                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-icon slot="prepend-icon">mdi-currency-usd</v-icon>
                <v-text-field v-model.number="precio" label="Precio" type="number" required>

                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn type="submit" color="primary">
                  <v-icon left>mdi-cart</v-icon>
                  Agregar compra
                </v-btn>
                <v-btn color="secondary" @click="cancelForm">
                  <v-icon left>mdi-cancel</v-icon>
                  Cancelar compra
                </v-btn>
                <v-progress-linear v-if="sending" color="secondary" indeterminate></v-progress-linear>
              </v-col>
            </v-row>
          </v-form>
          <div> . </div>
          <v-alert v-if="errorMessage" color="secondary">
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <forms />
    </v-container>
  </v-app>

</template>
<script >
import axios from 'axios';
import forms from '@/components/Compras/forms.vue'

export default {
  components: {
    forms
  },
  data() {
    return {
      nombre: '',
      codigo: '',
      categoria: '',
      proveedor: '',
      stock: null,
      precio: null,
      errorMessage: '',
      categorias: ['ingles', 'frances', 'chino', 'ruso'],
    };
  },
  methods: {
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      const apiUrl = 'http://127.0.0.1:51339/todos';

      try {
        const response = await axios.post(apiUrl, {
          nombre: this.nombre,
          codigo: this.codigo,
          categoria: this.categoria,
          proveedor: this.proveedor,
          stock: this.stock,
          precio: this.precio,
          fecha: new Date().toISOString(),
        });

        if (response.status === 201) {
          // Datos enviados con éxito, podrías hacer alguna acción adicional si lo deseas
          console.log('Datos enviados con éxito');
          this.errorMessage = 'Compra realizado con éxito';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Hubo un error en la conexión.';
      }
    },
    cancelForm() {
      this.nombre = '';
      this.codigo = '';
      this.categoria = '';
      this.proveedor = '';
      this.stock = null;
      this.precio = null;
      this.errorMessage = '';
    },
    validateForm() {
      if (
        !this.nombre ||
        !this.codigo ||
        !this.categoria ||
        !this.proveedor ||
        this.stock === null ||
        this.precio === null ||
        this.stock <= 0 ||
        this.precio <= 0
      ) {
        this.errorMessage = 'Por favor, complete todos los campos correctamente.';
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
/* Puedes agregar estilos personalizados aquí */
</style>
