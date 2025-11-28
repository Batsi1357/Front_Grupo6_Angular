import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { Router } from '@angular/router';
import { usuario } from '../../models/usuario-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],

})
export class Login implements OnInit  {

  loginForm!:FormGroup;

constructor(
  private usuarioService: UsuarioService,
  private formBuilder: FormBuilder,
  private router: Router,
  private snackBar: MatSnackBar // inyectar
) {}
  ngOnInit(): void {
     // Inicialización del FormGroup con los controles necesarios
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],  // El campo username es obligatorio
      password: ['', [Validators.required]]   // El campo password es obligatorio
    });
  }

Ingresar() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { username, password } = this.loginForm.value;
  const usuarioPayload = {
    idUsuario: 0,
    Username: username,
    Password: password,
    activo: 'S', // o el flag que corresponda
  };

 // Llamar al servicio de login
    this.usuarioService.login(usuarioPayload.Username, usuarioPayload.Password).subscribe({
      next: () => this.router.navigate(['/home']),  // Redirigir si el login es exitoso
      error: (error) => {
        const msg = error.status === 401
          ? 'Credenciales incorrectas, por favor intenta de nuevo'
          : 'Ocurrió un error inesperado, por favor intenta más tarde';
        this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
      },
    });
 
}
}
