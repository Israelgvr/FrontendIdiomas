<template>
  <v-container>
    <v-sheet>
      <v-table fixed-header hover dense>
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
        <tbody v-if="students.length > 0">
        <tr v-for="student in students" :key="student.id">
          <td class="text-center">{{ student.persona.nombre + ' ' + student.persona.apellidoPaterno + ' ' + student.persona.apellidoMaterno }}</td>
          <td class="text-center">{{ student.persona.cedula }}</td>
          <td class="text-center">{{ student.matricula }}</td>
          <td class="text-center">
            <div>
              <button @click="showGrades(student)" class="btn btn-primary">Ver notas</button>
            </div>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="4" class="text-center">No hay datos para mostrar</td>
        </tr>
        </tbody>
      </v-table>

      <!-- New table to display grades -->
      <v-table fixed-header hover dense v-if="selectedStudent">
        <thead class="grey--text text--darken-2">
        <tr>
          <th class="text-center bg-secondary">Nota 1</th>
          <th class="text-center bg-secondary">Nota 2</th>
          <th class="text-center bg-secondary">Nota 3</th>
          <th class="text-center bg-secondary">Nota 4</th>
          <th class="text-center bg-secondary">Nota 5</th>
          <th class="text-center bg-secondary">Nota 6</th>
          <th class="text-center bg-secondary">Promedio Final</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">{{ selectedStudent.notas[0].nota1 }}</td>
          <td class="text-center">{{ selectedStudent.notas[0].nota2 }}</td>
          <td class="text-center">{{ selectedStudent.notas[0].nota3 }}</td>
          <td class="text-center">{{ selectedStudent.notas[0].nota4 }}</td>
          <td class="text-center">{{ selectedStudent.notas[0].nota5 }}</td>
          <td class="text-center">{{ selectedStudent.notas[0].nota6 }}</td>
          <td class="text-center">{{ selectedStudent.notas[0].promedioFinal }}</td>
        </tr>
        </tbody>
      </v-table>
      <!-- End of new table -->

    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      students: [
        {
          id: "1",
          matricula: "S123",
          persona: {
            nombre: "John",
            apellidoPaterno: "Doe",
            apellidoMaterno: "Smith",
            cedula: "1234567"
          },
          notas: [
            {
              nota1: 8.5,
              nota2: 7.9,
              nota3: 6.2,
              nota4: 9.1,
              nota5: 8.7,
              nota6: 9.5,
              promedioFinal: 8.4
            }
          ]
        },
        // Add more student objects here
      ],
      selectedStudent: null
    };
  },
  methods: {
    showGrades(student) {
      this.selectedStudent = student;
    }
  }
};
</script>

<style>
.btn {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
