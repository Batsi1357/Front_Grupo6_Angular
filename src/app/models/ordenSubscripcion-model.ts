export interface ordenSubscripcion {
  idOrdenSubscripcion: number;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
  // Campos alternativos por compatibilidad con backend que use mayúsculas
  Estado?: string;
  FechaInicio?: string;
  FechaFin?: string;
}
