import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { ordenSubscripcion } from '../../../models/ordenSubscripcion-model';
import { OrdenSubscripcionService } from '../../../services/orden-subscripcion-service';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-orden-subscripcion-list',
  standalone: false,
  templateUrl: './orden-subscripcion-list.html',
  styleUrl: './orden-subscripcion-list.css',
})
export class OrdenSubscripcionList implements OnInit {
  dsOrdenes = new MatTableDataSource<ordenSubscripcion>();
  displayedColumns: string[] = ['id', 'estado', 'inicio', 'fin', 'acciones'];

  constructor(
    private ordenSubscripcionService: OrdenSubscripcionService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      this.snack.open('Tu sesion no esta activa. Inicia sesion de nuevo.', 'OK', { duration: 3500 });
      this.router.navigate(['/login']);
      return;
    }

    const roles = this.usuarioService.getAuthorities();
    const normalized = roles.map((r) => r.toUpperCase());
    console.log('Roles en orden-subscripcion-list:', normalized);

    this.cargarLista();
  }

  cargarLista(): void {
    this.ordenSubscripcionService.listAll().subscribe({
      next: (data) => {
        const normalizados = (data || []).map((item: any) => ({
          idOrdenSubscripcion: item.idOrdenSubscripcion,
          estado: item.estado ?? item.Estado ?? '',
          fechaInicio: item.fechaInicio ?? item.FechaInicio ?? '',
          fechaFin: item.fechaFin ?? item.FechaFin ?? '',
        }));
        console.log('Ordenes recibidas:', normalizados);
        this.dsOrdenes.data = normalizados;
      },
      error: (err) => {
        console.log(err);
        if (err.status === 401) {
          this.snack.open('Sesion expirada o sin permisos. Inicia sesion nuevamente.', 'OK', { duration: 3500 });
          this.router.navigate(['/login']);
          return;
        }
        this.snack.open('ERROR: no se pudo obtener la lista de ordenes de subscripcion', 'OK', {
          duration: 4000,
        });
      },
    });
  }

  borrar(idOrdenSubscripcion: number): void {
    const dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe((opcionSelecionada) => {
      if (opcionSelecionada) {
        this.ordenSubscripcionService.delete(idOrdenSubscripcion).subscribe({
          next: () => {
            this.snack.open('Se elimino la orden seleccionada', 'OK', { duration: 2000 });
            this.cargarLista();
          },
          error: (http_error) => {
            this.snack.open(
              'ERROR: no se elimino la orden seleccionada. ' + (http_error.error?.message || ''),
              'OK',
              { duration: 5000 }
            );
            console.log(http_error);
          },
        });
      }
    });
  }
}
