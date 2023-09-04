<template>
  <v-container>
    <div>

    </div>
    <v-form>
      <v-row class="mb-4">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="search"
            label="Buscar"
            placeholder="Ingrese el libro que desee buscar"
            append-icon="mdi-magnify"
            @input="searchItems"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-box style="max-height: 400px; overflow-y: auto;">
      <v-table fixed-header hover dense>
        <thead class="grey--text text--darken-2">
        <!-- Encabezados de la tabla -->
        <tr>
          <th width="5%" class="text-center bg-secondary">
            #
          </th>
          <th width="15%" class="text-center bg-secondary">
            Nombre
          </th>
          <th width="15%" class="text-center bg-secondary">
            Código
          </th>
          <th width="10%" class="text-center bg-secondary">
            Categoría
          </th>
          <th width="15%" class="text-center bg-secondary">
            Proveedor
          </th>
          <th width="10%" class="text-center bg-secondary">
            Stock
          </th>
          <th width="15%" class="text-center bg-secondary">
            Precio
          </th>
        </tr>
        </thead>
        <tbody v-if="paginatedItems.length > 0">
        <tr  v-for="(item, index) in paginatedItems" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ item.nombre }}</td>
          <td class="text-center">{{ item.codigo }}</td>
          <td class="text-center">{{ item.categoria }}</td>
          <td class="text-center">{{ item.proveedor }}</td>
          <td :class="{'text-center': true, 'orange-cell': item.stock <= 10}">
            {{ item.stock }}
          </td>
          <td class="text-center">{{ item.precio }}</td>

        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="8" class="text-center">No hay datos para mostrar</td>
        </tr>
        </tbody>
      </v-table>
    </v-box>
    <v-row v-if="paginacion.total > 0" class="text-center bg-grey-lighten-5 mt-2" align="center" dense justify="end">
      <v-col cols="12" sm="4" md="2" xl="1" class="d-none d-sm-inline">
        <v-select
          v-model="paginacion.porPagina"
          density="compact"
          label="Filas a mostrar"
          :items="paginacion.opciones"
          hide-details
          @input="cambiarPagina(1)"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="8" md="5" lg="4" xl="2">
        <v-pagination
          v-model="paginacion.pagina"
          density="compact"
          :length="paginacion.ultimaPagina"
          :total-visible="5"
          rounded="circle"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="cambiarPagina"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import graficoLine from '@/components/Dashboard/Line.vue'
import VueApexCharts from "vue3-apexcharts";
import graficoTorta from "@/components/Dashboard/Torta";
import graficoAnillo from "@/components/Dashboard/Anillo";
import Compras from "@/components/Dashboard/Carts/compras";
import venta from "@/components/Dashboard/Carts/ventas";
import Estudiantes from "@/components/Dashboard/Carts/estudiantes";
import Lista from "@/components/Dashboard/Lista";
import ListaHM from "@/components/Dashboard/LineHM";

export default {
  components: {
    apexchart: VueApexCharts, graficoTorta , graficoLine, graficoAnillo, Compras, venta ,Estudiantes, Lista, ListaHM
  },
  data() {
    return {
      items: [],
      search: '',
      paginacion: {
        total: 0,
        porPagina: 10,
        pagina: 1,
        ultimaPagina: 0,
        opciones: [10, 20, 50]
      }
    };
  },
  mounted() {
    this.fetchData(); // Obtener datos automáticamente al cargar la página
  },
  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:51339/listar')
        .then(response => {
          this.items = response.data.payload.data;
          this.paginacion.total = this.items.length;
          this.paginacion.ultimaPagina = Math.ceil(this.paginacion.total / this.paginacion.porPagina);
          this.cambiarPagina(1);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    searchItems() {
      const query = this.search.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.nombre.toLowerCase().includes(query) ||
        item.codigo.toLowerCase().includes(query) ||
        item.categoria.toLowerCase().includes(query) ||
        item.proveedor.toLowerCase().includes(query)
      );
    },
    cambiarPagina(pagina) {
      this.paginacion.pagina = pagina;
      const startIndex = (pagina - 1) * this.paginacion.porPagina;
      const endIndex = startIndex + this.paginacion.porPagina;
      this.paginatedItems = this.items.slice(startIndex, endIndex);
    },
    getDatos() {
      const startIndex = (this.paginacion.pagina - 1) * this.paginacion.porPagina;
      const endIndex = startIndex + this.paginacion.porPagina;
      this.filteredItems = this.items.slice(startIndex, endIndex);
    },
    formatDate(dateString) {
      // Función para formatear la fecha como desees
    }
  },
  computed: {
    paginatedItems() {
      return this.items.slice(
        (this.paginacion.pagina - 1) * this.paginacion.porPagina,
        this.paginacion.pagina * this.paginacion.porPagina
      );
    },
    filteredItems() {
      if (this.search === '') {
        return this.items;
      }
      return this.filteredItems;
    },

  },
  displayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
  },
  totalPages() {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }



};
</script>

<style>
.orange-cell {
  background-color: orange;
}
/* Estilos personalizados si los necesitas */
</style>
