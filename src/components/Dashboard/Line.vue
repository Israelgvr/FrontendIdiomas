<template>
  <div>
    <h5>VENTA DE LIBROS POR MES</h5>
    <div class="chart-container">
      <apexchart type="bar" :options="chartOptions" :series="chartData" />
    </div>

    <div>
      <h6>Total de Estudiantes: {{ estudiantesData.total }}</h6>
    </div>
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
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
        },
        xaxis: {
          categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        },
      },
      chartData: [
        {
          name: 'Ventas',
          data: [30, 40, 45, 50, 49, 60],
        },
        {
          name: 'Total Estudiantes',
          data: [30], // Agregar aquí el valor total de estudiantes
        },
      ],
      estudiantesData: {
        total: 0, // Aquí deberías obtener el valor real de la cantidad total de estudiantes
      },
    };
  },
  mounted() {
    // Simulación de una llamada a la API para obtener datos de estudiantes
    this.getEstudiantesData();
  },
  methods: {
    async getEstudiantesData() {
      try {
        // Simulación de una llamada a la API
        const response = await fetch('http://127.0.0.1:29181/estu');
        const data = await response.json();

        // Actualizar los datos de estudiantes en la plantilla
        this.estudiantesData = data;
      } catch (error) {
        console.error('Error al obtener los datos de estudiantes:', error);
      }
    },
  },
};
</script>

<style>
.chart-container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
