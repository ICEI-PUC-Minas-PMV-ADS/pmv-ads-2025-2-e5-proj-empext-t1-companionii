# RF-011

## Compartilhamento seguro de relatórios (Baixar o PDF)

<table>
  <tr>
    <th colspan="6" width="1000">CT-RF-01101<br>Disponibilidade da Ferramenta de Exportação</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">
      O sistema deve disponibilizar uma opção clara (Botão ou Menu de Impressão) para exportar os dados da tela atual. A ação deve ser responsiva e iniciar o processo de geração do documento.
    </td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">
      Desenvolvimento: Enzo Gomes Azevedo<br>
      Teste: Gustavo Luiz Andrade Costa
    </td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">24/11/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">
      Funcionalidade disponível. O comando de exportação foi acionado e o navegador reconheceu a solicitação imediatamente, preparando o arquivo para download/visualização sem travamentos.
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img src="../img/CT-RF-00011.png" alt="CT-RF-01101 Evidence"></td>
  </tr>
</table>

<br>

<table>
  <tr>
    <th colspan="6" width="1000">CT-RF-01102<br>Validação Visual e de Conteúdo do Arquivo PDF</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">
      O arquivo gerado (PDF) deve abrir corretamente em leitores padrão. O layout deve ser profissional, sem cortes de texto, e os dados apresentados devem ser idênticos aos filtros aplicados na tela do sistema.
    </td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">
      Desenvolvimento: Enzo Gomes Azevedo<br>
      Teste: Adriana Pereira Nascimento
    </td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">23/11/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">
      Teste de integridade aprovado. O PDF gerado possui formatação limpa e estruturada. Caracteres especiais (acentuação) foram renderizados corretamente e os gráficos/tabelas estão legíveis.
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img src="../img/CT-RF-00011.png" alt="CT-RF-01102 Evidence"></td>
  </tr>
</table>

<br>

---

## Observações Técnicas
**Endpoints testados:** `GET /api/reports/export/pdf`
**Componentes testados:** `ExportButton`
