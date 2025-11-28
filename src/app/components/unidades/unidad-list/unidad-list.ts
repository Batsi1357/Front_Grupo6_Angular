import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { unidad } from '../../../models/unidad-model';
import { UnidadService } from '../../../services/unidad-service';

@Component({
  selector: 'app-unidad-list',
  standalone: false,
  templateUrl: './unidad-list.html',
  styleUrl: './unidad-list.css',
})
export class UnidadList implements OnInit {
  dsUnidad = new MatTableDataSource<unidad>();
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'nivel', 'categoria', 'duracion', 'acciones'];

  constructor(
    private unidadService: UnidadService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.CargarLista();
  }

  CargarLista(): void {
    this.unidadService.listAll().subscribe({
      next: (data: unidad[]) => {
        data.forEach((u: unidad) => {
          if (u.logo) {
            u.logo = 'data:image/jpeg;base64,' + u.logo;
          }
        });
        this.dsUnidad = new MatTableDataSource(data);
      },
      error: (err) => {
        console.log(err);
        this.snack.open('ERROR: No se pudo obtener la lista de unidades', 'OK', { duration: 4000 });
      },
    });
  }

  Borrar(idUnidad: number): void {
    const dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe((opcionSelecionada) => {
      if (opcionSelecionada) {
        this.unidadService.deletebyId(idUnidad).subscribe({
          next: () => {
            this.snack.open('Se elimino el registro solicitado', 'OK', { duration: 2000 });
            this.CargarLista();
          },
          error: (http_error) => {
            this.snack.open(
              'ERROR: No se elimino el registro solicitado. ' + http_error.error.message,
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
