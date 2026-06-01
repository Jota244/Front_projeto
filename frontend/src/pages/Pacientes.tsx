import { useState, useEffect } from 'react';
import { localStorageService } from '../services/localStorageService';
import { Paciente } from '../types/index';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteAtual, setPacienteAtual] = useState<Paciente | null>(null);
  const [formData, setFormData] = useState({
    nome: '', cpf: '', dataNascimento: '', telefone: '', email: ''
  });

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = () => {
    const dados = localStorageService.getPacientes();
    setPacientes(dados);
  };

  const pacientesFiltrados = pacientes.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModalCadastrar = () => {
    setPacienteAtual(null);
    setFormData({ nome: '', cpf: '', dataNascimento: '', telefone: '', email: '' });
    setModalAberto(true);
  };

  const abrirModalEditar = (paciente: Paciente) => {
    setPacienteAtual(paciente);
    setFormData({
      nome: paciente.nome,
      cpf: paciente.cpf,
      dataNascimento: paciente.dataNascimento || '',
      telefone: paciente.telefone || '',
      email: paciente.email || ''
    });
    setModalAberto(true);
  };

  const salvarPaciente = (e: React.FormEvent) => {
    e.preventDefault();

    const novoPaciente = { ...formData, id: pacienteAtual?.id || localStorageService.generateId() };

    let listaAtual = localStorageService.getPacientes();

    if (pacienteAtual) {
      listaAtual = listaAtual.map(p => p.id === pacienteAtual.id ? novoPaciente : p);
      alert('Paciente atualizado com sucesso!');
    } else {
      listaAtual.push(novoPaciente);
      alert('Paciente cadastrado com sucesso!');
    }

    localStorageService.savePacientes(listaAtual);
    setModalAberto(false);
    carregarPacientes();
  };

  const excluirPaciente = (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este paciente?')) return;

    let listaAtual = localStorageService.getPacientes().filter(p => p.id !== id);
    localStorageService.savePacientes(listaAtual);

    alert('Paciente excluído com sucesso!');
    carregarPacientes();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        <button onClick={abrirModalCadastrar} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} /> Novo Paciente
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="input input-bordered w-full pl-10"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data Nasc.</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.map(paciente => (
                <tr key={paciente.id}>
                  <td className="font-medium">{paciente.nome}</td>
                  <td>{paciente.cpf}</td>
                  <td>{paciente.dataNascimento}</td>
                  <td>{paciente.telefone}</td>
                  <td>{paciente.email}</td>
                  <td>
                    <button onClick={() => abrirModalEditar(paciente)} className="btn btn-sm btn-ghost mr-2">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => excluirPaciente(paciente.id!)} className="btn btn-sm btn-ghost text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {pacienteAtual ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}
            </h3>
            <form onSubmit={salvarPaciente}>
              {/* ... mesmos campos do form anterior ... */}
              <div className="form-control mb-4">
                <label className="label">Nome</label>
                <input type="text" className="input input-bordered" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required />
              </div>

              <div className="form-control mb-4">
                <label className="label">CPF</label>
                <input type="text" className="input input-bordered" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} required />
              </div>

              <div className="form-control mb-4">
                <label className="label">Data de Nascimento</label>
                <input type="date" className="input input-bordered" value={formData.dataNascimento} onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})} />
              </div>

              <div className="form-control mb-4">
                <label className="label">Telefone</label>
                <input type="text" className="input input-bordered" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} />
              </div>

              <div className="form-control mb-6">
                <label className="label">Email</label>
                <input type="email" className="input input-bordered" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
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