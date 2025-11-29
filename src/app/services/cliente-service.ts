import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cliente } from '../models/cliente-model';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  ruta_servidor: string = 'http://localhost:8080';
  recurso: string = 'Cliente';

  constructor(private http: HttpClient) {}

  getPerfil() {
    return this.http.get<cliente>(`${this.ruta_servidor}/${this.recurso}/perfil`).pipe(
      catchError((err) => {
        // Si el endpoint de perfil no está disponible o devuelve 401, intentamos listar y tomar el primer cliente
        if (err.status === 401 || err.status === 404) {
          return this.http
            .get<cliente[]>(`${this.ruta_servidor}/${this.recurso}`)
            .pipe(map((list) => (list && list.length ? list[0] : ({} as cliente))));
        }
        return throwError(() => err);
      })
    );
  }
}
