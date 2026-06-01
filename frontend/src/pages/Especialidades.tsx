import { useState, useEffect } from 'react';
import { localStorageService } from '../services/localStorageService';
import { Especialidade } from '../types/index';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [especialidadeAtual, setEspecialidadeAtual] = useState<Especialidade | null>(null);
  const [nome, setNome] = useState('');

  useEffect(() => {
    carregarEspecialidades();
  }, []);

  const carregarEspecialidades = () => {
    const dados = localStorageService.getEspecialidades();
    setEspecialidades(dados);
  };

  const especialidadesFiltradas = especialidades.filter(e =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModalCadastrar = () => {
    setEspecialidadeAtual(null);
    setNome('');
    setModalAberto(true);
  };

  const abrirModalEditar = (especialidade: Especialidade) => {
    setEspecialidadeAtual(especialidade);
    setNome(especialidade.nome);
    setModalAberto(true);
  };

  const salvarEspecialidade = (e: React.FormEvent) => {
    e.preventDefault();
    const novaEspecialidade = {
      id: especialidadeAtual?.id || localStorageService.generateId(),
      nome
    };

    let lista = localStorageService.getEspecialidades();

    if (especialidadeAtual) {
      lista = lista.map(e => e.id === especialidadeAtual.id ? novaEspecialidade : e);
    } else {
      lista.push(novaEspecialidade);
    }

    localStorageService.saveEspecialidades(lista);
    setModalAberto(false);
    carregarEspecialidades();
    alert(especialidadeAtual ? 'Especialidade atualizada!' : 'Especialidade cadastrada!');
  };

  const excluirEspecialidade = (id: number) => {
    if (!confirm('Excluir esta especialidade?')) return;
    const lista = localStorageService.getEspecialidades().filter(e => e.id !== id);
    localStorageService.saveEspecialidades(lista);
    carregarEspecialidades();
    alert('Especialidade excluída!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Especialidades</h1>
        <button onClick={abrirModalCadastrar} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} /> Nova Especialidade
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input type="text" placeholder="Buscar especialidade..." className="input input-bordered w-full pl-10" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead><tr><th>Nome</th><th>Ações</th></tr></thead>
            <tbody>
              {especialidadesFiltradas.map(esp => (
                <tr key={esp.id}>
                  <td className="font-medium">{esp.nome}</td>
                  <td>
                    <button onClick={() => abrirModalEditar(esp)} className="btn btn-sm btn-ghost mr-2"><Edit size={18} /></button>
                    <button onClick={() => excluirEspecialidade(esp.id!)} className="btn btn-sm btn-ghost text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">{especialidadeAtual ? 'Editar' : 'Nova'} Especialidade</h3>
            <form onSubmit={salvarEspecialidade}>
              <div className="form-control mb-6">
                <label className="label">Nome da Especialidade</label>
                <input type="text" className="input input-bordered" value={nome} onChange={(e) => setNome(e.target.value)} required />
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