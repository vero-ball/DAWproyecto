import { Socio } from "src/app/socios/models/socio.model";

export interface Actividade {
  _id:           string;
  nome:          string;
  descricion:    string;
  data:          Date;
  lugar:         string;
  participantes: ParticipanteActividade[];
  // __v:           number;
}

export interface ParticipanteActividade {
  socio?: string; // id do socio
  nome?: string;
  apelidos?: string;
  eSocio: boolean;
}
