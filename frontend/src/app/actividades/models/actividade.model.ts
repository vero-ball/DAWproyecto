import { Socio } from "src/app/socios/models/socio.model";

export interface Actividade {
  _id:           string;
  nome:          string;
  descricion:    string;
  data:          Date;
  lugar:         string;
  participantes: Socio[];
  __v:           number;
}
