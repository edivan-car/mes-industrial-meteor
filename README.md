🏭 MES Industrial — Sistema de Controle de Produção
Sistema web para controle e monitoramento da produção industrial em tempo real, simulando um MES (Manufacturing Execution System) utilizado em chão de fábrica para substituir controles manuais e planilhas
.
🎯 Objetivo
Digitalizar o apontamento de produção, garantindo rastreabilidade, confiabilidade dos dados e fornecendo uma base sólida para o cálculo de indicadores industriais como o OEE (Eficiência Global)
.
🧠 Problema que resolve
Em muitos ambientes industriais, a dependência de apontamentos manuais e planilhas gera perda de dados e baixa visibilidade da operação
. Este sistema resolve isso centralizando o fluxo produtivo em uma plataforma reativa em tempo real
.
🚀 Status do Projeto e Funcionalidades
O projeto é desenvolvido de forma incremental, priorizando a estabilidade e a organização modular
.
✅ Já Implementado
Monitoramento de Máquinas: Controle de status (RUNNING, STOPPED, FAILURE) com atualização instantânea via WebSockets
.
Gestão de Operadores: Cadastro de colaboradores com registro por turno (A, B ou C)
.
Ordens de Produção (OP): Sistema de abertura de ordens com validação de regras de negócio
.
Navegação Integrada: Menu industrial para alternância rápida entre módulos em ambiente de fábrica.
🔮 Próximos Passos (Roadmap)
[ ] Apontamento de Produção: Registro de peças produzidas e refugos por Ordem de Produção
.
[ ] Controle de Paradas: Registro detalhado de motivos de parada para análise de causa raiz
.
[ ] Dashboard de KPIs (Projeto 2): Visualização de OEE, Disponibilidade, Performance e Qualidade
.
💡 Diferencial: UX Industrial (Tablet-First)
Um dos grandes destaques deste projeto é o foco na usabilidade real do chão de fábrica
:
Interface Estilo Tablet: Desenvolvida para ser operada em dispositivos móveis fixados nas máquinas.
Botões Grandes: Layout otimizado com Tailwind CSS para facilitar o toque, mesmo se o operador estiver utilizando luvas
.
Feedback Visual Imediato: Uso de cores semafóricas (🟢, 🟡, 🔴) para identificação rápida do status da linha de produção
.
🛠️ Tecnologias e Boas Práticas
Fullstack: Meteor.js 3.x (Reatividade e Pub/Sub em tempo real)
.
Frontend: React com Hooks e Tailwind CSS
.
Banco de Dados: MongoDB (Documentos NoSQL flexíveis)
.
Build Tool: Rspack para alta performance no desenvolvimento
.
Engenharia de Software:
Arquitetura Modular: Separação clara entre imports/api (negócio) e imports/ui (interface)
.
Commits Semânticos: Uso do padrão Conventional Commits (feat:, refactor:, chore:) para um histórico rastreável e profissional
.
🧠 Regras de Negócio Implementadas
Rigor de Produção: Não é permitido iniciar atividades sem uma Ordem de Produção (OP) ativa
.
Exclusividade de Máquina: Cada máquina só pode processar uma OP por vez, evitando conflitos de dados
.
Segurança Básica: Métodos protegidos que exigem autenticação para alterações no sistema
.

--------------------------------------------------------------------------------
Autor: Edivan Cardoso  
Focado em transformar processos industriais através da Engenharia de Software.