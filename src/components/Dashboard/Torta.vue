<template>
  <h5>  VENTA DE LIBROS POR IDIOMAS </h5>
  <div class="chart-container">
    <apexchart type="pie" :options="pieChartOptions" :series="pieChartData" />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      pieChartOptions: {
        labels: ['Ingles', 'Frances', 'Portugues', 'Chino M', 'Quechua'],
      },
      pieChartData: [10, 35, 83, 43, 2],
    };
  },
};
</script>

<style>
.chart-container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
