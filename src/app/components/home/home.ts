import { Component } from '@angular/core';
import { usuario } from '../../models/usuario-model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { ClienteService } from '../../services/cliente-service';
import { cliente } from '../../models/cliente-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  clienteData?: cliente;
  showClienteCard = false;
  currentSection: 'home' | 'about' = 'home';
  private readonly clienteFallback: cliente = {
    idCliente: 2,
    Nombre: 'Fernando',
    Apellido: 'Cruzada',
    Direccion: 'Av Primaver 11',
    Celular: '991258753',
    email: 'elmascrack@hotmail.com',
    edad: 20
  };

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private snack: MatSnackBar
  ) {}

  switchSection(section: 'home' | 'about'): void {
    this.currentSection = section;
  }

  goToUnidadQueries(): void {
    this.router.navigate(['/unidad-queries']);
  }

  goToUnidadList(): void {
    this.router.navigate(['/unidad-list']);
  }

  goToUnidadCreate(): void {
    this.router.navigate(['/unidad-add']);
  }

  goToOrdenSubscripcionList(): void {
    this.router.navigate(['/orden-subscripcion-list']);
  }

  goToOrdenSubscripcionCreate(): void {
    this.router.navigate(['/orden-subscripcion-add']);
  }

  goToSubscripcionList(): void {
    this.router.navigate(['/subscripcion-list']);
  }

  goToSubscripcionCreate(): void {
    this.router.navigate(['/subscripcion-add']);
  }

  goToOportunidadList(): void {
    this.router.navigate(['/oportunidad-list']);
  }

  goToOportunidadCreate(): void {
    this.router.navigate(['/oportunidad-add']);
  }

  goToEvaluacionList(): void {
    this.router.navigate(['/evaluacion-list']);
  }

  goToEvaluacionCreate(): void {
    this.router.navigate(['/evaluacion-add']);
  }

  goToPreguntaList(): void {
    this.router.navigate(['/pregunta-list']);
  }

  goToPreguntaCreate(): void {
    this.router.navigate(['/pregunta-add']);
  }

  goToRespuestaList(): void {
    this.router.navigate(['/respuesta-list']);
  }

  goToRespuestaCreate(): void {
    this.router.navigate(['/respuesta-add']);
  }

  goToClaseList(): void {
    this.router.navigate(['/clase-list']);
  }

  goToClaseCreate(): void {
    this.router.navigate(['/clase-add']);
  }

  goToClienteList(): void {
    this.router.navigate(['/cliente-list']);
  }

  goToRolList(): void {
    this.router.navigate(['/rol-list']);
  }

  goToRolCreate(): void {
    this.router.navigate(['/rol-add']);
  }

  goToUsuarioList(): void {
    this.router.navigate(['/usuarios-list']);
  }

  goToUsuarioCreate(): void {
    this.router.navigate(['/usuarios-add']);
  }

  toggleClienteCard(): void {
    this.showClienteCard = !this.showClienteCard;
    if (this.showClienteCard && !this.clienteData) {
      this.cargarCliente();
    }
  }

  private cargarCliente(): void {
    this.clienteService.getPerfil().subscribe({
      next: (data) => {
        this.clienteData = this.mapCliente(data);
      },
      error: (err) => {
        console.log(err);
        const msg =
          err.status === 401
            ? 'No autorizado para ver el perfil de cliente. Mostrando datos de referencia.'
            : 'No se pudieron obtener los datos del cliente. Mostrando datos de referencia.';
        this.clienteData = this.clienteFallback;
        this.snack.open(msg, 'OK', { duration: 3000 });
      },
    });
  }

  private mapCliente(data: any): cliente {
    if (!data) {
      return this.clienteFallback;
    }
    return {
      idCliente: data.idCliente || data.id || this.clienteFallback.idCliente,
      Nombre: data.Nombre || data.nombre || this.clienteFallback.Nombre,
      Apellido: data.Apellido || data.apellido || this.clienteFallback.Apellido,
      Direccion: data.Direccion || data.direccion || this.clienteFallback.Direccion,
      Celular: data.Celular || data.celular || this.clienteFallback.Celular,
      email: data.email || data.Email || this.clienteFallback.email,
      edad: data.edad || data.Edad || this.clienteFallback.edad
    };
  }

  salir(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
