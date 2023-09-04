// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth/Login.vue'),
  }, {
    path: '/recuperacion',
    name: 'Recuperacion',
    component: () => import('@/components/auth/Recuperacion.vue'),
  }, {
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/inicio',
        name: 'Inicio',
        component: () => import('@/views/Inicio.vue'),
      }, {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('@/components/auth/Perfil.vue'),
      }, {
        path: '/modulos',
        children: [
          {
            path: '',
            name: 'ModulosIndex',
            component: () => import('@/components/modulos/Index.vue'),
          }, {
            path: ':id',
            name: 'ModulosForm',
            component: () => import('@/components/modulos/Form.vue'),
          },
        ],
      },
      {
        path: '/Dashboard',
        children: [
          {
            path: '',
            name: 'inicioDashboard',
            component: () => import('@/components/Dashboard/dashboard.vue'),
          },
          {
            path: '/compras',
            name: 'Compras',
            component: () => import('@/components/Dashboard/Compras/compras.vue'),
          },
          {
            path: '/estudent',
            name: 'estudent',
            component: () => import('@/components/Dashboard/Estudiantes/estudiantes.vue'),
          },
        ],
      },

      {
        path: '/estudiantes',
        children: [
          {
            path: '',
            name: 'EstudiantesIndex',
            component: () => import('@/components/estudiantes/Index.vue'),
          }, {
            path: ':id',
            name: 'EstudiantesForm',
            component: () => import('@/components/estudiantes/Form.vue'),
          },
        ],
      },
      {
        path: '/repoortes',
        children: [
          {
            path: '/inscripciones',
            name: 'ReportesInscripciones',
            component: () => import('@/components/reportes/Inscripciones.vue'),
          },
          {
            path: '/ReportesNotas',
            name: 'ReportesNotas',
            component: () => import('@/components/reportes/Notas.vue'),
          },
        ],
      },

      {
        path: '/estudiantedemo',
        children: [
          {
            path: ':id',
            name: 'EstudiantesDemo',
            component: () => import('@/components/notas/show.vue'),
          },
        ],
      },
      {
        path: '/notas',
        children: [
          {
            path: '',
            name: 'CursoForm',
            component: () => import('@/components/notas/index.vue'),
          },
          {
            path: ':id',
            name: 'EstudiantesForm',
            component: () => import('@/components/notas/show.vue'),
          },
          {
            path: ':id/addNotas',
            name: 'addNotasIndex',
            component: () => import('@/components/notas/Addnotas.vue'),
          }
        ],
      },
      {
        path: '/compras',
        children: [
          {
            path: '',
            name: 'compras',
            component: () => import('@/components/Compras/compras.vue'),
          },
          {
            path: '',
            name: 'ventas',
            component: () => import('@/components/Ventas/ventas.vue'),
          },
          {
            path: '',
            name: 'Pagosmensu',
            component: () => import('@/components/PagosMensu/Pagos.vue'),
          }
          ,
        ],
      },


      {
        path: '/firmas',
        children: [
          {
            path: '',
            name: 'FirmasForm',
            component: () => import('@/components/firmas/Form.vue'),
          },
        ],
      }, {
        path: '/ciudades',
        children: [
          {
            path: '',
            name: 'CiudadesIndex',
            component: () => import('@/components/ciudades/Index.vue'),
          }, {
            path: ':id',
            name: 'CiudadesForm',
            component: () => import('@/components/ciudades/Form.vue'),
          },
        ],
      }, {
        path: '/parentescos',
        children: [
          {
            path: '',
            name: 'ParentescosIndex',
            component: () => import('@/components/parentescos/Index.vue'),
          }, {
            path: ':id',
            name: 'ParentescosForm',
            component: () => import('@/components/parentescos/Form.vue'),
          },
        ],
      }, {
        path: '/filiales',
        children: [
          {
            path: '',
            name: 'FilialesIndex',
            component: () => import('@/components/filiales/Index.vue'),
          }, {
            path: ':id',
            name: 'FilialesForm',
            component: () => import('@/components/filiales/Form.vue'),
          },
        ],
      }, {
        path: '/idiomas',
        children: [
          {
            path: '',
            name: 'IdiomasIndex',
            component: () => import('@/components/idiomas/Index.vue'),
          }, {
            path: ':id',
            name: 'IdiomasForm',
            component: () => import('@/components/idiomas/Form.vue'),
          }, {
            path: ':id/niveles',
            name: 'NivelesIndex',
            component: () => import('@/components/idiomas/niveles/Index.vue'),
          }
        ],
      }, {
        path: '/libros',
        children: [
          {
            path: '',
            name: 'LibrosIndex',
            component: () => import('@/components/libros/Index.vue'),
          }, {
            path: ':id',
            name: 'LibrosForm',
            component: () => import('@/components/libros/Form.vue'),
          },
        ],
      }, {
        path: '/roles',
        children: [
          {
            path: '',
            name: 'RolesIndex',
            component: () => import('@/components/roles/Index.vue'),
          }, {
            path: ':id',
            name: 'RolesForm',
            component: () => import('@/components/roles/Form.vue'),
          },
        ],
      }, {
        path: '/usuarios',
        children: [
          {
            path: '',
            name: 'UsuariosIndex',
            component: () => import('@/components/usuarios/Index.vue'),
          }, {
            path: ':id',
            name: 'UsuariosForm',
            component: () => import('@/components/usuarios/Form.vue'),
          },
        ],
      }, {
        path: '/cursos',
        children: [
          {
            path: '',
            name: 'CursosIndex',
            component: () => import('@/components/cursos/Index.vue'),
          }, {
            path: ':id',
            name: 'CursosForm',
            component: () => import('@/components/cursos/Form.vue'),
          },
        ],
      }, {
        path: '/inscripciones',
        children: [
          {
            path: '',
            name: 'InscripcionesIndex',
            component: () => import('@/components/inscripciones/Index.vue'),
          }, {
            path: ':id',
            name: 'InscripcionesForm',
            component: () => import('@/components/inscripciones/Form.vue'),
          },
        ],
      }, {
        path: '/modalidades',
        children: [
          {
            path: '',
            name: 'ModalidadesIndex',
            component: () => import('@/components/modalidades/Index.vue'),
          }, {
            path: ':id',
            name: 'ModalidadesForm',
            component: () => import('@/components/modalidades/Form.vue'),
          },
        ],
      }, {
        path: '/fuerzas',
        children: [
          {
            path: '',
            name: 'FuerzasIndex',
            component: () => import('@/components/fuerzas/Index.vue'),
          }, {
            path: ':id',
            name: 'FuerzasForm',
            component: () => import('@/components/fuerzas/Form.vue'),
          },
        ],
      }, {
        path: '/tipos_estudiante',
        children: [
          {
            path: '',
            name: 'TiposEstudianteIndex',
            component: () => import('@/components/tipos_estudiante/Index.vue'),
          }, {
            path: ':id',
            name: 'TiposEstudianteForm',
            component: () => import('@/components/tipos_estudiante/Form.vue'),
          },
        ],
      }, {
        path: '/estudiantes',
        children: [
          {
            path: '',
            name: 'EstudiantesIndex',
            component: () => import('@/components/estudiantes/Index.vue'),
          }, {
            path: ':id',
            name: 'EstudiantesForm',
            component: () => import('@/components/estudiantes/Form.vue'),
          },
        ],
      }, {
        path: '/pre_inscripciones',
        children: [
          {
            path: '',
            name: 'PreInscripcionesIndex',
            component: () => import('@/components/pre_inscripciones/Index.vue'),
          }, {
            path: ':id',
            name: 'PreInscripcionesForm',
            component: () => import('@/components/pre_inscripciones/Form.vue'),
          },
        ],
      }, {
        path: '/repoortes',
        children: [
          {
            path: 'inscripciones',
            name: 'ReportesInscripciones',
            component: () => import('@/components/reportes/Inscripciones.vue'),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
