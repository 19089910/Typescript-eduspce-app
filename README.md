# 🎓 EduSpace – Sistema de Acompanhamento de Matrículas

**EduSpace** é uma aplicação full stack com **CRUD completo** para gerenciamento de **Cursos, Alunos e Matrículas**, desenvolvida como parte de uma avaliação técnica.

---

## 📌 Funcionalidades

- ✅ CRUD de **Cursos** (criar, listar, editar, excluir)
- ✅ CRUD de **Alunos** (nome, e-mail, data de nascimento — com validação para maioridade)
- ✅ CRUD de **Matrículas** (matricular e desmatricular alunos em cursos)
- ✅ Listagens com filtros:
  - Alunos por curso
  - Todos os alunos matriculados
  - Todos os cursos disponíveis

---

## 🛠 Tecnologias Utilizadas

### Backend
- .NET 9
- Entity Framework Core (com Migrations)
- SQL Server

### Frontend
- React
- TypeScript ✅

---

## 📁 Estrutura do Projeto

/eduspace
├── backend/ # API em .NET 9 com EF Core e SQL Server
├── frontend/ # Aplicação React com TypeScript
└── README.md

💻 Frontend (React + TypeScript)
Acesse a pasta do frontend:

bash
Copy
Edit
cd frontend
Instale as dependências:

bash
Copy
Edit
npm install
Inicie o servidor de desenvolvimento:

bash
Copy
Edit
npm run dev
A aplicação será executada em http://localhost:3000

🗂 Endpoints Principais (API)
Entidade	Verbo HTTP	Rota	Ação
Cursos	GET	/api/cursos	Listar cursos
POST	/api/cursos	Criar curso
PUT	/api/cursos/{id}	Atualizar curso
DELETE	/api/cursos/{id}	Excluir curso
Alunos	GET	/api/alunos	Listar alunos
POST	/api/alunos	Criar aluno
PUT	/api/alunos/{id}	Atualizar aluno
DELETE	/api/alunos/{id}	Excluir aluno
Matrículas	POST	/api/matriculas	Matricular aluno em curso
DELETE	/api/matriculas	Remover aluno de curso
Filtros	GET	/api/cursos/{id}/alunos	Alunos de um curso
GET	/api/alunos/matriculados	Alunos com matrícula ativa

🌐 GitHub
Repositório do projeto:
https://github.com/seu-usuario/eduspace

✅ Entrega
✔ Projeto com backend em .NET 9
✔ Frontend em React com TypeScript
✔ Entity Framework com Migrations
✔ Componente em React
✔ Instruções para rodar o projeto localmente
✔ Repositório público no GitHub

🧪 Diferenciais
✅ Utilização de TypeScript no front-end

⏳ Deploy em nuvem (em andamento...)

🔗 Link do projeto publicado (em breve)
Aguardando URL de publicação...

arduino
Copy
Edit

Se quiser, posso gerar esse arquivo para download ou criar um repositório base para você com essa estrutura. Deseja que eu prepare isso?







