import { useState, useEffect } from 'react';
import { localStorageService } from '../services/localStorageService';
import { Consulta, Paciente, Medico } from '../types/index';
import { Plus, Trash2, Search } from 'lucide-react';

export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [consultaAtual, setConsultaAtual] = useState<Consulta | null>(null);

  const [formData, setFormData] = useState({
    dataHora: '',
    status: 'Agendada',
    observacao: '',
    pacienteId: '',
    medicoId: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    setConsultas(localStorageService.getConsultas());
    setPacientes(localStorageService.getPacientes());
    setMedicos(localStorageService.getMedicos());
  };

  const consultasFiltradas = consultas.filter(c =>
    c.paciente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.medico.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModalCadastrar = () => {
    setConsultaAtual(null);
    setFormData({ dataHora: '', status: 'Agendada', observacao: '', pacienteId: '', medicoId: '' });
    setModalAberto(true);
  };

  const salvarConsulta = (e: React.FormEvent) => {
    e.preventDefault();

    const paciente = pacientes.find(p => p.id === Number(formData.pacienteId));
    const medico = medicos.find(m => m.id === Number(formData.medicoId));

    if (!paciente || !medico) {
      alert("Selecione paciente e médico");
      return;
    }

    const novaConsulta = {
      id: consultaAtual?.id || localStorageService.generateId(),
      dataHora: formData.dataHora,
      status: formData.status,
      observacao: formData.observacao,
      paciente,
      medico
    };

    let lista = localStorageService.getConsultas();

    if (consultaAtual) {
      lista = lista.map(c => c.id === consultaAtual.id ? novaConsulta : c);
      alert('Consulta atualizada!');
    } else {
      lista.push(novaConsulta);
      alert('Consulta cadastrada!');
    }

    localStorageService.saveConsultas(lista);
    setModalAberto(false);
    carregarDados();
  };

  const excluirConsulta = (id: number) => {
    if (!confirm('Excluir esta consulta?')) return;
    const lista = localStorageService.getConsultas().filter(c => c.id !== id);
    localStorageService.saveConsultas(lista);
    carregarDados();
    alert('Consulta excluída!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Consultas</h1>
        <button onClick={abrirModalCadastrar} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} /> Nova Consulta
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input type="text" placeholder="Buscar por paciente ou médico..." className="input input-bordered w-full pl-10" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Data/Hora</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Status</th>
                <th>Observação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {consultasFiltradas.map(consulta => (
                <tr key={consulta.id}>
                  <td>{new Date(consulta.dataHora).toLocaleString('pt-BR')}</td>
                  <td className="font-medium">{consulta.paciente.nome}</td>
                  <td>{consulta.medico.nome}</td>
                  <td>
                    <span className={`badge ${consulta.status === 'Agendada' ? 'badge-primary' : 'badge-success'}`}>
                      {consulta.status}
                    </span>
                  </td>
                  <td className="max-w-xs truncate">{consulta.observacao}</td>
                  <td>
                    <button onClick={() => excluirConsulta(consulta.id!)} className="btn btn-sm btn-ghost text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Nova Consulta</h3>
            <form onSubmit={salvarConsulta}>
              <div className="form-control mb-4">
                <label className="label">Data e Hora</label>
                <input type="datetime-local" className="input input-bordered" value={formData.dataHora} onChange={(e) => setFormData({...formData, dataHora: e.target.value})} required />
              </div>

              <div className="form-control mb-4">
                <label className="label">Paciente</label>
                <select className="select select-bordered" value={formData.pacienteId} onChange={(e) => setFormData({...formData, pacienteId: e.target.value})} required>
                  <option value="">Selecione o paciente</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              </div>

              <div className="form-control mb-4">
                <label className="label">Médico</label>
                <select className="select select-bordered" value={formData.medicoId} onChange={(e) => setFormData({...formData, medicoId: e.target.value})} required>
                  <option value="">Selecione o médico</option>
                  {medicos.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
                </select>
              </div>

              <div className="form-control mb-4">
                <label className="label">Status</label>
                <select className="select select-bordered" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="Agendada">Agendada</option>
                  <option value="Realizada">Realizada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>

              <div className="form-control mb-6">
                <label className="label">Observação</label>
                <textarea className="textarea textarea-bordered" value={formData.observacao} onChange={(e) => setFormData({...formData, observacao: e.target.value})} />
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setModalAberto(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar Consulta</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}