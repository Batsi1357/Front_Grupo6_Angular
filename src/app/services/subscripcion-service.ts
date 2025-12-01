import { Injectable } from '@angular/core';
import { subscripcion } from '../models/subscripcion-model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubscripcionService {
  ruta_servidor: string = "http://localhost:8080";
  recurso: string = "Subscripcion";

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

  // ----------- READ: LISTAR TODAS -----------
  // GET http://localhost:8080/Subscripcion
  listAll() {
    return this.http.get<subscripcion[]>(
      `${this.ruta_servidor}/${this.recurso}`,
      this.authHeaders()
    );
  }

  // ----------- CREATE -----------
  // POST http://localhost:8080/Subscripcion/insert
  create(sub: subscripcion) {
    return this.http.post<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      sub,
      this.authHeaders()
    );
  }

  // ----------- READ: BUSCAR POR ID -----------
  // GET http://localhost:8080/Subscripcion/{id}
  getById(id: number) {
    return this.http.get<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/${id}`,
      this.authHeaders()
    );
  }

  // ----------- UPDATE -----------
  // PUT http://localhost:8080/Subscripcion/update/{id}
  update(sub: subscripcion) {
    return this.http.put<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/update/${sub.idSubscripcion}`,
      sub,
      this.authHeaders()
    );
  }

  // ----------- DELETE -----------
  // DELETE http://localhost:8080/Subscripcion/eliminar/{id}
  delete(id: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${id}`,
      this.authHeaders()
    );
  }
}
