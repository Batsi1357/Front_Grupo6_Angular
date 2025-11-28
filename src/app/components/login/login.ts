import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  Ingresar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginService.login({ username, password }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (error) => {
        let msg = 'Ocurrio un error inesperado, por favor intenta mas tarde';
        if (error.status === 0) {
          msg = 'No se pudo conectar con el servidor (¿backend apagado?).';
        } else if (error.status === 401) {
          msg = 'Credenciales incorrectas, por favor intenta de nuevo';
        }
        this.snack.open(msg, 'OK', { duration: 3500 });
      },
    });
  }
}
