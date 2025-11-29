import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { respuesta } from '../../../models/respuesta-model';
import { RespuestaService } from '../../../services/respuesta-service';

@Component({
  selector: 'app-respuesta-list',
  standalone: false,
  templateUrl: './respuesta-list.html',
  styleUrl: './respuesta-list.css',
})
export class RespuestaList implements OnInit {
  dsRespuestas = new MatTableDataSource<respuesta>();
  displayedColumns: string[] = ['id', 'texto', 'respuesta', 'acciones'];

  constructor(
    private respuestaService: RespuestaService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.respuestaService.listAll().subscribe({
      next: (data: any) => {
        const lista =
          Array.isArray(data)
            ? data
            : data?.content ||
              data?.items ||
              data?.lista ||
              data?.respuestas ||
              data?.data ||
              [];
        console.log('Respuesta listAll raw:', data);
        console.log('Respuesta lista mapeada:', lista);

        const normalizados = (lista || []).map((r: any) => ({
          idRespuesta: r.idRespuesta ?? r.id_respuesta ?? r.id ?? 0,
          Texto: r.Texto ?? r.texto ?? '',
          Respuesta: r.Respuesta ?? r.respuesta ?? '',
        }));
        this.dsRespuestas.data = normalizados as respuesta[];
      },
      error: (err) => {
        console.log(err);
        this.snack.open('ERROR: no se pudo obtener la lista de respuestas', 'OK', { duration: 4000 });
      },
    });
  }

  borrar(idRespuesta: number): void {
    const dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe((opcionSeleccionada) => {
      if (opcionSeleccionada) {
        this.respuestaService.delete(idRespuesta).subscribe({
          next: () => {
            this.snack.open('Se eliminó la respuesta seleccionada', 'OK', { duration: 2000 });
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
