import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { oportunidad } from '../../../models/oportunidad-model';
import { OportunidadService } from '../../../services/oportunidad-service';

@Component({
  selector: 'app-oportunidad-add-edit',
  standalone: false,
  templateUrl: './oportunidad-add-edit.html',
  styleUrl: './oportunidad-add-edit.css',
})
export class OportunidadAddEdit implements OnInit {
  crudForm!: FormGroup;
  idOportunidad: number | null = null;
  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private oportunidadService: OportunidadService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.idOportunidad = params['id'];
        this.esEdicion = true;
        this.cargarOportunidad(this.idOportunidad as number);
      }
    });
  }

  inicializarForm(): void {
    this.crudForm = this.fb.group({
      Intento: ['', [Validators.required, Validators.min(1)]],
      FechaInicio: ['', Validators.required],
    });
  }

  cargarOportunidad(id: number): void {
    this.oportunidadService.getById(id).subscribe({
      next: (data: any) => {
        this.crudForm.patchValue({
          Intento: data.Intento ?? data.intento ?? '',
          FechaInicio: data.FechaInicio ?? data.fecha_inicio ?? '',
        });
      },
      error: () => {
        this.snack.open('ERROR: no se pudo cargar la oportunidad', 'OK', { duration: 4000 });
        this.router.navigate(['/oportunidad-list']);
      },
    });
  }

  grabar(): void {
    if (this.crudForm.invalid) {
      this.crudForm.markAllAsTouched();
      return;
    }

    const datos: oportunidad = {
      idOportunidad: this.idOportunidad || 0,
      Intento: this.crudForm.get('Intento')?.value,
      FechaInicio: this.crudForm.get('FechaInicio')?.value,
    };

    if (this.esEdicion) {
      this.oportunidadService.update(datos).subscribe({
        next: () => {
          this.snack.open('Oportunidad actualizada correctamente', 'OK', { duration: 2000 });
          this.router.navigate(['/oportunidad-list']);
        },
        error: (err) => {
          const msg = err?.error?.message || 'No se pudo actualizar la oportunidad';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
        },
      });
    } else {
      this.oportunidadService.create(datos).subscribe({
        next: () => {
          this.snack.open('Oportunidad creada correctamente', 'OK', { duration: 2000 });
          this.router.navigate(['/oportunidad-list']);
        },
        error: (err) => {
          const msg = err?.error?.message || 'No se pudo crear la oportunidad';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/oportunidad-list']);
  }
}
