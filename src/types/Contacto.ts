export type TipoInteraccion =
  | "Llamada"
  | "Reunión"
  | "Correo"
  | "Nota";

export interface Interaccion {
  id: string;
  tipo: TipoInteraccion;
  fecha: string;
  descripcion: string;
}

export interface Contacto {
  id: string;
  nombreCompleto: string;
  empresa: string;
  telefono: string;
  correo: string;
  etiquetas: string;
  proximoSeguimiento: string;
  notaGeneral: string;
  fechaUltimoContacto: string;
  interacciones: Interaccion[];
}