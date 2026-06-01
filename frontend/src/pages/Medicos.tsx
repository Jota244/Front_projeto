import { useState, useEffect } from 'react';
import { localStorageService } from '../services/localStorageService';
import { Medico, Especialidade } from '../types/index';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function Medicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [medicoAtual, setMedicoAtual] = useState<Medico | null>(null);
  const [formData, setFormData] = useState({
    nome: '', crm: '', telefone: '', especialidades: [] as number[]
  });

  useEffect(() => {
    carregarMedicos();
    carregarEspecialidades();
  }, []);

  const carregarMedicos = () => {
    const dados = localStorageService.getMedicos();
    setMedicos(dados);
  };

  const carregarEspecialidades = () => {
    const dados = localStorageService.getEspecialidades();
    setEspecialidades(dados);
  };

  const medicosFiltrados = medicos.filter(m =>
    m.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModalCadastrar = () => {
    setMedicoAtual(null);
    setFormData({ nome: '', crm: '', telefone: '', especialidades: [] });
    setModalAberto(true);
  };

  const abrirModalEditar = (medico: Medico) => {
    setMedicoAtual(medico);
    setFormData({
      nome: medico.nome,
      crm: medico.crm,
      telefone: medico.telefone || '',
      especialidades: medico.especialidades.map(e => e.id!)
    });
    setModalAberto(true);
  };

  const salvarMedico = (e: React.FormEvent) => {
    e.preventDefault();

    const medicoParaSalvar = {
      ...formData,
      id: medicoAtual?.id || localStorageService.generateId(),
      especialidades: formData.especialidades.map(id => {
        const esp = especialidades.find(e => e.id === id);
        return esp || { id, nome: 'Desconhecida' };
      })
    };

    let lista = localStorageService.getMedicos();

    if (medicoAtual) {
      lista = lista.map(m => m.id === medicoAtual.id ? medicoParaSalvar : m);
      alert('Médico atualizado!');
    } else {
      lista.push(medicoParaSalvar);
      alert('Médico cadastrado!');
    }

    localStorageService.saveMedicos(lista);
    setModalAberto(false);
    carregarMedicos();
  };

  const excluirMedico = (id: number) => {
    if (!confirm('Excluir este médico?')) return;
    const lista = localStorageService.getMedicos().filter(m => m.id !== id);
    localStorageService.saveMedicos(lista);
    carregarMedicos();
    alert('Médico excluído!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Médicos</h1>
        <button onClick={abrirModalCadastrar} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} /> Novo Médico
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input type="text" placeholder="Buscar médico..." className="input input-bordered w-full pl-10" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CRM</th>
                <th>Telefone</th>
                <th>Especialidades</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {medicosFiltrados.map(medico => (
                <tr key={medico.id}>
                  <td className="font-medium">{medico.nome}</td>
                  <td>{medico.crm}</td>
                  <td>{medico.telefone}</td>
                  <td>{medico.especialidades.map(e => e.nome).join(', ')}</td>
                  <td>
                    <button onClick={() => abrirModalEditar(medico)} className="btn btn-sm btn-ghost mr-2"><Edit size={18} /></button>
                    <button onClick={() => excluirMedico(medico.id!)} className="btn btn-sm btn-ghost text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">{medicoAtual ? 'Editar Médico' : 'Novo Médico'}</h3>
            <form onSubmit={salvarMedico}>
              <div className="form-control mb-4">
                <label className="label">Nome</label>
                <input type="text" className="input input-bordered" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required />
              </div>
              <div className="form-control mb-4">
                <label className="label">CRM</label>
                <input type="text" className="input input-bordered" value={formData.crm} onChange={(e) => setFormData({...formData, crm: e.target.value})} required />
              </div>
              <div className="form-control mb-4">
                <label className="label">Telefone</label>
                <input type="text" className="input input-bordered" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} />
              </div>
              <div className="form-control mb-6">
                <label className="label">Especialidades</label>
                <select multiple className="select select-bordered w-full h-32" value={formData.especialidades.map(String)} onChange={(e) => setFormData({ ...formData, especialidades: Array.from(e.target.selectedOptions, opt => Number(opt.value)) })}>
                  {especialidades.map(esp => (
                    <option key={esp.id} value={esp.id}>{esp.nome}</option>
                  ))}
                </select>
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setModalAberto(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}