import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente-service';
import { cliente } from '../../../models/cliente-model';

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

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarTodos();
  }

  cargarTodos(): void {
    this.cargando = true;
    this.queryActiva = 'todas';
    this.clienteService.list().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = data;
        this.cargando = false;
        this.mensaje = `${data.length} clientes encontrados`;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.cargando = false;
        this.mensaje = 'Error al cargar clientes';
      }
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
        this.clientesFiltrados = data;
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
        this.clientesFiltrados = data;
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
        this.clientesFiltrados = data;
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
        this.clientesFiltrados = data;
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
}
