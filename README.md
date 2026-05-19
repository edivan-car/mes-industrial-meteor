# 🏭 MES Industrial – Sistema de Controle de Produção
### Do Chão de Fábrica ao Código: Digitalizando a Gestão Industrial

Sistema web reativo para controle e monitoramento da produção industrial em tempo real. Este projeto simula um **MES (Manufacturing Execution System)** profissional, desenvolvido para substituir controles manuais e planilhas, garantindo a integridade dos dados desde o primeiro clique do operador.

---

## 🎯 Objetivo e Problema que Resolve
Em muitos ambientes industriais, a dependência de apontamentos manuais gera perda de dados, erros de digitação e baixa visibilidade da operação. Este sistema resolve esses problemas centralizando o fluxo produtivo em uma plataforma reativa, fornecendo uma base sólida para o cálculo de indicadores críticos como o **OEE (Eficiência Global de Equipamentos)**.

## 🛠️ Engenharia e Tomada de Decisão (Tailored Report)
Este projeto aplica conceitos de **Indústria 4.0** através de decisões técnicas fundamentadas em usabilidade e segurança de dados:

* **UX Industrial (Tablet-First):** Interface desenvolvida com Tailwind CSS, focada em usabilidade real no chão de fábrica.
    * **Botões Grandes:** Otimizados para operadores que utilizam luvas.
    * **Identidade Visual Limpa:** Foco na redução de carga cognitiva e erros de entrada.
* **Poka-Yoke Digital:** Implementação de travas de segurança (Safety Gates) que exigem a confirmação de dados da OP antes da liberação da máquina.
* **Arquitetura Moderna:** Uso do **Meteor 3.x** para garantir operações assíncronas robustas e comunicação em tempo real via WebSockets (Pub/Sub).
* **Massa de Dados Estruturada:** Utilização de arquivos JSON para simular a integração com sistemas de planejamento (PPCP/ERP).

## ✅ Status do Projeto: Fase de Estruturação e Setup (Em desenvolvimento)
- [x] Configuração de Ambiente: Ambiente Fullstack configurado com Meteor, React e Tailwind CSS.
- [x] Estrutura Inicial do Projeto: Organização modular inicial do frontend com separação entre pages, components e layouts.
- [x] Assets do Sistema: Estrutura pública inicial criada para imagens, ícones e identidade visual do sistema.
- [x] Loading Screen Industrial: Implementação da tela inicial de carregamento com animação, identidade visual MES e controle de fluxo inicial da aplicação.
- [x] Controle Inicial de Fluxo: Reorganização do App.jsx para gerenciamento da inicialização e futuras transições de tela.

### 🔄 Interfaces em desenvolvimento
- [ ] MainPage
- [ ] LoginPage
- [ ] MachinePage
- [ ] ProductionPage
- [ ] Header industrial reutilizável
- [ ] Componentes de botões operacionais

## 📂 Massa de Dados (Seed Data)
Para garantir uma demonstração imediata e facilitar os testes de desenvolvimento, o sistema será configurado futuramente para sincronizar automaticamente os dados iniciais via server/main.js:

- **Máquinas:** Cadastro via machines-mock.json para definição de postos de trabalho e IDs fixos de teste.
- **Operadores:** Base de dados simulada para validação de identificação, turnos e autenticação operacional.
- **Ordens de Produção (OPs):** Exemplos estruturados para testes do fluxo de carregamento, busca e apontamento produtivo.

## ⚙️ Como Executar o Projeto
**Pré-requisitos:** Meteor.js 3.x e Node.js instalados.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/edivan-car/mes-industrial-meteor.git
    cd mes-industrial-meteor
    ```
2.  **Instale as dependências:**
    ```bash
    meteor npm install
    ```
3.  **Execute o ambiente de desenvolvimento:**
    ```bash
    meteor run
    ```
*Nota: Na primeira execução, o servidor processará os arquivos JSON em `/private` para popular o MongoDB local.*

## 🚀 Roadmap (Próximos Passos)
- [ ] **Dashboard de KPIs:** Visualização de indicadores de performance (OEE, Disponibilidade, Qualidade) em tempo real.
- [ ] **Relatórios de Parada:** Análise histórica de motivos de inatividade por turno e máquina.
- [ ] **Interface de Login por Badge:** Simulação de login rápido via leitura de crachá (RFID).

## 💻 Tecnologias e Boas Práticas
* **Fullstack:** Meteor.js 3.x (Async/Await)
* **Frontend:** React (Hooks & Context API)
* **Estilização:** Tailwind CSS
* **Banco de Dados:** MongoDB
* **Versionamento:** Padrão de Conventional Commits

---

## 👨‍💻 Autor
**Edivan Cardoso** - Focado em transformar processos industriais através da Engenharia de Software.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/edivan-cardoso)