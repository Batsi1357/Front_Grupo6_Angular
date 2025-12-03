import { Component, OnInit } from '@angular/core';
import { UnidadService } from '../../../services/unidad-service';
import { unidad } from '../../../models/unidad-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidad-queries',
  standalone: false,
  templateUrl: './unidad-queries.html',
  styleUrl: './unidad-queries.css',
})
export class UnidadQueries implements OnInit {
  unidades: unidad[] = [];
  unidadesFiltradas: unidad[] = [];

  // Variables de búsqueda
  busquedaCategoria: string = '';
  busquedaNivel: number = 1;
  busquedaDuracion: number = 0;
  busquedaTitulo: string = '';

  queryActiva: string = 'todas'; // 'todas', 'categoria', 'nivel', 'duracion', 'titulo'
  cargando: boolean = false;
  mensaje: string = '';

  constructor(private unidadService: UnidadService, private router: Router) {}

  ngOnInit(): void {
    this.cargarTodas();
  }

  cargarTodas(): void {
    this.cargando = true;
    this.queryActiva = 'todas';
    this.unidadService.list().subscribe({
      next: (data) => {
        console.log('Datos de unidades recibidos:', data);
        if (data && data.length > 0) {
          console.log('Estructura de primera unidad:', Object.keys(data[0]));
          console.log('Primera unidad completa:', JSON.stringify(data[0], null, 2));
          this.unidades = this.transformarDatos(data);
        }
        this.unidadesFiltradas = this.unidades;
        this.cargando = false;
        this.mensaje = `${this.unidades.length} unidades encontradas`;
      },
      error: (err) => {
        console.error('Error al cargar unidades:', err);
        this.cargando = false;
        this.mensaje = 'Error al cargar unidades';
      }
    });
  }

  private transformarDatos(data: any[]): unidad[] {
    return data.map((item, index) => {
      // Log para debugging en desarrollo
      if (index === 0) {
        console.log('Raw item:', item);
        console.log('Item keys:', Object.keys(item));
      }
      
      return {
        idUnidad: item.idUnidad || item.id || item.ID || 0,
        titulo: item.titulo || item.Titulo || item.TITULO || '',
        categoria: item.categoria || item.Categoria || item.CATEGORIA || '',
        nivel: item.nivel || item.Nivel || item.NIVEL || 1,
        duracion: item.duracion || item.Duracion || item.DURACION || 0,
        descripcion: item.descripcion || item.Descripcion || item.DESCRIPCION || '',
        logo: item.logo || null
      };
    });
  }

  // Query 1: Buscar por categoría exacta
  buscarPorCategoria(): void {
    if (!this.busquedaCategoria.trim()) {
      this.mensaje = 'Ingrese una categoría para buscar';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'categoria';
    this.unidadService.buscarPorCategoria(this.busquedaCategoria).subscribe({
      next: (data) => {
        this.unidadesFiltradas = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} unidad(es) encontrada(s) con categoría "${this.busquedaCategoria}"`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  // Query 2: Buscar por nivel >=
  buscarPorNivel(): void {
    if (this.busquedaNivel < 1) {
      this.mensaje = 'Ingrese un nivel válido (>= 1)';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'nivel';
    this.unidadService.buscarPorNivel(this.busquedaNivel).subscribe({
      next: (data) => {
        this.unidadesFiltradas = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} unidad(es) encontrada(s) con nivel >= ${this.busquedaNivel}`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  // SQL Nativo: Buscar por duración mínima
  buscarPorDuracion(): void {
    if (this.busquedaDuracion <= 0) {
      this.mensaje = 'Ingrese una duración válida (> 0)';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'duracion';
    this.unidadService.buscarPorDuracion(this.busquedaDuracion).subscribe({
      next: (data) => {
        this.unidadesFiltradas = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} unidad(es) encontrada(s) con duración >= ${this.busquedaDuracion}`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  // JPQL: Buscar por título contiene
  buscarPorTitulo(): void {
    if (!this.busquedaTitulo.trim()) {
      this.mensaje = 'Ingrese un texto para buscar';
      return;
    }
    this.cargando = true;
    this.queryActiva = 'titulo';
    this.unidadService.buscarPorTitulo(this.busquedaTitulo).subscribe({
      next: (data) => {
        this.unidadesFiltradas = this.transformarDatos(data);
        this.cargando = false;
        this.mensaje = `${data.length} unidad(es) encontrada(s) que contienen "${this.busquedaTitulo}"`;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.mensaje = 'Error en la búsqueda';
      }
    });
  }

  limpiarBusqueda(): void {
    this.busquedaCategoria = '';
    this.busquedaNivel = 1;
    this.busquedaDuracion = 0;
    this.busquedaTitulo = '';
    this.cargarTodas();
  }

  volverAlHome(): void {
    this.router.navigate(['/home']);
  }
}
