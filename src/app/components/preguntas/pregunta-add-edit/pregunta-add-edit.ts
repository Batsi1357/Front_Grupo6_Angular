import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreguntaService } from '../../../services/pregunta-service';
import { pregunta } from '../../../models/pregunta-model';

@Component({
  selector: 'app-pregunta-add-edit',
  standalone: false,
  templateUrl: './pregunta-add-edit.html',
  styleUrl: './pregunta-add-edit.css',
})
export class PreguntaAddEdit {
  crudForm!: FormGroup;
  idPregunta = 0;

  constructor(
    private formBuilder: FormBuilder,
    private preguntaService: PreguntaService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(): void {
    this.crudForm = this.formBuilder.group({
      idPregunta: [''],
      Enunciado: ['', [Validators.required, Validators.minLength(5)]],
      Tipo: ['', [Validators.required]],
      Puntaje: [0, [Validators.required, Validators.min(0)]],
      idEvaluacion: [null, [Validators.required]],
    });

    this.idPregunta = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.idPregunta > 0 && !Number.isNaN(this.idPregunta)) {
      this.preguntaService.getById(this.idPregunta).subscribe({
        next: (data: pregunta) => {
          this.crudForm.patchValue({
            idPregunta: data.idPregunta,
            Enunciado: (data as any).Enunciado ?? (data as any).enunciado ?? '',
            Tipo: (data as any).Tipo ?? (data as any).tipo ?? '',
            Puntaje: (data as any).Puntaje ?? (data as any).puntaje ?? 0,
            idEvaluacion: (data as any).evaluacionId ?? (data as any).idEvaluacion ?? null,
          });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se pudo cargar la pregunta', 'OK', { duration: 4000 });
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
      idPregunta: this.crudForm.get('idPregunta')?.value || 0,
      // enviar en minúsculas para que el backend mapee DTO (enunciado/tipo/puntaje)
      enunciado: this.crudForm.get('Enunciado')?.value,
      tipo: this.crudForm.get('Tipo')?.value,
      puntaje: Number(this.crudForm.get('Puntaje')?.value),
      // enviar ambas variantes de evaluación por compatibilidad
      evaluacionId: Number(this.crudForm.get('idEvaluacion')?.value),
      idEvaluacion: Number(this.crudForm.get('idEvaluacion')?.value),
    };

    if (payload.idPregunta > 0) {
      this.preguntaService.update(payload).subscribe({
        next: (data: pregunta) => {
          this.snack.open('Pregunta actualizada (ID ' + data.idPregunta + ')', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['/pregunta-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo actualizar la pregunta.';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.log(http_error);
        },
      });
    } else {
      this.preguntaService.create(payload).subscribe({
        next: (data: pregunta) => {
          this.snack.open('Pregunta creada (ID ' + data.idPregunta + ')', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['/pregunta-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se pudo crear la pregunta.';
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
