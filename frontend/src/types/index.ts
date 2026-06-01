
export interface Paciente {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento?: string;
  telefone?: string;
  email?: string;
}

export interface Especialidade {
  id?: number;
  nome: string;
}

export interface Medico {
  id?: number;
  nome: string;
  crm: string;
  telefone?: string;
  especialidades: Especialidade[];
}

export interface Consulta {
  id?: number;
  dataHora: string;
  status: string;
  observacao?: string;
  paciente: Paciente;
  medico: Medico;
}