import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { subscripcion } from '../../../models/subscripcion-model';
import { SubscripcionService } from '../../../services/subscripcion-service';

@Component({
  selector: 'app-subscripcion-add-edit',
  standalone: false,
  templateUrl: './subscripcion-add-edit.html',
  styleUrl: './subscripcion-add-edit.css',
})
export class SubscripcionAddEdit {
  crudForm!: FormGroup;
  idSubscripcion = 0;

  constructor(
    private formBuilder: FormBuilder,
    private subscripcionService: SubscripcionService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(): void {
    this.crudForm = this.formBuilder.group({
      idSubscripcion: [''],
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Descripcion: ['', [Validators.required, Validators.minLength(5)]],
      Precio: [0, [Validators.required, Validators.min(0)]],
    });

    this.idSubscripcion = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.idSubscripcion > 0 && !Number.isNaN(this.idSubscripcion)) {
      this.subscripcionService.getById(this.idSubscripcion).subscribe({
        next: (data: subscripcion) => {
          this.crudForm.patchValue(data);
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se pudo cargar la subscripción', 'OK', { duration: 4000 });
        },
      });
    }
  }

  grabar(): void {
    if (this.crudForm.invalid) {
      this.crudForm.markAllAsTouched();
      return;
    }

    const sub: subscripcion = this.crudForm.value;

    if (sub.idSubscripcion > 0) {
      this.subscripcionService.update(sub).subscribe({
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
      this.subscripcionService.create(sub).subscribe({
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
