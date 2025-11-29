import { Component } from '@angular/core';
import { ClaseService } from '../../../services/clase-service';
import { UnidadService } from '../../../services/unidad-service';
import { unidad } from '../../../models/unidad-model';
import { clase } from '../../../models/clase-model';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-clase-add-edit',
  standalone: false,
  templateUrl: './clase-add-edit.html',
  styleUrl: './clase-add-edit.css',
})
export class ClaseAddEdit {

crudForm!:FormGroup;
idClase:number = 0;
unidad!:unidad[];

constructor(private snack:MatSnackBar,private router:Router,private activatedRoute:ActivatedRoute,
  private claseService:ClaseService, private unidadService:UnidadService){}



  ngOnInit(){
    this.CargarFormulario();
  }


  CargarFormulario(){


  }


  /*grabar (){

    const clase:clase = {

      idClase:this.crudForm.get("id")?.value,
      




    }

  }*/


  CargarClases(){



  }
}
