import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cliente } from '../models/cliente-model';
import { catchError, map, throwError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  ruta_servidor: string = environment.apiUrl;
  recurso: string = 'Cliente';

  constructor(private http: HttpClient) {}

  // Listar todos los clientes
  list(): Observable<cliente[]> {
    return this.http.get<cliente[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

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

  // Query 1: Buscar por email exacto (Query Method)
  buscarPorEmail(email: string): Observable<cliente[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<cliente[]>(`${this.ruta_servidor}/${this.recurso}/buscar-email`, { params });
  }

  // Query 2: Buscar por dominio de email (SQL Nativo)
  buscarPorDominio(dominio: string): Observable<cliente[]> {
    const params = new HttpParams().set('dominio', dominio);
    return this.http.get<cliente[]>(`${this.ruta_servidor}/${this.recurso}/buscar-dominio`, { params });
  }

  // Query 3: Buscar por edad mínima (JPQL)
  buscarPorEdadMinima(edadMin: number): Observable<cliente[]> {
    const params = new HttpParams().set('edadMin', edadMin.toString());
    return this.http.get<cliente[]>(`${this.ruta_servidor}/${this.recurso}/buscar-edad`, { params });
  }

  // Query 4: Buscar por nombre o apellido que contenga texto (JPQL)
  buscarPorNombreOApellido(texto: string): Observable<cliente[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<cliente[]>(`${this.ruta_servidor}/${this.recurso}/buscar-nombre-apellido`, { params });
  }
}
