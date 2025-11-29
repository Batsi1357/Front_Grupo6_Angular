import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { subscripcion } from '../../../models/subscripcion-model';
import { SubscripcionService } from '../../../services/subscripcion-service';

@Component({
  selector: 'app-subscripcion-list',
  standalone: false,
  templateUrl: './subscripcion-list.html',
  styleUrl: './subscripcion-list.css',
})
export class SubscripcionList implements OnInit {
  dsSubscripciones = new MatTableDataSource<subscripcion>();
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'acciones'];

  constructor(
    private subscripcionService: SubscripcionService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.subscripcionService.listAll().subscribe({
      next: (data) => {
        this.dsSubscripciones.data = data || [];
      },
      error: (err) => {
        console.log(err);
        this.snack.open('ERROR: no se pudo obtener la lista de subscripciones', 'OK', {
          duration: 4000,
        });
      },
    });
  }

  borrar(idSubscripcion: number): void {
    const dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe((opcionSeleccionada) => {
      if (opcionSeleccionada) {
        this.subscripcionService.delete(idSubscripcion).subscribe({
          next: () => {
            this.snack.open('Se eliminó la subscripción seleccionada', 'OK', { duration: 2000 });
            this.cargarLista();
          },
          error: (http_error) => {
            const msg = http_error?.error?.message || 'No se eliminó el registro solicitado.';
            this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
            console.log(http_error);
          },
        });
      }
    });
  }
}
