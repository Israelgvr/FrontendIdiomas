<template>
    <h5> VENTA DE LIBROS  POR MES </h5>
    <div class="chart-container">
      <apexchart type="line" :options="lineChartOptions" :series="lineChartData" />
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
        lineChartOptions: {
          chart: {
            height: 350,
            type: 'line',
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          },
        },
        lineChartData: [
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
  