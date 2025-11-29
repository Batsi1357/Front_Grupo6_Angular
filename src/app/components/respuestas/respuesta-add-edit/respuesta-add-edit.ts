import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { respuesta } from '../../../models/respuesta-model';
import { RespuestaService } from '../../../services/respuesta-service';

@Component({
  selector: 'app-respuesta-add-edit',
  standalone: false,
  templateUrl: './respuesta-add-edit.html',
  styleUrl: './respuesta-add-edit.css',
})
export class RespuestaAddEdit {
  crudForm!: FormGroup;
  idRespuesta = 0;

  constructor(
    private formBuilder: FormBuilder,
    private respuestaService: RespuestaService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(): void {
    this.crudForm = this.formBuilder.group({
      idRespuesta: [''],
      Texto: ['', [Validators.required, Validators.minLength(3)]],
      Respuesta: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.idRespuesta = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.idRespuesta > 0 && !Number.isNaN(this.idRespuesta)) {
      this.respuestaService.getById(this.idRespuesta).subscribe({
        next: (data: respuesta) => {
          this.crudForm.patchValue(data);
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se pudo cargar la respuesta', 'OK', { duration: 4000 });
        },
      });
    }
  }

  grabar(): void {
    if (this.crudForm.invalid) {
      this.crudForm.markAllAsTouched();
      return;
    }

    const payload: respuesta = this.crudForm.value;

    if (payload.idRespuesta > 0) {
      this.respuestaService.update(payload).subscribe({
        next: (data: respuesta) => {
          this.snack.open('Respuesta actualizada (ID ' + data.idRespuesta + ')', 'OK', { duration: 2000 });
          this.router.navigate(['/respuesta-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo actualizar la respuesta.';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.log(http_error);
        },
      });
    } else {
      this.respuestaService.create(payload).subscribe({
        next: (data: respuesta) => {
          this.snack.open('Respuesta creada (ID ' + data.idRespuesta + ')', 'OK', { duration: 2000 });
          this.router.navigate(['/respuesta-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo crear la respuesta.';
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
