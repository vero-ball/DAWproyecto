export interface Socio {
  _id?: number;
  nome: string;
  apelidos: string;
  numeroSocio: number;
  dni: string;
  enderezo: string;
  telefono: string;
  email: string;
  dataAlta: string;
  dataBaixa?: string;
  motivoBaixa?: string;
  directivo?: boolean;
  // reciboNumero: string;
  // ano: number;
  // cota: number;
  // dataCobro: string;
  // impago: boolean;
}
