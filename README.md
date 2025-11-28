# Gerenciador de Eventos
Projeto desenvolvido para a disciplina de Desenvolvimento Web III.  
O objetivo é criar um sistema completo para gerenciar eventos, permitindo operações de cadastro, listagem, atualização e exclusão

---

## Funcionalidades
O sistema atende aos seguintes requisitos funcionais
- 1. Criar (Create): Adicionar um novo evento com Título, Descrição, Data, Local e Valor
- 2. Ler (Read): Listar todos os eventos cadastrados ou pesquisar eventos filtrando pelo título
- 3. Atualizar (Update): Editar as informações de um evento existente
- 4. Excluir (Delete): Remover um evento do banco de dados

## Tecnologias Utilizadas
### Backend 
- Node.js com TypeScript
- Express (Rotas da API)
- MongoDB (Banco de Dados)
- Mongoose (ODM para modelagem e validação)

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Como Executar

### Pré-requisitos:
- Node.js instalado.
- MongoDB rodando localmente na porta padrão (27017).

### Passo a Passo
1. Clone o repositório ou baixe os arquivos:
```Bash
git clone https://github.com/GabrielFrois/gerenciador-de-eventos.git
cd gerenciador-eventos
```

2. Instale as dependências:
```Bash
npm install
```

3. Configure o Banco de Dados:
Certifique-se de que o MongoDB está rodando. A aplicação tentará conectar automaticamente em:  
`mongodb://localhost:27017/evento` 

4. Inicie o Servidor:
```Bash
npm run dev
```
**O servidor rodará em http://localhost:3000**