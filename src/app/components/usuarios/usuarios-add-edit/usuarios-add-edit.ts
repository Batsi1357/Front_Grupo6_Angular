import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from '../../../models/usuario-model';


@Component({
  selector: 'app-usuarios-add-edit',
  standalone: false,
  templateUrl: './usuarios-add-edit.html',
  styleUrl: './usuarios-add-edit.css',
})
export class UsuariosAddEdit {


  crudForm!:FormGroup;
  idUsuario:number=0;
  



  
  /*Grabar()
  {
    const usuarios:usuario={

      idUsuario:this.crudForm.get("id")?.value,
      Username:this.crudForm.get("username")?.value,
      Password:this.crudForm.get("password")?.value,
      activo:this.crudForm.get("active subscription")?.value
    }

    };*/
  }



