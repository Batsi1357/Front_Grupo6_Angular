import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { unidad } from '../../../models/unidad-model';
import { UnidadService } from '../../../services/unidad-service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-unidad-list',
  standalone: false,
  templateUrl: './unidad-list.html',
  styleUrl: './unidad-list.css',
})
export class UnidadList {


  dsUnidad=new MatTableDataSource <unidad>();
  displayedColumns:string []=['id', 'titulo', 'descripcion', 'nivel', 'categoria', 'duracion' ];


  constructor(private unidadService:UnidadService ,private dialog: MatDialog, private snack: MatSnackBar){}

   ngOnInit(){
    this.CargarLista();
  }

  CargarLista(){

    this.unidadService.listAll().subscribe({
        next:(data:unidad[])=>{

          data.forEach( (unidad:unidad) =>{

            unidad.logo="data:image/jpeg;base64,"+ unidad.logo;

          }
          );

          this.dsUnidad = new MatTableDataSource(data);
        },

        error: (err)=>{
          console.log(err);
      }   



      }
    );


  }


  Borrar(idUnidad:number){
    let dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe(
      opcionSelecionada=>{

        if(opcionSelecionada) {
          this.unidadService.deletebyId(idUnidad).subscribe({
            next:()=>{
                    this.snack.open("Se eliminó el registro solicitado","OK",{duration:2000});
                      this.CargarLista();
                    },
            error: (http_error)=>{
                    this.snack.open("ERROR: No se eliminó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
            }   
          })
        }
      }
    );
    
  }

}
