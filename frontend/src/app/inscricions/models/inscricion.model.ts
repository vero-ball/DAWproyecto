export interface Inscricion {
  _id?: string;
  socio: string; // ou { _id: string, nome: string, ... } se populado
  actividade: string;
  dataInscricion?: Date;
}
