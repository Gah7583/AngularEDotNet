import { Genero } from "../enums/Genero";

export interface Usuario {
  id?: any;
  email: string;
  senha: string;
  telefone?: string;
  dataDeNascimento?: Date;
  genero?: Genero;
  token: string;
  tokenExpiryTime: Date;
}
