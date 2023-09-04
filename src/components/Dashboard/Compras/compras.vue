<template>
  <div>
    <h1>Reporte de Compras</h1>

    <!-- Gráficos en dos filas -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Gráfico de Barras</v-card-title>
          <v-card-text>
            <apexchart :options="barChartOptions" :series="barChartData" type="bar" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Gráfico de Línea</v-card-title>
          <v-card-text>
            <apexchart :options="lineChartOptions" :series="lineChartData" type="line" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Lista de Stock de Productos -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Stock de Productos</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(product, index) in stockProducts"
                  :key="index"
                >
                  <v-list-item-content class="d-flex justify-space-between align-center">
                    <div class="d-flex align-center">
                      <v-icon>mdi-cube</v-icon>
                      {{ product.product }}
                      {{ product.stock }}
                    </div>
                    <div class="d-flex align-center">
                      <v-icon>mdi-pencil</v-icon>
                      <v-icon>mdi-delete</v-icon>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Lista de Productos con Proveedores -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Productos con Proveedores</v-card-title>
          <v-card-text>
            <table class="custom-table"> <!-- Usar la clase de estilo personalizado -->
              <thead>
              <tr>
                <th>Producto</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product, index) in productsWithSuppliers" :key="index">
                <td>{{ product.product }}</td>
                <td>{{ product.supplier }}</td>
                <td>
                  <v-icon>mdi-pencil</v-icon>
                  <v-icon>mdi-delete</v-icon>
                </td>
              </tr>
              </tbody>
            </table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resto del contenido, como productos vendidos, disponibles, últimas compras y proveedores -->
  </div>
</template>

<script>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const barChartOptions = ref({
      chart: {
        type: 'bar',
      },
      // Otras opciones del gráfico de barras
    });

    const barChartData = ref([
      // Datos del gráfico de barras (simulados)
      {
        name: 'Producto A',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: 'Producto B',
        data: [15, 25, 30, 35, 40, 45, 50, 55],
      },
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
        name: 'Producto A',
        data: [10, 15, 18, 22, 25, 30, 35, 40],
      },
      {
        name: 'Producto B',
        data: [5, 8, 12, 16, 20, 24, 28, 32],
      },
    ]);

    // Datos simulados para la lista de Stock de Productos
    const stockProducts = ref([
      { product: 'Producto A', stock: 100 },
      { product: 'Producto B', stock: 50 },
      // Agrega más datos según sea necesario
    ]);

    // Datos simulados para la lista de Productos con Proveedores
    const productsWithSuppliers = ref([
      { product: 'Producto A', supplier: 'Proveedor X' },
      { product: 'Producto B', supplier: 'Proveedor Y' },
      // Agrega más datos según sea necesario
    ]);

    const range = ref({
      start: new Date(2020, 9, 12),
      end: new Date(2020, 9, 16),
    });

    // Resto de los datos simulados y lógica para otros elementos

    return {
      barChartOptions,
      barChartData,
      lineChartOptions,
      lineChartData,
      stockProducts,
      productsWithSuppliers, range
      // Resto de los datos y métodos necesarios
    };
  },
};
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.custom-table th {
  background-color: #f2f2f2;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.product-icon {
  margin-right: 10px;
}

.custom-card {
  border: 1px solid #ccc; /* Definir el estilo de la línea */
  padding: 1rem; /* Espaciado interno */
  margin-bottom: 1rem; /* Espaciado inferior entre los cuadrados */
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-icon {
  margin-right: 0.1rem;
}

.product-actions {
  display: flex;
  align-items: center;
}
.align-center {
  display: flex;
  align-items: center;
}
.justify-space-between {
  justify-content: space-between;
}
</style>
