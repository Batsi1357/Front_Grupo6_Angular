import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { unidad } from '../models/unidad-model';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
   ruta_servidor:string = "http://localhost:8080";

  recurso:string="Unidad";

  constructor(private http:HttpClient){}
  
  listAll()
  {
    return this.http.get<unidad[]>(this.ruta_servidor+"/"+this.recurso);
  }

  new(unidad:unidad)
  {
    return this.http.post<unidad>(this.ruta_servidor+"/"+this.recurso + "/insert",unidad);
  }

  delete(idUnidad:number)
  {
  return this.http.delete<unidad[]>(this.ruta_servidor + '/' + this.recurso + '/eliminar/' + idUnidad.toString());
  }
  
  listAll_ID(idUnidad:number)
  {
    return this.http.get<unidad>(this.ruta_servidor+"/"+this.recurso+"/"+idUnidad.toString());
  }
  
  update(unidad:unidad) {
    return this.http.put<unidad>(this.ruta_servidor + '/' + this.recurso + '/update',unidad);
  }
    // GET /Unidad/buscar-categoria?categoria=...
  buscarPorCategoria(categoria: string) {
    const params = new HttpParams().set('categoria', categoria); return this.http.get<unidad[]>(`${this.ruta_servidor}/${this.recurso}/buscar-categoria`,{ params });
  }

  // GET /Unidad/buscar-nivel?nivel=...
  buscarPorNivelMinimo(nivel: number) {
    const params = new HttpParams().set('nivel', nivel.toString());
    return this.http.get<unidad[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-nivel`,
      { params }
    );
  }

  // GET /Unidad/buscar-duracion?minDuracion=...
  buscarPorDuracionMinima(minDuracion: number) {
    const params = new HttpParams().set('minDuracion', minDuracion.toString());
    return this.http.get<unidad[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-duracion`,
      { params }
    );
  }

  // GET /Unidad/buscar-titulo?texto=...
  buscarPorTitulo(texto: string) {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<unidad[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-titulo`,
      { params }
    );
  }

  updateLogo(idUnidad: number, logoFormData: FormData){
    return this.http.put<unidad>(this.ruta_servidor+"/"+this.recurso+"/"+"logo"+"/"+idUnidad.toString(),logoFormData);
  }
  
}
