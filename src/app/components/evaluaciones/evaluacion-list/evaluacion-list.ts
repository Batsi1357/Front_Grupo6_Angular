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
  mensaje = '';
  cargando = false;

  duracionMax = 0;
  fechaInicio = '';
  tituloBusqueda = '';
  rangoInicio = '';
  rangoFin = '';

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
          this.mensaje = 'Error al cargar evaluaciones';
      }      
    }
  );  
}

  private setResultados(data: evaluacion[], mensajeOk: string) {
    this.dsEvaluacion = new MatTableDataSource(data);
    this.mensaje = mensajeOk;
    this.cargando = false;
  }

  buscarPorDuracionMax(): void {
    if (!this.duracionMax || this.duracionMax <= 0) {
      this.mensaje = 'Ingresa una duración máxima válida';
      return;
    }
    this.cargando = true;
    this.evaluacionService.buscarPorDuracionMaxima(this.duracionMax).subscribe({
      next: (data) => this.setResultados(data, `${data.length} evaluacion(es) con duracion <= ${this.duracionMax} min`),
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.mensaje = 'Error al buscar por duración';
      }
    });
  }

  buscarPorFechaInicio(): void {
    if (!this.fechaInicio) {
      this.mensaje = 'Selecciona una fecha de inicio';
      return;
    }
    this.cargando = true;
    this.evaluacionService.buscarPorFechaInicio(this.fechaInicio).subscribe({
      next: (data) => this.setResultados(data, `${data.length} evaluacion(es) con fecha inicio > ${this.fechaInicio}`),
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.mensaje = 'Error al buscar por fecha de inicio';
      }
    });
  }

  buscarPorTitulo(): void {
    if (!this.tituloBusqueda.trim()) {
      this.mensaje = 'Ingresa un texto para el título';
      return;
    }
    this.cargando = true;
    this.evaluacionService.buscarPorTitulo(this.tituloBusqueda).subscribe({
      next: (data) => this.setResultados(data, `${data.length} evaluacion(es) que contienen \"${this.tituloBusqueda}\"`),
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.mensaje = 'Error al buscar por título';
      }
    });
  }

  buscarEntreFechas(): void {
    if (!this.rangoInicio || !this.rangoFin) {
      this.mensaje = 'Completa ambas fechas';
      return;
    }
    this.cargando = true;
    this.evaluacionService.buscarEntreFechas(this.rangoInicio, this.rangoFin).subscribe({
      next: (data) => this.setResultados(data, `${data.length} evaluacion(es) entre ${this.rangoInicio} y ${this.rangoFin}`),
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.mensaje = 'Error al buscar entre fechas';
      }
    });
  }

  limpiarFiltros(): void {
    this.duracionMax = 0;
    this.fechaInicio = '';
    this.tituloBusqueda = '';
    this.rangoInicio = '';
    this.rangoFin = '';
    this.mensaje = '';
    this.CargarLista();
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
