import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { subscripcion } from '../../../models/subscripcion-model';
import { SubscripcionService } from '../../../services/subscripcion-service';
import { ClaseService } from '../../../services/clase-service';
import { clase } from '../../../models/clase-model';

@Component({
  selector: 'app-subscripcion-add-edit',
  standalone: false,
  templateUrl: './subscripcion-add-edit.html',
  styleUrls: ['./subscripcion-add-edit.css'],
})
export class SubscripcionAddEdit {
  crudForm!: FormGroup;
  idSubscripcion = 0;
  clases: clase[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subscripcionService: SubscripcionService,
    private claseService: ClaseService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarClases();
  }

  cargarFormulario(): void {
    this.crudForm = this.formBuilder.group({
      idSubscripcion: [''],
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Descripcion: ['', [Validators.required, Validators.minLength(5)]],
      Precio: [0, [Validators.required, Validators.min(0)]],
      idClase: [null, [Validators.required]],
    });

    this.idSubscripcion = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.idSubscripcion > 0 && !Number.isNaN(this.idSubscripcion)) {
      this.subscripcionService.getById(this.idSubscripcion).subscribe({
        next: (data: subscripcion) => {
          const claseId =
            (data as any).idClase ??
            (data as any).subscripcion_claseid ??
            (data as any).subscripcicon_claseid ??
            (data as any).clase?.idClase ??
            null;
          this.crudForm.patchValue({
            idSubscripcion: data.idSubscripcion,
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            Precio: data.Precio,
            idClase: claseId,
          });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se pudo cargar la subscripción', 'OK', { duration: 4000 });
        },
      });
    }
  }

  cargarClases(): void {
    this.claseService.listAll().subscribe({
      next: (lista) => (this.clases = lista || []),
      error: (err) => {
        console.log(err);
        this.snack.open('No se pudo cargar la lista de clases', 'OK', { duration: 4000 });
      },
    });
  }

  grabar(): void {
    if (this.crudForm.invalid) {
      this.crudForm.markAllAsTouched();
      return;
    }

    const subForm = this.crudForm.value;
    const payload: any = {
      idSubscripcion: subForm.idSubscripcion,
      Nombre: subForm.Nombre,
      Descripcion: subForm.Descripcion,
      Precio: subForm.Precio,
      // el backend espera "claseid" en el DTO
      claseid: subForm.idClase ? Number(subForm.idClase) : null,
      idClase: subForm.idClase ? Number(subForm.idClase) : null,
      clase: subForm.idClase ? { idClase: Number(subForm.idClase) } : undefined,
    };

    if (payload.idSubscripcion > 0) {
      this.subscripcionService.update(payload).subscribe({
        next: (data: subscripcion) => {
          this.snack.open('Subscripción actualizada (ID ' + data.idSubscripcion + ')', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['/subscripcion-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo actualizar la subscripción.';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.log(http_error);
        },
      });
    } else {
      this.subscripcionService.create(payload).subscribe({
        next: (data: subscripcion) => {
          this.snack.open('Subscripción creada (ID ' + data.idSubscripcion + ')', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['/subscripcion-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo crear la subscripción.';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.log(http_error);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
