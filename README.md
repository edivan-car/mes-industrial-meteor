# 🏭 MES Industrial — Sistema de Controle de Produção

Sistema web para controle e monitoramento da produção industrial em tempo real, simulando um **MES (Manufacturing Execution System)** utilizado em chão de fábrica.

---

## 🎯 Objetivo

Centralizar e organizar o apontamento de produção, substituindo controles manuais e planilhas, trazendo:

* Rastreabilidade
* Confiabilidade dos dados
* Monitoramento em tempo real
* Base para indicadores industriais (OEE)

---

## 🧠 Problema que resolve

Em muitos ambientes industriais ainda existem:

* Apontamentos manuais
* Uso excessivo de planilhas
* Falta de visibilidade da produção

Isso gera:

* Perda de dados
* Baixa confiabilidade
* Dificuldade na tomada de decisão

👉 Este sistema resolve isso digitalizando e estruturando o fluxo produtivo.

---

## 🏗️ Arquitetura do Projeto

Este projeto é a base de um ecossistema maior:

Projeto 1 → Controle de Produção (MES)
Projeto 2 → Dashboard de KPIs
Projeto 3 → Simulador de Produção

---

## ⚙️ Funcionalidades

### 📋 Cadastro

* Máquinas
* Operadores
* Produtos
* Ordens de Produção

### 🏭 Apontamento de Produção

* Quantidade produzida
* Refugo
* Status da máquina (Produzindo / Parada / Falha)
* Registro de paradas e motivos

### ⏱️ Controle de Tempo

* Tempo produtivo
* Tempo de parada
* Tempo de setup

### 📊 Histórico

* Consulta por período
* Filtro por máquina, operador e OP

### 🚨 Monitoramento em Tempo Real

* Status das máquinas
* Alertas de parada
* Indicadores básicos

---

## 🧱 Tecnologias

* ⚛️ React
* ☄️ Meteor
* 🍃 MongoDB
* 🎨 TailwindCSS
* ⚡ Rspack

---

## 🔄 Fluxo do Sistema

1. Operador seleciona máquina e ordem de produção
2. Inicia produção
3. Registra eventos em tempo real:

    * Produção
    * Paradas
    * Refugo
4. Dados são armazenados e atualizados instantaneamente

---

## 🧠 Regras de Negócio

* Não é permitido produzir sem ordem ativa
* Uma máquina só pode ter uma OP ativa
* Paradas devem possuir motivo
* Refugo é registrado separadamente
* Status da máquina reflete o apontamento

---

## 📦 Estrutura do Projeto

```
imports/
 ├── api/        # Backend (collections, methods, publications)
 └── ui/         # Frontend (React)

client/          # Entrada do cliente
server/          # Entrada do servidor
```

---

## 🚀 Status do Projeto

🚧 Em desenvolvimento

---

## 🔮 Próximos Passos

* [ ] Implementar collections (machines, operators, orders)
* [ ] Criar methods com regras de negócio
* [ ] Conectar frontend com backend
* [ ] Implementar monitoramento em tempo real
* [ ] Criar dashboard de produção (Projeto 2)

---

## 👨‍💻 Autor

Desenvolvido como projeto de portfólio com foco em sistemas industriais e engenharia de software.

---
