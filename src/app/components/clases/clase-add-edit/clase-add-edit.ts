import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClaseService } from '../../../services/clase-service';
import { clase } from '../../../models/clase-model';
import { UnidadService } from '../../../services/unidad-service';
import { unidad } from '../../../models/unidad-model';

@Component({
  selector: 'app-clase-add-edit',
  standalone: false,
  templateUrl: './clase-add-edit.html',
  styleUrl: './clase-add-edit.css',
})
export class ClaseAddEdit implements OnInit {
  crudForm!: FormGroup;
  idClase = 0;
  unidades: unidad[] = [];

  constructor(
    private fb: FormBuilder,
    private claseService: ClaseService,
    private unidadService: UnidadService,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarUnidades();
  }

  cargarUnidades(): void {
    this.unidadService.listAll().subscribe({
      next: (lista) => (this.unidades = lista || []),
      error: (err) => {
        console.log(err);
        this.snack.open('No se pudo cargar la lista de unidades', 'OK', { duration: 4000 });
      },
    });
  }

  cargarFormulario(): void {
    this.crudForm = this.fb.group({
      idClase: [''],
      ClasePersonalizada: ['', [Validators.required, Validators.minLength(2)]],
      unidadId: [null, Validators.required],
    });

    const paramId = this.route.snapshot.params['id'];
    this.idClase = paramId ? parseInt(paramId, 10) : 0;

    if (this.idClase > 0 && !Number.isNaN(this.idClase)) {
      this.claseService.listById(this.idClase).subscribe({
        next: (data: any) => {
          // If backend returns wrapper or different property names, normalize
          const record = Array.isArray(data) ? data[0] : data?.value ? data.value[0] : data;
          const nombre = record?.ClasePersonalizada ?? record?.clasePersonalizada ?? record?.clasepersonalizada ?? record?.clase ?? '';
          this.crudForm.patchValue({
            idClase: record?.idClase ?? record?.id ?? this.idClase,
            ClasePersonalizada: nombre,
            unidadId: record?.unidadId ?? record?.unidad_id ?? record?.unidad?.idUnidad ?? null,
          });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('ERROR: no se pudo cargar la clase', 'OK', { duration: 4000 });
          this.router.navigate(['/clase-list']);
        },
      });
    }
  }

  grabar(): void {
    if (this.crudForm.invalid) {
      this.crudForm.markAllAsTouched();
      return;
    }

    const payload: any = {
      idClase: this.crudForm.get('idClase')?.value || 0,
      // Mandamos ambas variantes de nombre de campo para que Jackson/DTO las mapee
      clasePersonalizada: this.crudForm.get('ClasePersonalizada')?.value,
      ClasePersonalizada: this.crudForm.get('ClasePersonalizada')?.value,
      // Enviamos ambas variantes para asegurar compatibilidad con el DTO (UnidadId/ unidadId)
      unidadId: Number(this.crudForm.get('unidadId')?.value),
      UnidadId: Number(this.crudForm.get('unidadId')?.value),
    };

    if (payload.idClase > 0) {
      this.claseService.update(payload).subscribe({
        next: () => {
          this.snack.open('Clase actualizada correctamente', 'OK', { duration: 2000 });
          this.router.navigate(['/clase-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo actualizar la clase';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.log(http_error);
        },
      });
    } else {
      this.claseService.new(payload).subscribe({
        next: () => {
          this.snack.open('Clase creada correctamente', 'OK', { duration: 2000 });
          this.router.navigate(['/clase-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo crear la clase';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.log(http_error);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/clase-list']);
  }
}
 
