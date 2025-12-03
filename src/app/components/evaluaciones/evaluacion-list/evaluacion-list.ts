import { Component } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { evaluacion } from '../../../models/evaluacion-model';
import { EvaluacionService } from '../../../services/evaluacion-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmation } from '../../confimations/delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-evaluacion-list',
  standalone: false,
  templateUrl: './evaluacion-list.html',
  styleUrl: './evaluacion-list.css',
})
export class EvaluacionList {


  dsEvaluacion = new MatTableDataSource<evaluacion>();

  displayedColumns:string[]=['idEvaluacion','titulo','descripcion','fechaInicio','duracion','idUnidad','opciones'];

  constructor(private evaluacionService: EvaluacionService,private dialog: MatDialog, private snack: MatSnackBar ){}

   ngOnInit(){
    this.CargarLista();
  }

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsEvaluacion.filter = filterValue.trim().toLowerCase();
    
  }


CargarLista(){

    this.evaluacionService.listAll().subscribe({
      next: (data:evaluacion[])=>{

        data.forEach( (evaluacion:evaluacion) => {
        }
        );

        this.dsEvaluacion=new MatTableDataSource(data);          
        
      },
      error: (err)=>{
          console.log(err);
      }      
    }
  );  
}

Borrar(idEvaluacion:number){
    let dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe(
      opcionSelecionada=>{

        if(opcionSelecionada) {
          this.evaluacionService.delete(idEvaluacion).subscribe({
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
