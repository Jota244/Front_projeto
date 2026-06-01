// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import Especialidades from './pages/Especialidades';
import Consultas from './pages/Consultas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/pacientes" element={<Layout><Pacientes /></Layout>} />
        <Route path="/medicos" element={<Layout><Medicos /></Layout>} />
        <Route path="/especialidades" element={<Layout><Especialidades /></Layout>} />
        <Route path="/consultas" element={<Layout><Consultas /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;