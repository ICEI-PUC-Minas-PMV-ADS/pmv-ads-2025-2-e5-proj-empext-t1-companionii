# RF-009

## Dashboard de métricas: tempo por projeto /tipo de tarefa, histórico semanal/mensal

<table>
  <tr>
    <th colspan="6" width="1000">CT-RF-00901<br>Visualização de métricas e gráficos no Dashboard</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">
      O sistema deve renderizar o Dashboard exibindo gráficos de "Tempo por Projeto" e "Tarefas por Status".
      Deve ser possível alternar os filtros de período (Semanal/Mensal) e os gráficos devem ser redesenhados
      dinamicamente refletindo os dados da tabela <code>DAILY_TASKS</code>.
    </td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">
      Desenvolvimento: William da Silva Rodrigues<br>
      Teste: Adriana Pereira Nascimento
    </td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">23/11/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">
      Teste realizado com êxito. O componente Dashboard consome corretamente os dados.
      A alternância entre as visões atualiza os eixos do gráfico sem recarregar a página e os totais exibidos batem com a soma das tarefas.
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img src="../img/CT-RF-0009.png" alt="CT-RF-00901 Evidence"></td>
  </tr>
</table>

<br>

---

## Observações Técnicas

**Endpoints testados:**
- `GET /api/dashboard/metrics`
- `GET /api/dashboard/summary`

**Componentes testados:**
- `DashboardPage` (`codigo-fonte/frontend/src/pages/DashboardPage.jsx`)
