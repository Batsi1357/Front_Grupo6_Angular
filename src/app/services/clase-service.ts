import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clase } from '../models/clase-model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
   ruta_servidor: string = 'http://localhost:8080';
  recurso: string = 'Clase';

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.warn('No hay token en storage; la petición no llevará Authorization');
      return {};
    }
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // GET /Clase
  listAll() {
    return this.http.get<clase[]>(
      `${this.ruta_servidor}/${this.recurso}`,
      this.authHeaders()
    );
  }

  // GET /Clase/{id}
  listById(idClase: number) {
    return this.http.get<clase>(
      `${this.ruta_servidor}/${this.recurso}/${idClase}`,
      this.authHeaders()
    );
  }

  // POST /Clase/insert
  new(clase: clase) {
    return this.http.post<clase>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      clase,
      this.authHeaders()
    );
  }

  // PUT /Clase/update
  update(clase: clase) {
    return this.http.put<clase>(
      `${this.ruta_servidor}/${this.recurso}/update`,
      clase,
      this.authHeaders()
    );
  }

  // DELETE /Clase/eliminar/{id}
  delete(idClase: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${idClase}`,
      this.authHeaders()
    );
  }
}
