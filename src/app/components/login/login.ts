import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login-service';
import { UsuarioService } from '../../services/usuario-service';
import { usuario } from '../../models/usuario-model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  showRegister = false;
  registerForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.buildRegisterForm();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      rol: ['ESTUDIANTE', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  Ingresar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginService.login({ username, password }).subscribe({
      next: (resp) => {
        console.log('LoginComponent: success response', resp);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('LoginComponent: error response', error);
        let msg = 'Ocurrio un error inesperado, por favor intenta mas tarde';
        if (error.status === 0) {
          msg = 'No se pudo conectar con el servidor (¿backend apagado?).';
        } else if (error.status === 401) {
          msg = 'Credenciales incorrectas, por favor intenta de nuevo';
        }
        // If backend returned a JSON error body, try to show it in console
        try {
          if (error.error) {
            console.log('Login error body:', error.error);
          }
        } catch (e) {
          // ignore
        }
        this.snack.open(msg, 'OK', { duration: 3500 });
      },
    });
  }

  toggleRegister(): void {
    this.showRegister = !this.showRegister;
    if (!this.showRegister) {
      this.registerForm.reset({ rol: 'ESTUDIANTE' });
    }
  }

  Registrarse(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { username, password, rol } = this.registerForm.value;
    const newUsuario: usuario = {
      idUsuario: 0,
      username,
      password,
      activo: 'S',
      rol,
    };

    this.usuarioService.register(newUsuario).subscribe({
      next: () => {
        this.snack.open('Usuario creado exitosamente. Ya puedes iniciar sesión.', 'OK', { duration: 3500 });
        this.showRegister = false;
        this.registerForm.reset({ rol: 'ESTUDIANTE' });
      },
      error: (error) => {
        // Mostrar mensaje amigable al usuario. Si ya existe, indicarlo;
        // en cualquier otro error mostrar mensaje genérico solicitado.
        let msg = 'No se ha podido crear el usuario correctamente';
        if (error.status === 409) {
          msg = 'El usuario ya existe';
        }
        this.snack.open(msg, 'OK', { duration: 3500 });
      },
    });
  }
}
