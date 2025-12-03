import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { oportunidad } from '../../../models/oportunidad-model';
import { OportunidadService } from '../../../services/oportunidad-service';

@Component({
  selector: 'app-oportunidad-list',
  standalone: false,
  templateUrl: './oportunidad-list.html',
  styleUrl: './oportunidad-list.css',
})
export class OportunidadList implements OnInit {
  dsOportunidades = new MatTableDataSource<oportunidad>();
  displayedColumns: string[] = ['id', 'intento', 'fecha_inicio', 'acciones'];

  constructor(
    private oportunidadService: OportunidadService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.oportunidadService.listAll().subscribe({
      next: (data) => {
        const normalizados = (data || []).map((item: any) => {
          let fechaRaw: any = item.FechaInicio ?? item.fecha_inicio ?? item.fechaInicio ?? item.fecha_inicio_oportunidad ?? null;
          // If fechaRaw is an object (e.g. nested evaluacion), try common fields
          if (fechaRaw && typeof fechaRaw === 'object') {
            fechaRaw = fechaRaw.FechaInicio ?? fechaRaw.fecha_inicio ?? fechaRaw.fechaInicio ?? fechaRaw.fecha ?? null;
          }
          // If it's a string like 'yyyy-MM-dd' convert to Date to ensure date pipe renders
          if (typeof fechaRaw === 'string' && /^\d{4}-\d{2}-\d{2}/.test(fechaRaw)) {
            fechaRaw = new Date(fechaRaw);
          }
          return {
            idOportunidad: item.idOportunidad ?? item.id_oportunidad ?? item.id ?? 0,
            Intento: item.Intento ?? item.intento ?? 0,
            FechaInicio: fechaRaw ?? '',
          } as any;
        });
        this.dsOportunidades.data = normalizados as oportunidad[];
      },
      error: (err) => {
        console.log(err);
        this.snack.open('ERROR: no se pudo obtener la lista de oportunidades', 'OK', {
          duration: 4000,
        });
      },
    });
  }

  borrar(idOportunidad: number): void {
    const dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe((opcionSeleccionada) => {
      if (opcionSeleccionada) {
        this.oportunidadService.delete(idOportunidad).subscribe({
          next: () => {
            this.snack.open('Se eliminó la oportunidad seleccionada', 'OK', { duration: 2000 });
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
