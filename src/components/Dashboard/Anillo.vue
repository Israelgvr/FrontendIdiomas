<template>
  <h5>  CANTIDAD DE ESTUDIANTES </h5>
  <div class="chart-container">
    <apexchart type="donut" :options="donutChartOptions" :series="donutChartData" />
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
      donutChartOptions: {
        chart: {
          type: 'donut',
        },
        labels: ['Ingles', 'Frances', 'Portugues', 'Chino M', 'Quechua'],
      },
      donutChartData: [44, 55, 13, 43, 22],
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
