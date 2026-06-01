

export const localStorageService = {

  getPacientes: (): any[] => {
    const data = localStorage.getItem('pacientes');
    return data ? JSON.parse(data) : [];
  },

  savePacientes: (pacientes: any[]) => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  },


  getMedicos: (): any[] => {
    const data = localStorage.getItem('medicos');
    return data ? JSON.parse(data) : [];
  },

  saveMedicos: (medicos: any[]) => {
    localStorage.setItem('medicos', JSON.stringify(medicos));
  },


  getEspecialidades: (): any[] => {
    const data = localStorage.getItem('especialidades');
    return data ? JSON.parse(data) : [];
  },

  saveEspecialidades: (especialidades: any[]) => {
    localStorage.setItem('especialidades', JSON.stringify(especialidades));
  },


  getConsultas: (): any[] => {
    const data = localStorage.getItem('consultas');
    return data ? JSON.parse(data) : [];
  },

  saveConsultas: (consultas: any[]) => {
    localStorage.setItem('consultas', JSON.stringify(consultas));
  },


  generateId: () => Math.floor(Math.random() * 1000000),
};