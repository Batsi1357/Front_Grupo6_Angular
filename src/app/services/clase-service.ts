import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clase } from '../models/clase-model';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
   ruta_servidor: string = 'http://localhost:8080';
  recurso: string = 'Clase';

  constructor(private http: HttpClient) {}

  // GET /Clase
  listAll() {
    return this.http.get<clase[]>(
      `${this.ruta_servidor}/${this.recurso}`
    );
  }

  // GET /Clase/{id}
  listById(idClase: number) {
    return this.http.get<clase>(
      `${this.ruta_servidor}/${this.recurso}/${idClase}`
    );
  }

  // POST /Clase/insert
  new(clase: clase) {
    return this.http.post<clase>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      clase
    );
  }

  // PUT /Clase/update
  update(clase: clase) {
    return this.http.put<clase>(
      `${this.ruta_servidor}/${this.recurso}/update`,
      clase
    );
  }

  // DELETE /Clase/eliminar/{id}
  delete(idClase: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${idClase}`
    );
  }
}
