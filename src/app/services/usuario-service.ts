import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuario } from '../models/usuario-model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  ruta_servidor:string = "http://localhost:8080"; 

  recurso:string = "Usuario"

  constructor(private http:HttpClient) {}


  listAll()
  {
    return this.http.get<usuario[]>(this.ruta_servidor+"/"+this.recurso);
  }

  new(usuario:usuario)
  {
    return this.http.post<usuario[]>(this.ruta_servidor+"/"+this.recurso,usuario+"/insert");
  }

  delete(idUsuario:number)
  {
  return this.http.delete<usuario[]>(this.ruta_servidor + '/' + this.recurso + '/eliminar/' + idUsuario.toString());
  }
  
  listAll_ID(idUsuario:number)
  {
    return this.http.get<usuario[]>(this.ruta_servidor+"/"+this.recurso+"/"+idUsuario.toString());
  }
  
  update(usuario: usuario) {
    return this.http.put<usuario>(this.ruta_servidor + '/' + this.recurso + '/update',usuario);
  }

  isLogged(){
    return (this.getUserId()!=0);
  }

   getUserId(){
    if(typeof localStorage !=="undefined"){
      if(localStorage.getItem('usuario_id')!==null) {
        return parseInt(localStorage.getItem('usuario_id')!.toString());
      }      
    }
    return 0;
   }
}
