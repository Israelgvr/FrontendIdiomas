<template>
  <div class="container">
    <div class="content-box">
      <div class="selector">
        <label for="nivel">Selecciona un nivel:</label>
        <select v-model="selectedNivel" id="nivel" class="blue-select">
          <option value="">Selecciona un nivel</option>
          <option v-for="nivel in niveles" :key="nivel.id" :value="nivel.id">
            {{ nivel.nombre }}
          </option>
        </select>
      </div>

      <div class="selector" v-if="selectedNivel">
        <label for="libro">Selecciona un libro:</label>
        <select v-model="selectedLibro" id="libro" class="blue-select">
          <option value="">Selecciona un libro</option>
          <option v-for="libro in getLibros(selectedNivel)" :key="libro.id" :value="libro.id">
            {{ libro.nombre }}

          </option>
        </select>
      </div>

      <div v-if="selectedLibro" class="selected-book">
        <h5>Cargado de notas del libro:</h5>
        {{ getNombreLibro(selectedLibro) }}

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:1vh;
  background-color: #f5f5f5;
}

.content-box {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  background-color: white;
}

.selector {
  margin-bottom: 10px;
}

.blue-select {
  background-color: rgb(62, 62, 137);
  color: white;
  border: none;
  padding: 8px;
}
</style>



<script>

import axios from 'axios';

export default {

  props: {
    nombreLibro: String, // Debes ajustar el tipo de datos según lo que esperes recibir
  },
  components: {


  },
  data() {
    return {
      niveles: [],
      selectedNivel: "",
      selectedLibro: ""
    };
  },
  methods: {



    async cargarNiveles() {
      try {
        const response = await axios.get('NivelesLibros');
        this.niveles = response.data;
      } catch (error) {
        console.error('Error al cargar los niveles', error);
      }
    },
    handleLibroSeleccionado() {
      // Emitir evento con el ID del libro seleccionado
      this.$emit('libroSeleccionado', this.selectedLibro);
      console.log('Libro seleccionado:', this.selectedLibro);
    }
    ,
    getLibros(nivelId) {
      const nivel = this.niveles.find(n => n.id === nivelId);
      return nivel ? nivel.libros : [];
    },
    getNombreLibro(libroId) {
      const nivel = this.niveles.find(n => n.id === this.selectedNivel);
      const libro = nivel ? nivel.libros.find(l => l.id === libroId) : null;
      // Almacenar en localStorage
      localStorage.setItem('nombreLibroSeleccionado', libro.id);
      return libro ? libro.nombre : "";
    }
  },
  mounted() {
    this.cargarNiveles();
  }

};
</script>
