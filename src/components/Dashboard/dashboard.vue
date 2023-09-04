<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <div class="square-border">
          <Compras/>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="square-border">
          <venta/>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="square-border">
          <Estudiantes/>
        </div>
      </v-col>


    </v-row>

    <v-row>
      <v-col cols="4">

        <h5>  VENTAS DE LIBROS  POR MES </h5>

        <div class="chart-container">
          <apexchart type="bar" :options="barChartOptions" :series="barChartData" />
        </div>
      </v-col>
    <v-col cols="4">
      <graficoTorta />
    </v-col>
      <v-col cols="4">
        <Lista />
      </v-col>

      </v-row>
    <v-row>
    <v-col cols="4">
      <graficoLine/>
    </v-col>
      <v-col cols="4">
        <graficoAnillo/>
      </v-col>
      <v-col cols="4">
        <ListaHM/>
      </v-col>
    </v-row>

  </v-container>
</template>



<script>
import VueApexCharts from 'vue3-apexcharts';
import graficoTorta from '@/components/Dashboard/Torta.vue'
import graficoLine from '@/components/Dashboard/Line.vue'
import graficoAnillo from '@/components/Dashboard/Anillo.vue'
import Compras from '@/components/Dashboard/Carts/compras.vue'

import venta from '@/components/Dashboard/Carts/ventas.vue'
import Estudiantes from '@/components/Dashboard/Carts/estudiantes.vue'
import Lista from '@/components/Dashboard/Lista.vue'
import ListaHM from '@/components/Dashboard/LineHM.vue'


export default {
  components: {
    apexchart: VueApexCharts, graficoTorta , graficoLine, graficoAnillo, Compras, venta ,Estudiantes, Lista, ListaHM
  },
  data() {
    return {
      barChartOptions: {
        xaxis: {
          categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        },
      },
      barChartData: [
        {
          name: 'Ventas',
          data: [30, 40, 45, 50, 49, 60],
        },
      ],
    };
  },
};
</script>

<style>
.chart-container {
  max-width: 100%;
  margin: 0 auto;
},

.square-border {
  border: 2px solid black;
  background-color: rgb(160, 135, 135); /* Cambia el fondo a negro */
  padding: 10px;
  margin: 10px; /* Agrega un margen para separar los cuadros */
}

</style>
