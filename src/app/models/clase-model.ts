export interface clase {
     idClase: number;
     // backend sometimes returns 'clasePersonalizada' (camelCase) or 'ClasePersonalizada' (PascalCase)
     ClasePersonalizada?: string;
     clasePersonalizada?: string;
}