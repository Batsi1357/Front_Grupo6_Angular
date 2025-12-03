export interface usuario
{
    idUsuario:number,
    username:string,
    password:string,
    activo:string,
    rol?:string  // ADMIN o ESTUDIANTE
}