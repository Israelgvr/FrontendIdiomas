<template>
  <v-container>
    <!-- Row to display components side by side -->
    <v-row>
      <!-- Column for "Venta de libros" -->
      <v-col cols="6">
        <v-card>
          <v-card-title class="headline">
            <v-icon size="24" class="mr-2">mdi-book</v-icon> Venta de libros
          </v-card-title>
          <v-card-text>
            <!-- Elemento de búsqueda de estudiante -->
            <v-autocomplete
              v-model="estudianteId"
              :items="estudiantes"
              label="Buscar estudiante"
            ></v-autocomplete>

            <!-- Elemento de selección de categoría de libro -->
            <v-select
              v-model="categoriaSeleccionada"
              :items="categorias"
              label="Seleccionar categoría de libro"
            ></v-select>

            <!-- Elemento de selección de libro dentro de la categoría -->
            <v-select
              v-model="libroId"
              :items="librosPorCategoria"
              label="Seleccionar libro"
            ></v-select>

            <!-- Botón para realizar la venta -->
            <v-btn color="primary" @click="realizarVenta">
              <v-icon left>mdi-cart</v-icon> Realizar Venta
            </v-btn>

            <!-- Botón para generar el recibo de la venta -->
            <v-btn color="success" @click="generarRecibo" v-if="ventaRealizada">
              Generar Recibo
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Column for VentasUSB -->
      <v-col cols="6">
        <VentasUSB />
        <buscarLibro/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import VentasUSB from '@/components/Ventas/ventaUSB.vue';
import buscarLibro from '@/components/Ventas/buscarlibro.vue';
// Rest of the script setup remains unchanged
</script>

<style>


</style>

