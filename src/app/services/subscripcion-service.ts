import { Injectable } from '@angular/core';
import { subscripcion } from '../models/subscripcion-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubscripcionService {
   ruta_servidor:string = "http://localhost:8080";

  recurso:string="Subscripcion";
  constructor(private http: HttpClient) {}

  // ----------- READ: LISTAR TODAS -----------
  // GET http://localhost:8080/Subscripcion
  listAll() {
    return this.http.get<subscripcion[]>(
      `${this.ruta_servidor}/${this.recurso}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ----------- CREATE -----------
  // POST http://localhost:8080/Subscripcion/insert
  create(sub: subscripcion) {
    return this.http.post<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      sub,
      { headers: this.getAuthHeaders() }
    );
  }

  // ----------- READ: BUSCAR POR ID -----------
  // GET http://localhost:8080/Subscripcion/{id}
  getById(id: number) {
    return this.http.get<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ----------- UPDATE -----------
  // PUT http://localhost:8080/Subscripcion/update/{id}
  // (el backend ignora el {id}, pero lo mandamos igual para que la URL coincida)
  update(sub: subscripcion) {
    return this.http.put<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/update/${sub.idSubscripcion}`,
      sub,
      { headers: this.getAuthHeaders() }
    );
  }

  // ----------- DELETE -----------
  // DELETE http://localhost:8080/Subscripcion/eliminar/{id}
  delete(id: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return new HttpHeaders();
  }
}
