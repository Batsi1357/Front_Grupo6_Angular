export interface pregunta
{
    idPregunta:number,
    Enunciado:string,
    Tipo:string,
    Puntaje:number,
    // id de la evaluación a la que pertenece la pregunta
    evaluacionId?: number
}
