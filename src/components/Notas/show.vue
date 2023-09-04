<template>
  <v-container>
    <v-sheet>
      <v-container>
        <Niveles @libroSeleccionado="handleLibroSeleccionado" />
        <v-table fixed-header hover density="comfortable">
          <thead class="grey--text text--darken-2">
          <tr>
            <th width="35%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              Nombre
            </th>
            <th width="20%" class="text-center bg-secondary" style="min-width: 350px; border: 1px solid white; border-width: 0 1px 0 0;">
              Cédula de Identidad
            </th>
            <th width="10%" class="text-center bg-secondary" style="border: 1px solid white; border-width: 0 1px 0 0;">
              Matrícula
            </th>
            <th width="10%" class="text-center bg-secondary" style="min-width: 152px;">
              Acciones
            </th>
          </tr>
          </thead>
          <tbody v-if="items.length > 0">
          <tr v-for="item in items" :key="item.id">
            <td class="text-center">{{ [item.estudiante.persona.apellidoPaterno, item.estudiante.persona.apellidoMaterno, item.estudiante.persona.nombre].join(' ') }}</td>
            <td class="text-center">{{ [item.estudiante.persona.cedula, item.estudiante.persona.cedulaComplemento, item.estudiante.persona.ciudad.codigo].join(' ') }}</td>
            <td class="text-center">{{ item.estudiante.matricula }}</td>
            <td class="text-center">
              <div>
                <button @click="showAlert(item.estudiante.persona.id,item.estudiante.persona.nombre, item.estudiante.persona.apellidoPaterno, item.estudiante.persona.apellidoMaterno)" class="btn btn-primary">Asignar nota</button>
              </div>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="7" class="text-center">No hay datos para mostrar</td>
          </tr>
          </tbody>
        </v-table>
        <v-row v-if="paginacion.total > 0" class="text-center bg-grey-lighten-5 mt-2" align="center" dense justify="end">
          <v-col cols="12" sm="4" md="2" xl="1" class="d-none d-sm-inline">
            <v-select
              v-model="paginacion.porPagina"
              density="compact"
              label="Filas a mostrar"
              :items="paginacion.opciones"
              hide-details
              @update:modelValue="cambiarPagina()"
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
              @update:modelValue="getDatos()"
            ></v-pagination>
          </v-col>
        </v-row>
        <div v-if="notasCargadas">
          <v-alert type="success">Las notas se cargaron correctamente.</v-alert>
          <CAlert color="primary" dismissible @close="() => { liveExampleVisible = false }">A simple primary alert—check it out!</CAlert>
        </div>

      </v-container>
      <div>

      </div>
    </v-sheet>
  </v-container>
</template>

<script setup>

import { inject, reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

import Niveles from '@/components/notas/Nivel.vue'

import Swal from 'sweetalert2';

const notasCargadas = ref(false);


const showAlert = (item, nombre, apellidoPaterno, apellidoMaterno) => {
  Swal.fire({
    title: `Agregar notas del estudiante: ${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
    html: `
    <table>
  <tr>
    <td>
      <label for="nota1">90%</label><br>
      <input type="number" id="nota1" placeholder="notas" step="0.1" required
    </td>

    <td>
      <label for="nota2">5%</label><br>
      <input type="number" id="nota2" placeholder="nota" step="0.1" required >
    </td>

    <td>
      <label for="nota3">2.5%</label><br>
      <input type="number" id="nota3" placeholder=" nota" step="0.1" required >
    </td>

    <td>
      <label for="nota4">2.5%</label><br>
      <input type="number" id="nota4" placeholder="nota" step="0.1" required >
    </td>

    <td>
      <label for="nota5">Nota P.</label><br>
      <input type="number" id="nota5" placeholder="nota" step="0.1" required >
    </td>

    <td>
      <label for="nota6">RETEST</label><br>
      <input type="number" id="nota6" placeholder="nota" step="0.1" required >
    </td>
  </tr>
</table>



    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    preConfirm: () => {
      const nota1 = parseFloat(document.getElementById('nota1').value);
      const nota2 = parseFloat(document.getElementById('nota2').value);
      const nota3 = parseFloat(document.getElementById('nota3').value);
      const nota4 = parseFloat(document.getElementById('nota4').value);
      const nota5 = parseFloat(document.getElementById('nota5').value);
      const nota6 = parseFloat(document.getElementById('nota6').value);

      if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4) || isNaN(nota5) || isNaN(nota6)) {
        Swal.showValidationMessage('Por favor, ingresa todas las notas correctamente.');
      }


        // Recuperar el nombre del libro almacenado en localStorage
        const nombreLibroSeleccionado = localStorage.getItem('nombreLibroSeleccionado');

        // Hacer algo con el nombre del libro recuperado
        console.log('Nombre del libro recuperado:', nombreLibroSeleccionado);

      const estudianteId = item; // Cambia esto según cómo esté estructurado tu objeto "item"
      console.log('ID del estudiante:', estudianteId);
      return {
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        nota4: nota4,
        nota5: nota5,
        nota6: nota6,
        estudianteId: estudianteId,
        libroId: nombreLibroSeleccionado,



      };
    }
  }).then((result) => {
    if (!result.isConfirmed) return;

    // Hacer la solicitud POST al API con los datos de las notas
    const notasData = result.value;

    enviarNotas(notasData);
  });
};

