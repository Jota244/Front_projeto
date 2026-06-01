import { Users, Stethoscope, Calendar, Award } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Bem-vindo ao Sistema de Clínica</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold">150</h2>
            <p className="text-gray-500">Pacientes Cadastrados</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <Stethoscope className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold">28</h2>
            <p className="text-gray-500">Médicos</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <Calendar className="w-12 h-12 text-purple-500 mb-4" />
            <h2 className="text-2xl font-bold">47</h2>
            <p className="text-gray-500">Consultas Hoje</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <Award className="w-12 h-12 text-amber-500 mb-4" />
            <h2 className="text-2xl font-bold">12</h2>
            <p className="text-gray-500">Especialidades</p>
          </div>
        </div>
      </div>
    </div>
  );
}