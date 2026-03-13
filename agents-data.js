/*
  Data Store local dos agentes especialistas.
  Estrutura preparada para escalar para outros agentes (ex.: ESG e Carbon Free).
*/
window.BOOTCAMP_AGENTS = {
  ofertas_publicas: {
    id: "ofertas_publicas",
    nome: "Agente Especialista 1 - Ofertas Publicas NEOOH",
    fallback:
      "Este agente responde apenas com base no Data Store público da NEOOH e não possui informações suficientes para responder essa pergunta com segurança.",
    contexto_empresa: [
      "A NEOOH e lider em midia aeroportuaria e terminais rodoviarios no Brasil.",
      "A empresa possui mais de 46 mil telas digitais.",
      "A operacao esta presente em mais de 180 terminais.",
      "A NEOOH gera mais de 800 milhoes de impactos anuais.",
      "A empresa atua em aeroportos relevantes do Brasil.",
      "Meta publica de receita em 2024: R$ 300 milhoes."
    ],
    instrumentos_captacao: {
      cri: [
        "Lastreado em recebiveis imobiliarios.",
        "Pode securitizar receitas de contratos de locacao de espacos fisicos.",
        "Emissao via securitizadora registrada na CVM.",
        "Remuneracao geralmente atrelada a CDI ou IPCA + spread.",
        "Isencao de IR para pessoa fisica.",
        "Prazo tipico entre 5 e 15 anos."
      ],
      debentures: [
        "Titulos de divida corporativa emitidos diretamente pela empresa.",
        "Podem ser simples, conversiveis ou incentivadas.",
        "Distribuicao via ICVM 400 ou ICVM 476.",
        "Remuneracao por CDI + spread, IPCA + spread ou prefixada.",
        "Podem ter garantias reais ou fidejussorias.",
        "Debentures incentivadas podem ter isencao de IR para pessoa fisica, em projetos enquadraveis."
      ]
    },
    estrutura_executiva: [
      "Leonardo Chebly - CEO / Copresidente. Responsavel por comercial, negocios, tecnologia, inovacao e operacoes.",
      "Cristiano Muniz - CFO / Copresidente. Responsavel por financeiro, administrativo, M&A, governanca e compliance."
    ],
    governanca: [
      "Codigo de Cultura NEOOH.",
      "Codigo de Etica e Conduta.",
      "Canal de Denuncias.",
      "Politica de Privacidade."
    ],
    estrategia_crescimento: [
      "Aquisicao da Aioros Studios em 2022.",
      "Reforco em AR, conteudo 3D e experiencias imersivas para OOH.",
      "NEOOH Connect ligado a open innovation.",
      "Expansao de parques e circuitos.",
      "Meta de receita de R$ 300 milhoes.",
      "Uso de IA e ML operacional em segmentacao e eficiencia."
    ],
    limites: [
      "Responde sobre estrutura executiva.",
      "Responde sobre CRI, debentures, governanca e estrategia de M&A.",
      "Responde sobre meta publica de receita.",
      "Responde sobre conceitos de mercado de capitais no contexto NEOOH.",
      "Nao responde sobre dados nao publicos.",
      "Nao responde sobre rating de credito nao confirmado.",
      "Nao responde sobre covenants especificos.",
      "Nao responde sobre spreads exatos nao divulgados.",
      "Nao responde sobre comparacoes sem fonte publica."
    ],
    glossario: [
      { termo: "CRI", definicao: "Certificado de Recebiveis Imobiliarios, titulo lastreado em recebiveis do setor imobiliario." },
      { termo: "CRA", definicao: "Certificado de Recebiveis do Agronegocio." },
      { termo: "Debenture", definicao: "Titulo de divida emitido por empresa para captacao de recursos." },
      { termo: "CDI", definicao: "Taxa de referencia amplamente usada no mercado financeiro brasileiro." },
      { termo: "IPCA", definicao: "Indice oficial de inflacao no Brasil." },
      { termo: "ICVM 476", definicao: "Regra de oferta com esforcos restritos para distribuicao de valores mobiliarios." },
      { termo: "M&A", definicao: "Fusoes e aquisicoes (mergers and acquisitions)." },
      { termo: "CFO", definicao: "Chief Financial Officer, executivo responsavel pela estrategia financeira." },
      { termo: "Covenant", definicao: "Clausula contratual de monitoramento financeiro em operacoes de credito." },
      { termo: "OOH", definicao: "Out of Home, midia exibida fora de casa, como aeroportos, rodoviarias e ruas." }
    ],
    referencias: [
      { nome: "NEOOH. Quem Somos", url: "https://neooh.com.br/" },
      { nome: "Meio & Mensagem" },
      { nome: "Intelligent CIO LATAM" },
      { nome: "SoulCode Bootcamp LLM" }
    ],
    perguntas_sugeridas: [
      "A NEOOH ja emitiu CRI ou debentures?",
      "Como funciona a estrutura de um CRI para uma empresa de midia OOH?",
      "O que sao debentures incentivadas e a NEOOH se enquadra?",
      "Quem e o CFO da NEOOH e quais sao suas responsabilidades?",
      "Quais aquisicoes a NEOOH realizou e como foram financiadas?",
      "A NEOOH tem metas publicas de receita?",
      "Qual e a estrutura de governanca corporativa da NEOOH?",
      "O que e o NEOOH Connect e como ele se relaciona com inovacao e capital?"
    ],
    qa: [
      {
        pergunta: "A NEOOH ja emitiu CRI ou debentures?",
        aliases: ["neooh emitiu cri", "neooh emitiu debentures", "ja emitiu cri ou debentures"],
        resposta:
          "Com base no Data Store atual, nao ha confirmacao publica de emissao ja realizada de CRI ou debentures pela NEOOH. O que a base descreve e como esses instrumentos podem ser usados em uma estrategia de captacao da empresa."
      },
      {
        pergunta: "Como funciona a estrutura de um CRI para uma empresa de midia OOH?",
        aliases: ["estrutura de cri", "como funciona cri", "cri para ooh"],
        resposta:
          "No contexto do Data Store, o CRI pode ser estruturado com lastro em recebiveis imobiliarios, inclusive receitas de contratos de locacao de espacos fisicos. A emissao ocorre por securitizadora registrada na CVM, com remuneracao normalmente vinculada a CDI ou IPCA mais spread, e prazo tipico entre 5 e 15 anos."
      },
      {
        pergunta: "O que sao debentures incentivadas e a NEOOH se enquadra?",
        aliases: ["debentures incentivadas", "neooh se enquadra em debentures incentivadas"],
        resposta:
          "Debentures incentivadas sao titulos de divida que podem oferecer isencao de IR para pessoa fisica, desde que o projeto seja enquadravel. O Data Store nao confirma enquadramento especifico da NEOOH em emissao incentivada; ele registra apenas a possibilidade conceitual."
      },
      {
        pergunta: "Quem e o CFO da NEOOH e quais sao suas responsabilidades?",
        aliases: ["quem e o cfo", "responsabilidades do cfo", "cristiano muniz"],
        resposta:
          "Segundo o Data Store, o CFO e copresidente da NEOOH e Cristiano Muniz. Ele responde por financeiro, administrativo, M&A, governanca e compliance."
      },
      {
        pergunta: "Quais aquisicoes a NEOOH realizou e como foram financiadas?",
        aliases: ["aquisicoes da neooh", "aioros studios", "como foram financiadas as aquisicoes"],
        resposta:
          "A base registra a aquisicao da Aioros Studios em 2022, alinhada ao reforco em AR, conteudo 3D e experiencias imersivas. O Data Store nao detalha a estrutura de financiamento dessa aquisicao."
      },
      {
        pergunta: "A NEOOH tem metas publicas de receita?",
        aliases: ["meta de receita", "meta publica de receita"],
        resposta:
          "Sim. O Data Store informa meta publica de receita de R$ 300 milhoes em 2024."
      },
      {
        pergunta: "Qual e a estrutura de governanca corporativa da NEOOH?",
        aliases: ["estrutura de governanca", "governanca corporativa da neooh"],
        resposta:
          "No Data Store, a governanca da NEOOH inclui Codigo de Cultura, Codigo de Etica e Conduta, Canal de Denuncias e Politica de Privacidade."
      },
      {
        pergunta: "O que e o NEOOH Connect e como ele se relaciona com inovacao e capital?",
        aliases: ["neooh connect", "connect e inovacao", "open innovation"],
        resposta:
          "O Data Store posiciona o NEOOH Connect como frente ligada a open innovation. No contexto de capital e crescimento, ele se conecta a estrategia de expansao, ganhos de eficiencia e apoio ao desenvolvimento de novas solucoes."
      }
    ]
  }
};
