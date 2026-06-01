import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, Stethoscope, Calendar, Award } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Pacientes', path: '/pacientes', icon: <User size={18} /> },
    { name: 'Médicos', path: '/medicos', icon: <Stethoscope size={18} /> },
    { name: 'Especialidades', path: '/especialidades', icon: <Award size={18} /> },
    { name: 'Consultas', path: '/consultas', icon: <Calendar size={18} /> }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-blue-600">Sistema Clínica</h1>

          <nav className="flex gap-2">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`btn btn-sm ${location.pathname === item.path ? 'btn-primary' : 'btn-ghost'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
