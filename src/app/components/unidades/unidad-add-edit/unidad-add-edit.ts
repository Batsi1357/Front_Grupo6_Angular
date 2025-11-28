import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { unidad } from '../../../models/unidad-model';
import { UnidadService } from '../../../services/unidad-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidad-add-edit',
  standalone: false,
  templateUrl: './unidad-add-edit.html',
  styleUrl: './unidad-add-edit.css',
})
export class UnidadAddEdit {


  crudForm!:FormGroup;
  idUnidad:number=0;

  rutaLogo:string="";
  fileLogo:any=null;
  base64Logo:any=null;


  constructor(  private unidadservice:UnidadService, private formBuilder:FormBuilder,
     private snack:MatSnackBar, private router:Router, private activatedRoute:ActivatedRoute ){}

  ngOnInit(){
    this.CargarFormulario();
  }

  CargarFormulario(){
    this.crudForm=this.formBuilder.group(
      {

        idUnidad:[""],
        titulo:["", [Validators.required, Validators.minLength(5)]],
        descripcion :["",[Validators.required, Validators.minLength(7)]],
        nivel:[""],
        categoria:["", [Validators.required, Validators.minLength(3)]],
        duracion:[""]


      }
    );


     this.idUnidad = parseInt(this.activatedRoute.snapshot.params["id"]);


     if (this.idUnidad >0 && this.idUnidad!=undefined){
      this.unidadservice.listAll_ID(this.idUnidad).subscribe({

         next:(data:unidad)=>{
          this.crudForm.get("id")?.setValue(data.idUnidad);
          this.crudForm.get("titulo")?.setValue(data.titulo);
          this.crudForm.get("descripcion")?.setValue(data.descripcion);
          this.crudForm.get("nivel")?.setValue(data.nivel);
          this.crudForm.get("categoria")?.setValue(data.categoria);
          this.crudForm.get("duracion")?.setValue(data.duracion);
          this.base64Logo = "data:image/jpeg;base64,"+data.logo;

        }

      })
     }
  }
  


  Grabar(){
      if (this.crudForm.valid) {


      const unidad:unidad= {
          idUnidad:this.crudForm.get("id")?.value,
          titulo:this.crudForm.get("titulo")?.value,
          descripcion:this.crudForm.get("descripcion")?.value,
          nivel:this.crudForm.get("nivel")?.value,
          categoria:this.crudForm.get("categoria")?.value,
          duracion:this.crudForm.get("duracion")?.value,
          logo:null
        };


        if (unidad.idUnidad>0) {
          this.unidadservice.update(unidad).subscribe({
              next:(data:unidad)=>{


                
                //Si todo sale bien antes de terminar voy a actualizar el logo de esta Faculty que se acaba de editar
                 if (this.fileLogo!=null) {
                      this.idUnidad = data.idUnidad;
                      this.GrabarLogo();
                  }
                this.snack.open("Se actualizó la facultad con el Id "+data.idUnidad.toString(),"OK",{duration:2000});
                this.router.navigate(["/unidad-list"]);
              },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
              }  
          })
        } else {
            this.unidadservice.new(unidad).subscribe({
            next:(data:unidad)=>{
              if (this.fileLogo!=null) {
                  this.idUnidad = data.idUnidad;
                  this.GrabarLogo();
              }
             

              this.snack.open("Se agregó la facultad y se asignó el Id "+data.idUnidad.toString(),"OK",{duration:2000});
              this.router.navigate(["/unidad-list"]);
            },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se agregó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
            }  
          })
        }
    } else {
      this.crudForm.markAllAsTouched();
    }

  }
    

    GrabarLogo(){
      
    const logoFormData = new FormData();
    logoFormData.append("logo", this.fileLogo,this.rutaLogo);
    this.unidadservice.updateLogo(this.idUnidad, logoFormData).subscribe({
      next:()=>{
      },
       error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el logo solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
       } 
    });
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }

}
