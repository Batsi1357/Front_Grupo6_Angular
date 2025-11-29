import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { pregunta } from '../../../models/pregunta-model';
import { PreguntaService } from '../../../services/pregunta-service';

@Component({
  selector: 'app-pregunta-list',
  standalone: false,
  templateUrl: './pregunta-list.html',
  styleUrl: './pregunta-list.css',
})
export class PreguntaList implements OnInit {
  dsPreguntas = new MatTableDataSource<pregunta>();
  displayedColumns: string[] = ['id', 'enunciado', 'tipo', 'puntaje', 'acciones'];

  constructor(
    private preguntaService: PreguntaService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.preguntaService.listAll().subscribe({
      next: (data) => {
        const normalizados = (data || []).map((p: any) => ({
          idPregunta: p.idPregunta ?? p.id_pregunta ?? p.id ?? 0,
          Enunciado: p.Enunciado ?? p.enunciado ?? '',
          Tipo: p.Tipo ?? p.tipo ?? '',
          Puntaje: p.Puntaje ?? p.puntaje ?? 0,
        }));
        this.dsPreguntas.data = normalizados as pregunta[];
      },
      error: (err) => {
        console.log(err);
        this.snack.open('ERROR: no se pudo obtener la lista de preguntas', 'OK', { duration: 4000 });
      },
    });
  }

  borrar(idPregunta: number): void {
    const dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe((opcionSeleccionada) => {
      if (opcionSeleccionada) {
        this.preguntaService.delete(idPregunta).subscribe({
          next: () => {
            this.snack.open('Se eliminó la pregunta seleccionada', 'OK', { duration: 2000 });
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
