# 🏭 MES Industrial – Sistema de Controle de Produção

### *Do Chão de Fábrica ao Código: Digitalizando a Gestão Industrial*

Sistema web para controle e monitoramento da produção industrial em tempo real. Este projeto simula um **MES (Manufacturing Execution System)** profissional, desenvolvido para substituir controles manuais e planilhas, garantindo a integridade dos dados desde o primeiro clique do operador.

---

## 🎯 Objetivo e Problema que Resolve
Em muitos ambientes industriais, a dependência de apontamentos manuais gera perda de dados e baixa visibilidade da operação. Este sistema resolve isso centralizando o fluxo produtivo em uma plataforma reativa, fornecendo uma base sólida para o cálculo de indicadores como o **OEE (Eficiência Global)**.

## 🛠️ Tailored Report: Engenharia e Tomada de Decisão
*Este projeto aplica conceitos reais de Indústria 4.0 através de decisões técnicas fundamentadas:*

* **UX Industrial (Tablet-First):** Interface desenvolvida com **Tailwind CSS**, focada em usabilidade real no chão de fábrica.
  * **Botões Grandes:** Otimizados para operadores que utilizam luvas.
  * **Identidade Visual Limpa:** Foco na redução de erros de entrada de dados.
* **Lógica de Negócio Integrada:** O sistema já contempla a estrutura para gestão de turnos e vinculação obrigatória de Ordens de Produção (OP) para início de atividades.
* **Arquitetura Modular:** Separação clara entre a interface (React) e a lógica de API (Meteor), permitindo escalabilidade para novos módulos.

---

## ✅ Status da Fase 1: Interface e Prototipagem (Implementado)
* **Monitoramento de Máquinas:** UI renderizada para controle de ativos e status do chão de fábrica.
* **Gestão de Operadores:** Interface de cadastro com suporte a turnos de trabalho (A, B e C).
* **Gestão de OPs:** Módulo de abertura de Ordens de Produção com campos para Produto e Quantidade Planejada.
* **Navegação Industrial:** Menu superior integrado para alternância rápida entre postos de trabalho.

## 🚀 Roadmap (Próximos Passos)
- [ ] **Persistência de Dados:** Conectar os formulários ao MongoDB para salvar operadores, máquinas e OPs.
- [ ] **Lógica de Status em Tempo Real:** Implementar a transição de status (Execução/Parada) via WebSockets (Meteor Pub/Sub).
- [ ] **Dashboard de KPIs:** Visualização de indicadores de performance em tempo real.

---

## 💻 Tecnologias e Boas Práticas
* **Fullstack:** Meteor.js 3.x
* **Frontend:** React (Hooks) & Tailwind CSS
* **Banco de Dados:** MongoDB
* **Versionamento:** Padrão de **Commits Semânticos** (*Conventional Commits*) para um histórico profissional.

---

## 👨‍💻 Autor
**Edivan Cardoso** *Focado em transformar processos industriais através da Engenharia de Software.* [🔗 Meu Perfil no LinkedIn](https://www.linkedin.com/in/edivan-cardoso/)