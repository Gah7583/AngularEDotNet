import { Status } from "../enums/Status"

export interface Tarefa {
  id?: any;
  nome: string;
  descricao: string;
  dataDeRealizacao: string;
  status: Status;
  usuarioId: any;
}
