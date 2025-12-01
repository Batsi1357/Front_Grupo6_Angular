export interface evaluacion
{
    idEvaluacion:number,
    titulo:string,
    descripcion:string,
    fechaInicio:string,
    duracion:number,
    idUnidad:number,
    // Enviado para compatibilidad con DTO backend que usa "unidadid"
    unidadid?:number
}
