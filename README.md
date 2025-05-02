🎓 EduSpace – Sistema de Acompanhamento de Matrículas
EduSpace é uma aplicação full stack desenvolvida como parte de uma avaliação técnica, com operações CRUD completas para gerenciar Cursos, Alunos e Matrículas.

📌 Funcionalidades
✅ Gestão de Cursos (criar, listar, editar, excluir)

✅ Gestão de Alunos (nome, e-mail, data de nascimento — com validação de maioridade)

✅ Gestão de Matrículas (matricular e desmatricular alunos em cursos)

✅ Listagens e Filtros:

Alunos por curso

Todos os alunos matriculados

Todos os cursos disponíveis

🛠 Tecnologias Utilizadas
Backend
.NET 9

Entity Framework Core (com Migrations)

SQL Server

Frontend
React

TypeScript ✅

📁 Estrutura do Projeto
bash
Copy
Edit
/eduspace
├── backend/           # API em .NET 9 com EF Core e SQL Server
├── frontend/          # Aplicação React com TypeScript
└── README.md          # Documentação do projeto
💻 Frontend (React + TypeScript)
1. Navegue até o diretório do frontend:
bash
Copy
Edit
cd frontend
2. Instale as dependências:
bash
Copy
Edit
npm install
3. Inicie o servidor de desenvolvimento:
bash
Copy
Edit
npm run dev
A aplicação será executada em: http://localhost:3000

🗂 Endpoints Principais (API)
Cursos
GET /api/courses: Lista todos os cursos disponíveis.

POST /api/courses: Cria um novo curso.

PUT /api/courses/{id}: Atualiza um curso existente.

DELETE /api/courses/{id}: Exclui um curso.

Alunos
GET /api/students: Lista todos os alunos.

POST /api/students: Cria um novo aluno.

PUT /api/students/{id}: Atualiza um aluno.

DELETE /api/students/{id}: Exclui um aluno.

Matrículas
POST /api/enrollments: Matricula um aluno em um curso.

DELETE /api/enrollments: Desmatricula um aluno de um curso.

GET /api/courses/{id}/students: Lista os alunos matriculados em um curso.

GET /api/students/enrolled: Lista todos os alunos com matrícula ativa.

🌐 Repositório no GitHub
O código-fonte deste projeto pode ser encontrado no GitHub:

Repositório no GitHub

✅ Entregáveis
Backend desenvolvido em .NET 9

Frontend desenvolvido em React com TypeScript

Entity Framework com Migrations

Pelo menos um componente implementado em React

Instruções para rodar o projeto localmente

Repositório público no GitHub

🧪 Diferenciais
Utilização de TypeScript no frontend

Deploy na nuvem (em breve…)

🔗 Link do Projeto Publicado (em breve…)
A versão publicada do projeto estará disponível em:

EduSpace - Versão ao Vivo

📝 Notas
Este projeto tem como objetivo gerenciar o sistema de matrículas para cursos e alunos, incluindo funcionalidades como adicionar, atualizar e excluir cursos, alunos e matrículas.

O projeto inclui validações, como a verificação de idade dos alunos para garantir que estejam acima da idade mínima exigida.
