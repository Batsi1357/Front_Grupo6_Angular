import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rol } from '../models/rol-model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RolService {
  
  ruta_servidor:string = environment.apiUrl;

  recurso:string="Rol";

  constructor(private http:HttpClient){}
  
  listAll()
  {
    return this.http.get<rol[]>(this.ruta_servidor+"/"+this.recurso);
  }

  new(rol:rol)
  {
    return this.http.post<rol[]>(this.ruta_servidor+"/"+this.recurso,rol+"/insert");
  }

  delete(idrol:number)
  {
  return this.http.delete<rol[]>(this.ruta_servidor + '/' + this.recurso + '/eliminar/' + idrol.toString());
  }
  
  listAll_ID(idrol:number)
  {
    return this.http.get<rol[]>(this.ruta_servidor+"/"+this.recurso+"/"+idrol.toString());
  }
  
  update(rol: rol) {
    return this.http.put<rol>(this.ruta_servidor + '/' + this.recurso + '/update',rol);
  }

}
