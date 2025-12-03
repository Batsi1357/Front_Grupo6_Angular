import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { evaluacion } from '../../../models/evaluacion-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluacionService } from '../../../services/evaluacion-service';
import { unidad } from '../../../models/unidad-model';
import { UnidadService } from '../../../services/unidad-service';


@Component({
  selector: 'app-evaluacion-add-edit',
  standalone: false,
  templateUrl: './evaluacion-add-edit.html',
  styleUrl: './evaluacion-add-edit.css',
})
export class EvaluacionAddEdit {

  crudForm!:FormGroup;
  idEvaluacion:number=0;


  constructor(private evaluacionService:EvaluacionService, private formBuilder: FormBuilder,
              private snack: MatSnackBar, private router: Router, private activatedRoute:ActivatedRoute){}


 ngOnInit(){
    this.CargarFormulario();
    // no hay dropdown de unidades aquí; asegurarse de que el usuario la ingrese
  }


CargarFormulario(){
  this.crudForm = this.formBuilder.group(
    {
       idEvaluacion:[""],
       titulo:["",[Validators.required, Validators.minLength(6)]],
       descripcion:["",[Validators.required, Validators.minLength(7)]],
       fechaInicio:[""],
       duracion:[""],
       idUnidad:["", Validators.required],

    }
  );

  this.idEvaluacion = parseInt(this.activatedRoute.snapshot.params["id"]);

  if (this.idEvaluacion>0 && this.idEvaluacion!=undefined) {

        this.evaluacionService.listById(this.idEvaluacion).subscribe({
            next:(data:evaluacion)=>{
              this.crudForm.get("idEvaluacion")?.setValue(data.idEvaluacion);
              this.crudForm.get("titulo")?.setValue(data.titulo);
              this.crudForm.get("descripcion")?.setValue(data.descripcion);
              this.crudForm.get("fechaInicio")?.setValue(data.fechaInicio+"T00:00:00");
              this.crudForm.get("duracion")?.setValue(data.duracion);
            }
        })

    }

}

Grabar(){

    if (this.crudForm.invalid) {
      this.crudForm.markAllAsTouched();
      return;
    }

    const evaluacion:evaluacion= {
      idEvaluacion:this.crudForm.get("idEvaluacion")?.value,
      titulo:this.crudForm.get("titulo")?.value,
      descripcion:this.crudForm.get("descripcion")?.value,
      fechaInicio:this.crudForm.get("fechaInicio")?.value,
      duracion:this.crudForm.get("duracion")?.value,
      // Enviamos ambas variantes para compatibilidad con el DTO (Unidadid / idUnidad)
      idUnidad:Number(this.crudForm.get("idUnidad")?.value),
      unidadid:Number(this.crudForm.get("idUnidad")?.value)
    };


    if (evaluacion.idEvaluacion>0) {
      //Falta el editar
    } else {
        this.evaluacionService.new(evaluacion).subscribe({
        next:(data:evaluacion)=>{
          this.snack.open("Se agregó la evaluacion a la unidad y se asignó el Id "+data.idEvaluacion.toString(),"OK",{duration:2000});
          this.router.navigate(["/evaluacion-list"]);
        },
            error: (http_error)=>{
                    this.snack.open("ERROR: No se agregó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
        }  
      })
    }

    

  }
  
}