const enviarNotas = async (notasData) => {
  try {
    const response = await fetch('http://127.0.0.1:6458/Notas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notasData)
    });

    if (response.ok) {
      console.log('Notas asignadas con éxito.');
      notasCargadas.value = true;
    } else {
      console.error('Error al asignar las notas:', response.statusText);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};




const axios = inject('axios')
const route = useRoute()
const store = useAppStore()
const { cargando } = storeToRefs(store)
const { alerta } = store

///const formInscripcion = ref()
const buscarTexto = ref(null)
const curso = ref({
  id: null,
  nombre: '',
  idioma: {
    nombre: '',
  },
  modalidad: {
    nombre: '',
  },
  niveles: [],
})
///const detalle = ref()
const paginacion = ref({
  pagina: 1,
  ultimaPagina: 0,
  total: 0,
  porPagina: 8,
  opciones: [8, 15, 30],
})
const items = ref([])

const modalEliminar = reactive({
  id: null,
  url: `cursos/${route.params.id}/inscripciones`,
  titulo: 'la inscripción',
  codigo: null,
  abrir: false,
})

const buscar = function(value) {
  paginacion.value.pagina = 1
  buscarTexto.value = value
  getDatos()
}

const eliminar = function(id, nombre) {
  modalEliminar.id = id
  modalEliminar.codigo = nombre
  modalEliminar.abrir = true
}

const cambiarPagina = function() {
  paginacion.value.pagina = 1
  getDatos()
}

const getDatos = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`cursos/${route.params.id}/inscripciones`, {
      params: {
        pagina: paginacion.value.pagina,
        porPagina: paginacion.value.porPagina,
        buscar: buscarTexto.value,
      },
    })
    items.value = response.data.payload.data
    paginacion.value.ultimaPagina = response.data.payload.meta.lastPage
    paginacion.value.total = response.data.payload.meta.total
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    cargando.value = false
  }
}
const getCurso = async function() {
  try {
    cargando.value = true
    const response = await axios.get(`cursos/${route.params.id}`)
    curso.value = response.data.payload
  } catch(error) {
    alerta(error.response.data.message, true)
  } finally {
    getDatos()
  }
}


onMounted(() => {
  getCurso()
})
</script>

<style lang="css" scoped>
.v-data-table .v-data-table__wrapper{
  overflow-y: hidden;
}
</style>

<style>
.btn {
  padding: 7px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}

.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  flex: 1;
  margin-right: 5px;
}
label {
  display: block;
  margin-bottom: 5px;
}

input[type="number"] {
  width: 70px; /* Ajusta el valor del ancho según tus necesidades */
  height: 30px;
}
input[type="number"], label {
  font-size: 20px; /* Ajusta el valor del tamaño de fuente según tus necesidades */
}
</style>
