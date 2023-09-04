<template>
  <div>
    <h1>Reporte de Rendimiento de Estudiantes</h1>

    <!-- Gráficos en dos filas -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Gráfico de Torta (Distribución Aprobados/Reprobados)</v-card-title>
          <v-card-text>
            <div class="chart-container">
              <apexchart type="pie" :options="pieChartOptions" :series="pieChartData" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Gráfico de Barras (Mejores Promedios)</v-card-title>
          <v-card-text>
            <apexchart :options="barChartOptions" :series="barChartData" type="bar" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Gráfico de Línea (Rendimiento General)</v-card-title>
          <v-card-text>
            <apexchart :options="lineChartOptions" :series="lineChartData" type="line" />
          </v-card-text>
        </v-card>
      </v-col>    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Mejores Promedios</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(student, index) in topPerformingStudents"
                :key="index"
              >
                <v-list-item-content class="d-flex justify-space-between align-center">
                  <div class="student-info">
                    <v-icon class="student-icon">mdi-account-circle</v-icon>
                    <div class="student-details">
                      <span class="student-name">{{ student.name }}</span>
                      <span class="student-average">Promedio: <span class="average-value">{{ student.average }}</span></span>
                    </div>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon>Detalles</v-icon>

                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-btn @click="printReport">
            <v-icon left>mdi-printer</v-icon>

          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    </v-row>

    <!-- Lista de Estudiantes con Mejores Promedios -->
    <thead class="grey--text text--darken-2">
    <tr>
      <th width="35%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
        Nombre
      </th>
      <th width="35%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
        Libros Reprobados
      </th>
      <th width="20%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
        Niveles Reprobados
      </th>
      <th width="10%" class="text-center bg-secondary" style="min-width: 152px;">
        Acciones
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td class="text-center">Juan Pérez</td>
      <td class="text-center">3</td>
      <td class="text-center">2</td>
      <td class="text-center">
        <button class="detalle-button" >Detalle </button>
      </td>
    </tr>
    <tr>
      <td class="text-center">María García</td>
      <td class="text-center">1</td>
      <td class="text-center">0</td>
      <td class="text-center">
        <button class="detalle-button" >Detalle </button>

      </td>
    </tr>
    <!-- Agrega más filas de datos de prueba aquí si es necesario -->
    </tbody>

    <!-- Resto del contenido, como estadísticas generales, información de cursos, etc. -->
  </div>
</template>

<script>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import ApexChart from 'vue3-apexcharts';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    apexchart: VueApexCharts, ApexChart
  },


  setup() {

    // const pieChartOptions = ref({
    //   chart: {
    //     type: 'pie',
    //   },
    //   // Otras opciones del gráfico de torta
    // });
    //
    // const pieChartData = ref([
    //   // Datos del gráfico de torta (simulados)
    //   {
    //     name: 'Aprobados',
    //     data: 75,
    //   },
    //   {
    //     name: 'Reprobados',
    //     data: 25,
    //   },
    // ]);
    //
    //

    const barChartOptions = ref({
      chart: {
        type: 'bar',
      },
      // Otras opciones del gráfico de barras
    });

    const barChartData = ref([
      // Datos del gráfico de barras (simulados)
      {
        name: 'Estudiante A',
        data: [90, 85, 92, 88, 95, 91, 89, 93],
      },
      {
        name: 'Estudiante B',
        data: [78, 80, 82, 75, 88, 85, 80, 83],
      },
      // Agregar más datos según sea necesario
    ]);

    const lineChartOptions = ref({
      chart: {
        type: 'line',
      },
      // Otras opciones del gráfico de línea
    });

    const lineChartData = ref([
      // Datos del gráfico de línea (simulados)
      {
        name: 'Promedio General',
        data: [85, 82, 88, 86, 90, 87, 83, 89],
      },
      // Agregar más datos según sea necesario
    ]);

    // Datos simulados para la lista de Estudiantes con Mejores Promedios
    const topPerformingStudents = ref([
      { name: 'Juan Carlos Montes Espinoza ', average: 92.5 },
      { name: 'Ever Veleasquez Rojas', average: 87.6 },
      { name: 'Leydi Villarroel Vazquez', average: 87.6 },
      // Agregar más datos según sea necesario
    ]);

    // Datos simulados para la lista de Estudiantes Reprobados
    const failingStudents = ref([
      { name: 'John Henry Montano ', average: 60.2 },
      { name: 'Limberth  Rodriguez', average: 53.8 },
      { name: 'Osmar Gonzales Soliz', average: 53.8 },
      // Agregar más datos según sea necesario
    ]);

    // Resto de los datos simulados y lógica para otros elementos

    return {
      barChartOptions,
      barChartData,
      lineChartOptions,
      lineChartData,
      topPerformingStudents,
      failingStudents,
      pieChartOptions: {
        labels: ['Aprobados', 'Reprobados'],
      },
      pieChartData: [89,11],
      failingStudentsa: [
        { name: 'Estudiante X', lastName: 'Apellido X', failedBooks: 3, failedLevels: 2 },
        { name: 'Estudiante Y', lastName: 'Apellido Y', failedBooks: 5, failedLevels: 1 },
        // Agregar más estudiantes según sea necesario
      ],
      tableHeaders: [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido', value: 'lastName' },
        { text: 'Libros Reprobados', value: 'failedBooks' },
        { text: 'Niveles Reprobados', value: 'failedLevels' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    };

  },
};
</script>

<style>

.detalle-button {
  background-color: #67bd50; /* Cambia este color al que desees */
  color: white;
  border: none;
  padding: 3px 10px;
  cursor: pointer;
}

.detalle-button:hover {
  background-color: #E64A19; /* Cambia este color al que desees para el estado hover */
}
/* Estilos personalizados según sea necesario */
/* Estilo para la información del estudiante */.student-info {
  display: flex;
  align-items: center;
}

.student-icon {
  font-size: 24px;
  margin-right: 10px;
  color: #2196F3; /* Cambiar el color según tus preferencias */
}

.student-details {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-weight: bold;
  font-size: 16px;
}

.student-average {
  color: #666;
  font-size: 14px;
}

.average-value {
  font-weight: bold;
  color: #FF5722; /* Color para resaltar el promedio, ajusta según tus preferencias */
}
</style>
