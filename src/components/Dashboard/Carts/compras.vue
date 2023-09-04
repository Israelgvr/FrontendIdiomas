<template>
  <v-card class="mx-auto text-center" color="rgb(128, 128, 0)" dark max-width="400">
    <v-card-text>
      <v-sparkline :value="value" color="rgba(255, 255, 255, .7)" height="10" padding="2" stroke-linecap="round" smooth>
        <template v-slot:label="item">${{ item.value }}</template>
      </v-sparkline>
    </v-card-text>
    <v-card-text>
      <div class="text-h6 font-weight-bold" style="color: white;">
        <v-icon color="white" size="30">mdi-book-open-variant</v-icon> COMPRA DE LIBROS MES <span> </span>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn block text color="white" :to="{ name: 'Compras' }">
        VER REPORTE
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
};
</script>
