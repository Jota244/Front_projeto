# Sistema de Gestão de Clínica

## Descrição

O Sistema de Gestão de Clínica é uma aplicação web desenvolvida para auxiliar no gerenciamento de pacientes, médicos, especialidades e consultas médicas.

O sistema permite realizar operações de cadastro, edição, exclusão e pesquisa de informações, proporcionando uma administração eficiente dos dados da clínica.

## Objetivos

* Gerenciar pacientes cadastrados.
* Gerenciar médicos e suas especialidades.
* Agendar consultas.
* Consultar informações rapidamente através de filtros de pesquisa.
* Aplicar conceitos de componentização e reutilização de código utilizando React e TypeScript.

## Tecnologias Utilizadas

* React
* TypeScript
* React Router DOM
* Tailwind CSS
* DaisyUI
* Vite

## Estrutura do Projeto

src/

├── components/

│ ├── Navbar.tsx

│ ├── Layout.tsx

│ ├── SearchBar.tsx

│ ├── PageHeader.tsx

│ ├── Modal.tsx

│ └── ConfirmDeleteButton.tsx

│

├── pages/

│ ├── Dashboard.tsx

│ ├── Pacientes.tsx

│ ├── Medicos.tsx

│ ├── Especialidades.tsx

│ └── Consultas.tsx

│

├── App.tsx

└── main.tsx

## Funcionalidades

### Pacientes

* Cadastrar paciente
* Editar paciente
* Excluir paciente
* Pesquisar paciente

### Médicos

* Cadastrar médico
* Editar médico
* Excluir médico
* Associar especialidades

### Especialidades

* Cadastrar especialidade
* Editar especialidade
* Excluir especialidade

### Consultas

* Agendar consulta
* Editar consulta
* Cancelar consulta
* Pesquisar consulta

## Componentes Reutilizáveis

O projeto utiliza componentes reutilizáveis para promover organização e manutenção do código.

### SearchBar

Componente responsável pelos campos de pesquisa.

Props:

* value
* onChange
* placeholder

### PageHeader

Componente responsável pelos títulos das páginas e botão de ação.

Props:

* titulo
* textoBotao
* onNovo

### Modal

Componente utilizado para exibir formulários e informações em janelas modais.

Props:

* aberto
* titulo
* children

### ConfirmDeleteButton

Componente reutilizável para exclusão de registros.

Props:

* onDelete

## Instalação

Instale as dependências:

npm install

## Execução

Inicie o projeto:

npm run dev


