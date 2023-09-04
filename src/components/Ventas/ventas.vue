<template>

  <div ref="pdfContent">
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
              Formulario de Venta
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
                <v-col cols="4">
                  <v-text-field v-model="formularioL.nombre " label="Nombre libro"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formularioL.codigo" label="Codigo"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formularioL.categoria" label="Categoria"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="formularioL.precio" label="Precio" append-icon="mdi-currency-usd"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formularioL.cantidad" label="Cantidad" @input="calcularTotal" prepend-icon="mdi-cart"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="formularioL.total" label="Total"></v-text-field>
                </v-col>
              </v-row>
              <v-btn block text color="#008080" @click="generarVenta">
                <v-icon left> </v-icon> Guardar Venta
              </v-btn>


              <v-btn block text color="success" @click="exportarPDF">
                <v-icon left>mdi-printer</v-icon> Imprimir PDF
              </v-btn>
              <!-- Contenido que deseas incluir en el PDF -->
            </v-card-text>


          </v-card>
        </v-col>

      </v-row>
    </v-container>
    <Buscarlibro @libro-agregado="llenarFormularioS" />
  </div>
</template>

<script>
import Buscarlibro from '@/components/Ventas/buscarlibro.vue';
//import html2pdf from 'html2pdf.js';
//import html2canvas from 'html2canvas';
import imagenLogo from '@/components/Ventas/Logo.jpg';
import jsPDF from 'jspdf';
import axios from 'axios'

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
        cedula: "",
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
      }
    };
  },
  methods: {
    async buscarEstudiantes() {
      try {
        const response = await fetch(`http://127.0.0.1:1659/buscar?matricula=${this.matricula}&nombre=${this.nombre}`);
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

    llenarFormularioS(libro) {
      // Llenar el formulario con los datos del libro seleccionado
      this.formularioL.nombre = libro.nombre;
      this.formularioL.codigo = libro.codigo;
      this.formularioL.categoria = libro.categoria;
      this.formularioL.precio = libro.precio;
      this.formularioL.total = libro.total;

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
    async generarVenta() {
      try {
        // Guardar la venta en la API
        const ventaData = {

          codigo: this.formularioL.codigo,
          cantidad: 1,
        };

        const response = await axios.post('http://127.0.0.1:51339/Ventas', ventaData);

        // Lógica para manejar la respuesta exitosa y limpiar el formulario
        console.log('Venta guardada:', response.data);




      } catch (error) {
        // Lógica para manejar el error
        console.error('Error al guardar la venta:', error);
      }
    },

    exportarPDF() {
      const options = {
        margin: 10,
        filename: 'documento.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      //const pdfContent = document.createElement('div');
      const pdf = new jsPDF(options.jsPDF);

      pdf.addImage(imagenLogo, 'JPEG', 0, 2, 42, 42);

      pdf.setFontSize(12); // Set the font size
      pdf.setFont('helvetica', 'bold');
      pdf.text("RECIBO DE VENTA DE LIBROS", 80, 15);
      pdf.text("___________________________________________________________", 42, 20);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Nombres:", 42, 35);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${this.formulario.nombre} ${this.formulario.apellidoPaterno} ${this.formulario.apellidoMaterno}`, 70, 35);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Cédula:", 42, 45);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${this.formulario.cedula} ${this.formulario.cedulaComplemento ? '- ' + this.formulario.cedulaComplemento : ''}`,70, 45);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Email: ", 42, 55);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${this.formulario.email}`, 70, 55);

      // Additional data
      pdf.setFont('helvetica', 'bold');
      pdf.text("Detalles de Venta", 80, 70);
      pdf.text("______________________________________________________________________________", 20, 72);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Nombre libro:", 38, 82);
      pdf.setFont('helvetica', 'normal');
      pdf.text(this.formularioL.nombre, 70, 82);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Código:", 38, 92);
      pdf.setFont('helvetica', 'normal');
      pdf.text(this.formularioL.codigo, 70, 92);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Categoría:", 38, 102);
      pdf.setFont('helvetica', 'normal');
      pdf.text(this.formularioL.categoria, 70, 102);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Precio:", 38, 112);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`$ ${this.formularioL.precio}`, 70, 112);

      pdf.setFont('helvetica', 'bold');
      pdf.text("Cantidad:", 38, 122);
      pdf.setFont('helvetica', 'normal');
      pdf.text(this.formularioL.cantidad, 70, 122);
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      pdf.text(`Fecha: ${formattedDate}`, 80, 154);

      // Calculate and display total
      const cantidad = parseInt(this.formularioL.cantidad);
      const precio = parseFloat(this.formularioL.precio);
      const total = precio * cantidad;
      pdf.rect(120, 122, 60, 12, 'S');
      pdf.setFont('helvetica', 'bold');
      pdf.text("Total:", 120, 132);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`$ ${total.toFixed(2)}`, 150, 132);
      pdf.setFontSize(10);
      pdf.text("Escuela de Idiomas del Ejercito Filial Cochabamba,", 10, 160);
      pdf.text("Direccion: Av. Del Ejercito, Cochabamba", 92, 160);
      pdf.text("Telefono: 4534083", 158, 160);

      pdf.save(options.filename);
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
