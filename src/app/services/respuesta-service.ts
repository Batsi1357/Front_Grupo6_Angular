import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { respuesta } from '../models/respuesta-model';

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  ruta_servidor: string = 'http://localhost:8080';
  recurso: string = "Respuesta";

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

  // ----------- LISTAR TODOS -----------
  // GET http://localhost:8080/Respuesta
  listAll() {
    return this.http.get<respuesta[]>(
      `${this.ruta_servidor}/${this.recurso}`,
      this.authHeaders()
    );
  }

  // ----------- LISTAR POR ID -----------
  // GET http://localhost:8080/Respuesta/{id}
  getById(id: number) {
    return this.http.get<respuesta>(
      `${this.ruta_servidor}/${this.recurso}/${id}`,
      this.authHeaders()
    );
  }

  // ----------- INSERT -----------
  // POST http://localhost:8080/Respuesta/insert
  create(respuesta: respuesta) {
    return this.http.post<respuesta>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      respuesta,
      this.authHeaders()
    );
  }

  // ----------- UPDATE -----------
  // PUT http://localhost:8080/Respuesta/update/{id}
  update(respuesta: respuesta) {
    return this.http.put<respuesta>(
      `${this.ruta_servidor}/${this.recurso}/update/${respuesta.idRespuesta}`,
      respuesta,
      this.authHeaders()
    );
  }

  // ----------- DELETE -----------
  // DELETE http://localhost:8080/Respuesta/eliminar/{id}
  delete(id: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${id}`,
      this.authHeaders()
    );
  }
}
