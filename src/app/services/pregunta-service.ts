import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pregunta } from '../models/pregunta-model';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  ruta_servidor: string = "http://localhost:8080";
  recurso: string = "Pregunta";

  constructor(private http: HttpClient) {}

  // ----------- LISTAR TODAS -----------
  // GET /Pregunta
  listAll() {
    return this.http.get<pregunta[]>(
      `${this.ruta_servidor}/${this.recurso}`
    );
  }

  // ----------- LISTAR POR ID -----------
  // GET /Pregunta/{id}
  getById(id: number) {
    return this.http.get<pregunta>(
      `${this.ruta_servidor}/${this.recurso}/${id}`
    );
  }

  // ----------- INSERT -----------
  // POST /Pregunta/insert
  create(pregunta: pregunta) {
    return this.http.post<pregunta>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      pregunta
    );
  }

  // ----------- UPDATE -----------
  // PUT /Pregunta/update/{id}
  update(pregunta: pregunta) {
    return this.http.put<pregunta>(
      `${this.ruta_servidor}/${this.recurso}/update/${pregunta.idPregunta}`,
      pregunta
    );
  }

  // ----------- DELETE -----------
  // DELETE /Pregunta/eliminar/{id}
  delete(id: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${id}`
    );
  }
}
