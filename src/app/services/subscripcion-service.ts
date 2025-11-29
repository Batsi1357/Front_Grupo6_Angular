import { Injectable } from '@angular/core';
import { subscripcion } from '../models/subscripcion-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubscripcionService {
  ruta_servidor: string = "http://localhost:8080";
  recurso: string = "Subscripcion";

  constructor(private http: HttpClient) {}

  // ----------- READ: LISTAR TODAS -----------
  // GET http://localhost:8080/Subscripcion
  listAll() {
    return this.http.get<subscripcion[]>(
      `${this.ruta_servidor}/${this.recurso}`
    );
  }

  // ----------- CREATE -----------
  // POST http://localhost:8080/Subscripcion/insert
  create(sub: subscripcion) {
    return this.http.post<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      sub
    );
  }

  // ----------- READ: BUSCAR POR ID -----------
  // GET http://localhost:8080/Subscripcion/{id}
  getById(id: number) {
    return this.http.get<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/${id}`
    );
  }

  // ----------- UPDATE -----------
  // PUT http://localhost:8080/Subscripcion/update/{id}
  update(sub: subscripcion) {
    return this.http.put<subscripcion>(
      `${this.ruta_servidor}/${this.recurso}/update/${sub.idSubscripcion}`,
      sub
    );
  }

  // ----------- DELETE -----------
  // DELETE http://localhost:8080/Subscripcion/eliminar/{id}
  delete(id: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${id}`
    );
  }
}
