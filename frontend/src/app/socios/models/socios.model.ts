export interface Socio {
  _id?: string;
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
  // reciboNumero: string;
  // ano: number;
  // cota: number;
  // dataCobro: string;
  // impago: boolean;
}
