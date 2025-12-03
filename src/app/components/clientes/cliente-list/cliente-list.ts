import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente-service';
import { cliente } from '../../../models/cliente-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: false,
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css',
})
export class ClienteList implements OnInit {
  clientes: cliente[] = [];
  clientesFiltrados: cliente[] = [];

  // Variables de búsqueda
  busquedaEmail: string = '';
  busquedaDominio: string = '';
  busquedaEdad: number = 0;
  busquedaTexto: string = '';

  queryActiva: string = 'todas'; // 'todas', 'email', 'dominio', 'edad', 'texto'
  cargando: boolean = false;
  mensaje: string = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.cargarTodos();
  }

  cargarTodos(): void {
    this.cargando = true;
    this.queryActiva = 'todas';
    this.clienteService.list().subscribe({
      next: (data) => {
        console.log('Datos de clientes recibidos:', data);
        if (data && data.length > 0) {
          console.log('Estructura del primer cliente:', Object.keys(data[0]));
          console.log('Primer cliente completo:', JSON.stringify(data[0], null, 2));
          // Transformar los datos si es necesario
          this.clientes = this.transformarDatos(data);
        }
        this.clientesFiltrados = this.clientes;
        this.cargando = false;
        this.mensaje = `${this.clientes.length} clientes encontrados`;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.cargando = false;
        this.mensaje = 'Error al cargar clientes';
      }
    });
  }

  private transformarDatos(data: any[]): cliente[] {
    return data.map((item, index) => {
      // Log para debugging en desarrollo
      if (index === 0) {
        console.log('Raw item:', item);
        console.log('Item keys:', Object.keys(item));
      }
      
      return {
        idCliente: item.idCliente || item.id || item.ID || 0,
        Nombre: item.Nombre || item.nombre || item.NOMBRE || item.Nombre || '',
        Apellido: item.Apellido || item.apellido || item.APELLIDO || item.apellido || '',
        Direccion: item.Direccion || item.direccion || item.DIRECCION || item.direccion || '',
        Celular: item.Celular || item.celular || item.CELULAR || item.telefono || item.celular || '',
        email: item.email || item.Email || item.EMAIL || '',
        edad: item.edad || item.Edad || item.EDAD || 0
      };
    });
  }

  // Query 1: Buscar por email exacto
  buscarPorEmail(): void {
    if (!this.busquedaEmail.trim()) {
      this.mensaje = 'Ingrese un email para buscar';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'email';
    this.clienteService.buscarPorEmail(this.busquedaEmail).subscribe({
      next: (data) => {
        this.clientesFiltrados = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} cliente(s) encontrado(s) con email "${this.busquedaEmail}"`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  // Query 2: Buscar por dominio de email
  buscarPorDominio(): void {
    if (!this.busquedaDominio.trim()) {
      this.mensaje = 'Ingrese un dominio para buscar (ej: @gmail.com)';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'dominio';
    this.clienteService.buscarPorDominio(this.busquedaDominio).subscribe({
      next: (data) => {
        this.clientesFiltrados = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} cliente(s) encontrado(s) con dominio "${this.busquedaDominio}"`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  // Query 3: Buscar por edad mínima
  buscarPorEdad(): void {
    if (this.busquedaEdad <= 0) {
      this.mensaje = 'Ingrese una edad válida';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'edad';
    this.clienteService.buscarPorEdadMinima(this.busquedaEdad).subscribe({
      next: (data) => {
        this.clientesFiltrados = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} cliente(s) encontrado(s) con edad >= ${this.busquedaEdad}`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  // Query 4: Buscar por nombre o apellido
  buscarPorTexto(): void {
    if (!this.busquedaTexto.trim()) {
      this.mensaje = 'Ingrese un texto para buscar';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'texto';
    this.clienteService.buscarPorNombreOApellido(this.busquedaTexto).subscribe({
      next: (data) => {
        this.clientesFiltrados = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} cliente(s) encontrado(s) que contienen "${this.busquedaTexto}"`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  limpiarBusqueda(): void {
    this.busquedaEmail = '';
    this.busquedaDominio = '';
    this.busquedaEdad = 0;
    this.busquedaTexto = '';
    this.cargarTodos();
  }

  volverAlHome(): void {
    this.router.navigate(['/home']);
  }
}
