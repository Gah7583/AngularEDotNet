import { Genero } from "../enums/Genero";
import { Token } from "./Token";

export interface Usuario {
  id?: any;
  email: string;
  senha: string;
  telefone?: string;
  dataDeNascimento?: Date;
  genero?: Genero;
}
