<template>
  <h5> VENTA DE LIBROS POR MES </h5>
  <div class="chart-container">
    <apexchart :options="comboChartOptions" :series="comboChartData" type="line" />
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
      comboChartOptions: {
        chart: {
          height: 350,
          type: 'line',
        },
        xaxis: {
          categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        },
        stroke: {
          width: [2, 4, 4], // Line widths for different series
        },
        fill: {
          opacity: [0.2, 0.1, 0.1], // Opacity for range area fill
        },
        yaxis: [
          {
            seriesName: 'Ventas',
            labels: {
              style: {
                color: '#008FFB',
              },
            },
            title: {
              text: 'Ventas',
              style: {
                color: '#008FFB',
              },
            },
          },
          {
            opposite: true,
            seriesName: 'Rango',
            labels: {
              style: {
                color: '#FF4560',
              },
            },
            title: {
              text: 'Rango',
              style: {
                color: '#FF4560',
              },
            },
          },
        ],
      },
      comboChartData: [
        {
          name: 'Rango Bajo',
          data: [20, 25, 30, 35, 40, 45],
        },
        {
          name: 'Rango Medio',
          data: [30, 35, 40, 45, 50, 55],
        },
        {
          name: 'Rango Alto',
          data: [40, 45, 50, 55, 60, 65],
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
