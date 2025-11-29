import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { clase } from '../../../models/clase-model';
import { ClaseService } from '../../../services/clase-service';

@Component({
  selector: 'app-clase-list',
  standalone: false,
  templateUrl: './clase-list.html',
  styleUrl: './clase-list.css',
})
export class ClaseList implements OnInit {
  dsClases = new MatTableDataSource<clase>();
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  constructor(
    private claseService: ClaseService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.claseService.listAll().subscribe({
      next: (data: any) => {
        // Some backends return a wrapper { value: [...], Count: n }
        const items = Array.isArray(data) ? data : data?.value ?? [];
        const normalized = (items || []).map((it: any) => ({
          idClase: it.idClase ?? it.id ?? 0,
          ClasePersonalizada: it.ClasePersonalizada ?? it.clasePersonalizada ?? it.clasepersonalizada ?? it.clase ?? '',
        } as clase));
        this.dsClases = new MatTableDataSource(normalized);
      },
      error: (err) => {
        console.log(err);
        this.snack.open('ERROR: no se pudo obtener la lista de clases', 'OK', { duration: 4000 });
      },
    });
  }

  borrar(idClase: number): void {
    const dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe((opcionSeleccionada) => {
      if (opcionSeleccionada) {
        this.claseService.delete(idClase).subscribe({
          next: () => {
            this.snack.open('Se eliminó la clase seleccionada', 'OK', { duration: 2000 });
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
