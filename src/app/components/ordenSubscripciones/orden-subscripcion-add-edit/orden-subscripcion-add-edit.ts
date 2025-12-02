import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ordenSubscripcion } from '../../../models/ordenSubscripcion-model';
import { OrdenSubscripcionService } from '../../../services/orden-subscripcion-service';
import { SubscripcionService } from '../../../services/subscripcion-service';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { subscripcion } from '../../../models/subscripcion-model';
import { usuario } from '../../../models/usuario-model';

@Component({
  selector: 'app-orden-subscripcion-add-edit',
  standalone: false,
  templateUrl: './orden-subscripcion-add-edit.html',
  styleUrl: './orden-subscripcion-add-edit.css',
})
export class OrdenSubscripcionAddEdit {
  crudForm!: FormGroup;
  idOrden: number = 0;
  subscripciones: subscripcion[] = [];
  usuarios: usuario[] = [];

  constructor(
    private ordenService: OrdenSubscripcionService,
    private subsService: SubscripcionService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.CargarFormulario();
  }

  CargarFormulario() {
    this.crudForm = this.formBuilder.group({
      idOrdenSubscripcion: [''],
      estado: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      idSubscripcion: [''],
      idUsuario: [''],
    });

    this.loadSubscripciones();
    this.loadUsuarios();

    this.idOrden = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.idOrden > 0 && this.idOrden != undefined) {
      this.ordenService.listAll_ID(this.idOrden).subscribe({
        next: (data: any) => {
          // Normalizar campos (puede venir con mayúsculas o dentro de objetos FK)
          this.crudForm.get('idOrdenSubscripcion')?.setValue(data.idOrdenSubscripcion ?? data.id ?? 0);
          this.crudForm.get('estado')?.setValue(data.estado ?? data.Estado ?? '');
          this.crudForm.get('fechaInicio')?.setValue(data.fechaInicio ?? data.FechaInicio ?? '');
          this.crudForm.get('fechaFin')?.setValue(data.fechaFin ?? data.FechaFin ?? '');

          // Intentar extraer FK de distintas estructuras
          const idSubs =
            data.subscripcion?.idSubscripcion ?? data.idSubscripcion ?? data.Subscripcion?.idSubscripcion ?? null;
          const idUsr = data.usuario?.idUsuario ?? data.idUsuario ?? data.Usuario?.idUsuario ?? null;

          if (idSubs) this.crudForm.get('idSubscripcion')?.setValue(idSubs);
          if (idUsr) this.crudForm.get('idUsuario')?.setValue(idUsr);
        },
        error: (err) => {
          console.error(err);
          this.snack.open('No se pudo cargar la orden solicitada.', 'OK', { duration: 3500 });
        },
      });
    }
  }

  loadSubscripciones() {
    this.subsService.listAll().subscribe({
      next: (data: subscripcion[] | any) => {
        this.subscripciones = data || [];
      },
      error: (err) => {
        console.error('Error cargando subscripciones', err);
        this.snack.open('No se pudieron cargar las subscripciones.', 'OK', { duration: 3000 });
      },
    });
  }

  loadUsuarios() {
    this.usuarioService.listAll().subscribe({
      next: (data: usuario[] | any) => {
        this.usuarios = data || [];
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.snack.open('No se pudieron cargar los usuarios.', 'OK', { duration: 3000 });
      },
    });
  }

  Grabar() {
    if (!this.crudForm.valid) {
      this.crudForm.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      this.snack.open('Debes iniciar sesión antes de crear o editar ordenes.', 'OK', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    const payload: any = {
      idOrdenSubscripcion: this.crudForm.get('idOrdenSubscripcion')?.value,
      estado: this.crudForm.get('estado')?.value,
      fechaInicio: this.crudForm.get('fechaInicio')?.value,
      fechaFin: this.crudForm.get('fechaFin')?.value,
    };

    const idSubs = Number(this.crudForm.get('idSubscripcion')?.value);
    if (idSubs && !isNaN(idSubs)) {
      // añadir campo por id y por objeto para compatibilidad con distintos backends
      payload.idSubscripcion = idSubs;
      payload.subscripcion = { idSubscripcion: idSubs };
      // nombres alternativos que algunos backends esperan
      payload.subscripcion_id = idSubs;
      payload.subscripcion = payload.subscripcion || { idSubscripcion: idSubs };
    }

    const idUsr = Number(this.crudForm.get('idUsuario')?.value);
    if (idUsr && !isNaN(idUsr)) {
      payload.idUsuario = idUsr;
      payload.usuario = { idUsuario: idUsr };
      // algunos backends esperan campo 'cliente' en lugar de idUsuario
      payload.cliente = idUsr;
    }

    if (payload.idOrdenSubscripcion > 0) {
      console.log('Enviar UPDATE payload:', payload);
      this.ordenService.update(payload).subscribe({
        next: (data: any) => {
          this.snack.open('Se actualizó la orden correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/orden-subscripcion-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se actualizó el registro solicitado.';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.error(http_error);
        },
      });
    } else {
      console.log('Enviar NEW payload:', payload);
      this.ordenService.new(payload).subscribe({
        next: (data: any) => {
          this.snack.open('Se creó la orden correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/orden-subscripcion-list']);
        },
        error: (http_error) => {
          const msg = http_error?.error?.message || 'No se agregó el registro solicitado.';
          this.snack.open('ERROR: ' + msg, 'OK', { duration: 5000 });
          console.error(http_error);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/orden-subscripcion-list']);
  }
}
