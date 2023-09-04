
<template>
  <v-container>
    <Niveles/>
    <v-sheet>
      <v-container>
        <v-table fixed-header hover dense>
          <thead class="grey--text text--darken-2">
          <tr>
            <th width="5%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              #
            </th>
            <th width="15%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              Nombre
            </th>
            <th width="10%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              Apellido Paterno
            </th>
            <th width="10%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              Apellido Materno
            </th>
            <th width="15%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              Email
            </th>
            <th width="10%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              Cedula
            </th>
            <th width="15%" class="text-center bg-secondary" style="min-width: 152px;">
              Promedio Final
            </th>
          </tr>
          </thead>
          <tbody v-if="items.length > 0">
          <tr v-for="(item, index) in items" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.persona.nombre }}</td>
            <td class="text-center">{{ item.persona.apellidoPaterno }}</td>
            <td class="text-center">{{ item.persona.apellidoMaterno }}</td>
            <td class="text-center">{{ item.persona.email }}</td>
            <td class="text-center">{{ item.persona.cedula }}</td>
            <td class="text-center">{{ calculateAverage(item.notas) }}</td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="8" class="text-center">No hay datos para mostrar</td>
          </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Niveles from '@/components/notas/Nivel.vue'

const items = ref([]);

const apiUrl = 'http://localhost:3333/api/nota';

const fetchItems = async () => {
  try {
    const response = await axios.get(apiUrl);
    items.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const getBookImage = (bookName) => {
  // Replace this with your logic to get the book image based on the book name
  // For now, we return a default placeholder image URL.
  return 'https://via.placeholder.com/45';
};

const calculateAverage = (notas) => {
  const total = notas.reduce((sum, nota) => sum + nota.promedioFinal, 0);
  if(total==0){
    return 0;

  }else{
    return (total / notas.length).toFixed(2);}
};

onMounted(() => {
  fetchItems();
});
</script>

<style lang="css" scoped>
.v-data-table .v-data-table__wrapper {
  overflow-y: hidden;
}
</style>
