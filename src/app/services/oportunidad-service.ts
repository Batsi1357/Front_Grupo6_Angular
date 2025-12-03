import { Injectable } from '@angular/core';
import { oportunidad } from '../models/oportunidad-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OportunidadService {
  ruta_servidor: string = environment.apiUrl;
  recurso: string = 'Oportunidad';

  constructor(private http: HttpClient) {}

  // GET /Oportunidad
  listAll() {
    return this.http.get<oportunidad[]>(
      this.ruta_servidor + '/' + this.recurso
    );
  }

  // GET /Oportunidad/{id}
  getById(idOportunidad: number) {
    return this.http.get<oportunidad>(
      this.ruta_servidor +
        '/' +
        this.recurso +
        '/' +
        idOportunidad.toString()
    );
  }

  // POST /Oportunidad/insert
  create(oportunidad: oportunidad) {
    return this.http.post<oportunidad>(
      this.ruta_servidor + '/' + this.recurso + '/insert',
      oportunidad
    );
  }

  // Deprecated: use getById instead
  listAll_ID(idOportunidad: number) {
    return this.getById(idOportunidad);
  }

  // Deprecated: use create instead
  new(oportunidad: oportunidad) {
    return this.create(oportunidad);
  }

  // PUT /Oportunidad/update/{id}
  update(oportunidad: oportunidad) {
    return this.http.put<oportunidad>(
      this.ruta_servidor +
        '/' +
        this.recurso +
        '/update/' +
        oportunidad.idOportunidad,
      oportunidad
    );
  }

  // DELETE /Oportunidad/eliminar/{id}
  delete(idOportunidad: number) {
    return this.http.delete<void>(
      this.ruta_servidor +
        '/' +
        this.recurso +
        '/eliminar/' +
        idOportunidad.toString()
    );
  }
}
