import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { unidad } from '../models/unidad-model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
   ruta_servidor:string = 'http://localhost:8080';
  recurso:string="Unidad";

  constructor(private http:HttpClient){}

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
  
  listAll()
  {
    return this.http.get<unidad[]>(this.ruta_servidor+"/"+this.recurso, this.authHeaders());
  }

  new(unidad:unidad)
  {
    return this.http.post<unidad>(this.ruta_servidor+"/"+this.recurso + "/insert",unidad, this.authHeaders());
  }

  deletebyId(idUnidad:number)
  {
  return this.http.delete<unidad[]>(this.ruta_servidor + '/' + this.recurso + '/eliminar/' + idUnidad.toString(), this.authHeaders());
  }
  
  listAll_ID(idUnidad:number)
  {
    return this.http.get<unidad>(this.ruta_servidor+"/"+this.recurso+"/"+idUnidad.toString(), this.authHeaders());
  }
  
  update(unidad:unidad) {
    return this.http.put<unidad>(this.ruta_servidor + '/' + this.recurso + '/update',unidad, this.authHeaders());
  }
    // GET /Unidad/buscar-categoria?categoria=...
  buscarPorCategoria(categoria: string) {
    const params = new HttpParams().set('categoria', categoria); return this.http.get<unidad[]>(`${this.ruta_servidor}/${this.recurso}/buscar-categoria`,{ params, ...this.authHeaders() });
  }

  // GET /Unidad/buscar-nivel?nivel=...
  buscarPorNivelMinimo(nivel: number) {
    const params = new HttpParams().set('nivel', nivel.toString());
    return this.http.get<unidad[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-nivel`,
      { params, ...this.authHeaders() }
    );
  }

  // GET /Unidad/buscar-duracion?minDuracion=...
  buscarPorDuracionMinima(minDuracion: number) {
    const params = new HttpParams().set('minDuracion', minDuracion.toString());
    return this.http.get<unidad[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-duracion`,
      { params, ...this.authHeaders() }
    );
  }

  // GET /Unidad/buscar-titulo?texto=...
  buscarPorTitulo(texto: string) {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<unidad[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-titulo`,
      { params, ...this.authHeaders() }
    );
  }

  updateLogo(idUnidad: number, logoFormData: FormData){
    return this.http.put<unidad>(this.ruta_servidor+"/"+this.recurso+"/"+"logo"+"/"+idUnidad.toString(),logoFormData, this.authHeaders());
  }
  
}
