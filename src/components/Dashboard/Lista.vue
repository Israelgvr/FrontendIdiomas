<template>
  <h5> VENTA DE LIBROS POR MES </h5>
  <div class="chart-container">
    <apexchart type="area" :options="splineAreaChartOptions" :series="splineAreaChartData" />
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
      splineAreaChartOptions: {
        chart: {
          height: 350,
          type: 'area',
        },
        xaxis: {
          categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        },
      },
      splineAreaChartData: [
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
  max-width: 500px;
  margin: 0 auto;
}
</style>
