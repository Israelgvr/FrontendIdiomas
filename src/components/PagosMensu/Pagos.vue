<template>
  <div>

    <v-container>
      <v-row>
        <v-col cols="4" >
          <v-card>
            <v-card-title>
              Buscar Estudiantes
            </v-card-title>
            <v-card-text >
              <v-text-field v-model="matricula" label="Matrícula"></v-text-field>
              <v-text-field v-model="nombre" label="Nombre"></v-text-field>
              <v-btn @click="buscarEstudiantes" color="primary">Buscar</v-btn>
            </v-card-text>
            <v-alert v-if="estudianteEncontrado === 'encontrado'" type="success">Estudiante encontrado</v-alert>
            <v-alert v-else-if="estudianteEncontrado === 'no-encontrado'" type="error">Estudiante no encontrado</v-alert>
            <v-alert v-else-if="estudianteEncontrado === 'error'" type="error">El estudiante no se encuentra registrado</v-alert></v-card>
        </v-col>
        <v-col cols="8">
          <v-card>
            <v-card-title>
              Formulario de pago de mensualidades
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="formulario.nombre" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formulario.apellidoPaterno" label="Apellido Paterno"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formulario.apellidoMaterno" label="Apellido Materno"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="formulario.email" label="Email"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formulario.cedula" label="Cédula"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formulario.cedulaComplemento" label="Cédula Complemento"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-row>
                  <v-col cols="4">
                    <v-select v-model="formularioL.nombre" :items="opciones.map(opcion => opcion.nombre)" label="Tipo de estudiante" @change="cargarDescuento"></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="formularioL.descuento" label="Descuento"></v-text-field>
                  </v-col>
                </v-row>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="formularioL.precio" label="Precio" append-icon="mdi-currency-usd"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formularioL.total" label="Total"></v-text-field>
                </v-col>
              </v-row>
              <v-btn block text color="#008080" @click="guardarVenta">
                <v-icon left> </v-icon> Guardar Venta
              </v-btn>
              <v-btn block text color="success" @click="guardarVenta">
                <v-icon left>mdi-printer</v-icon> Imprimir
              </v-btn>
            </v-card-text>


          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import Buscarlibro from '@/components/Ventas/buscarlibro.vue';
export default {
  data() {
    return {
      matricula: "",
      nombre: "",
      estudiantes: [],
      estudianteSeleccionado: null,
      formulario: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        cedula: null,
        cedulaComplemento: "",
      },
      estudianteEncontrado: null,
      formularioL: {
        nombre: '',
        codigo: '',
        categoria: '',
        precio: '',
        cantidad: '',
        total: ''
      },
      formularioT: {
        id: '',
        nombre: '',
        posicion: '',
        descuento: '',
        createdAt: '',
        updatedAt: ''
      },
      opciones: [
        {
          "id": "64aa1a346c40e1bf60bc6a66",
          "nombre": "Alumno militar destinado",
          "posicion": 1,
          "descuento": 100,
          "createdAt": "2023-07-09T02:23:48.558Z",
          "updatedAt": "2023-08-02T09:13:25.814Z"
        },
        {
          "id": "64aa1a346c40e1bf60bc6a66",
          "nombre": "Estudiante E.M.I.",
          "posicion": 1,
          "descuento": 100,
          "createdAt": "2023-07-09T02:23:48.558Z",
          "updatedAt": "2023-08-02T09:13:25.814Z"
        },
        {
          "id": "64aa1a346c40e1bf60bc6a66",
          "nombre": "Hijo de militar",
          "posicion": 1,
          "descuento": 100,
          "createdAt": "2023-07-09T02:23:48.558Z",
          "updatedAt": "2023-08-02T09:13:25.814Z"
        },
      ]

    };
  },
  methods: {
    async buscarEstudiantes() {
      try {
        const response = await fetch(`http://127.0.0.1:1659://127.0.0.1:51386/buscar?matricula=${this.matricula}&nombre=${this.nombre}`);
        const data = await response.json();
        this.estudiantes = data.payload.data;
        if (this.estudiantes.length > 0) {
          this.estudianteEncontrado = 'encontrado';
          this.estudianteSeleccionado = this.estudiantes[0].id;
          this.llenarFormulario(this.estudiantes[0].persona);
        }
        else {
          this.estudianteEncontrado = 'no-encontrado';
          this.estudianteSeleccionado = null;
          this.limpiarFormulario();
        }
      }
      catch (error) {
        console.error(error);
        this.estudianteEncontrado = 'error';
      }
    },
    llenarFormulario(persona) {
      this.formulario.nombre = persona.nombre;
      this.formulario.apellidoPaterno = persona.apellidoPaterno;
      this.formulario.apellidoMaterno = persona.apellidoMaterno;
      this.formulario.email = persona.email;
      this.formulario.cedula = persona.cedula;
      this.formulario.cedulaComplemento = persona.cedulaComplemento;
    },
    limpiarFormulario() {
      this.formulario.nombre = "";
      this.formulario.apellidoPaterno = "";
      this.formulario.apellidoMaterno = "";
      this.formulario.email = "";
      this.formulario.cedula = null;
      this.formulario.cedulaComplemento = "";
    },
    guardarVenta() {
      // Aquí debes implementar la lógica para guardar la venta en la API
      // Puedes usar la URL http://127.0.0.1:20076/VENTA y enviar los datos del formulario
    },
    llenarFormularioS(libro) {
      // Llenar el formulario con los datos del libro seleccionado
      this.formularioL.nombre = libro.nombre;
      this.formularioL.codigo = libro.codigo;
      this.formularioL.categoria = libro.categoria;
      this.formularioL.precio = libro.precio;
      // ...otros campos del formulario...
    },
    calcularTotal() {
      if (this.formularioL.precio && this.formularioL.cantidad) {
        const precio = parseFloat(this.formularioL.precio);
        const cantidad = parseInt(this.formularioL.cantidad);
        const total = precio * cantidad;
        this.formularioL.total = total.toFixed(2); // Redondear a dos decimales
      } else {
        this.formularioL.total = '';
      }
    },

    cargarDescuento() {
      const seleccionado = this.opciones.find(opcion => opcion.nombre === this.formularioT.nombre);
      if (seleccionado) {
        this.formularioT.descuento = seleccionado.descuento;
      }

    }


  },
  components: { Buscarlibro }
};
</script>

<style>
/* Estilos de Vuetify aquí */
.max-width-200 {
  max-width:500px;
}
</style>
