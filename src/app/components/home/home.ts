import { Component } from '@angular/core';
import { usuario } from '../../models/usuario-model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


  constructor(private router: Router) {}

  goToUnidadList(): void {
    this.router.navigate(['/unidad-list']);
  }

  goToUnidadCreate(): void {
    this.router.navigate(['/unidad-add']);
  }

  salir(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
