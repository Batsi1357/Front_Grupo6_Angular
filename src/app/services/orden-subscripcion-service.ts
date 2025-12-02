import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ordenSubscripcion } from '../models/ordenSubscripcion-model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OrdenSubscripcionService {
  ruta_servidor: string = environment.apiUrl;
  // El backend expone /OrderSubscripcion (sin la "n" en Order)
  recurso: string = "OrderSubscripcion";

  constructor(private http: HttpClient) {}

  // GET /OrderSubscripcion
  listAll() {
    return this.http.get<ordenSubscripcion[]>(this.ruta_servidor + '/' + this.recurso);
  }

  // GET /OrderSubscripcion/{id}
  listAll_ID(idOrdenSubscripcion: number) {
    return this.http.get<ordenSubscripcion>(
      this.ruta_servidor + '/' + this.recurso + '/' + idOrdenSubscripcion.toString()
    );
  }

  // POST /OrderSubscripcion/insert
  new(orden: ordenSubscripcion) {
    return this.http.post<ordenSubscripcion>(this.ruta_servidor + '/' + this.recurso + '/insert', orden);
  }

  // PUT /OrderSubscripcion/update/{id}
  update(orden: ordenSubscripcion) {
    return this.http.put<ordenSubscripcion>(
      this.ruta_servidor + '/' + this.recurso + '/update/' + orden.idOrdenSubscripcion,
      orden
    );
  }

  // DELETE /OrderSubscripcion/eliminar/{id}
  delete(idOrdenSubscripcion: number) {
    return this.http.delete<void>(
      this.ruta_servidor + '/' + this.recurso + '/eliminar/' + idOrdenSubscripcion.toString()
    );
  }
}
