export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  code: string;
  discipline: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
  topic: string;
  contextTitle: string;
  enunciation: string;
  contextExcerpt?: string;
  diagram?: {
    type: 'thermal_desal' | 'spectral_chart' | 'geometry' | 'circuit' | 'orbit' | 'stats';
    caption?: string;
    metrics?: { label: string; value: string; color?: string }[];
  };
  options: QuestionOption[];
  correctOption: string;
  explanation: {
    overview: string;
    stepByStep: string[];
    conceptRef: string;
  };
}

export interface ExamCategory {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  type: 'Vestibulares' | 'Olimpíadas Científicas' | 'Concursos Públicos' | 'Ensino Médio';
  banca: string;
  badge: string;
  icon: string;
  totalQuestions: number;
  averageTRI: string;
  timePerQuestionMin: number;
  colorScheme: {
    primary: string;
    bgBadge: string;
    textBadge: string;
  };
  questions: Question[];
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'enem',
    name: 'ENEM',
    fullName: 'Exame Nacional do Ensino Médio',
    tagline: 'Simulações integrais das 4 áreas com pesos calibrados pelo INEP e correção guiada de redação.',
    type: 'Ensino Médio',
    banca: 'INEP',
    badge: 'Algoritmo TRI',
    icon: 'school',
    totalQuestions: 90,
    averageTRI: 'Média 760 TRI',
    timePerQuestionMin: 3.0,
    colorScheme: {
      primary: '#712ae2',
      bgBadge: '#eaddff',
      textBadge: '#25005a',
    },
    questions: [
      {
        id: 42,
        code: 'ENEM-CN-42',
        discipline: 'Ciências da Natureza • Física',
        difficulty: 'Média',
        topic: 'Física Térmica & Sustentabilidade',
        contextTitle: 'Dessalinização Solar e Eficiência Energética no Semiárido',
        enunciation: `No semiárido brasileiro, o aproveitamento direto da radiação solar para dessalinização térmica tem se destacado como uma solução de baixo custo energético. Em um protótipo experimental, a água salobra é inserida em uma câmara selada com cobertura vítrea inclinada. A energia incidente aquece a massa líquida, provocando sua evaporação e posterior condensação na face interna do vidro, onde escorre para um reservatório estéril.\n\nConsidere que a irradiação solar média local é de 800 W/m², a área coletora é de 1,5 m² e o calor latente de vaporização da água é de 2,26 × 10⁶ J/kg. O sistema opera com um rendimento térmico global de 40%.\n\nCom base nos parâmetros operacionais fornecidos, a massa de água potável obtida após 3 horas contínuas de insolação plena é mais próxima de:`,
        diagram: {
          type: 'thermal_desal',
          caption: 'Esquema Operacional do Dessalinizador (Eficiência Térmica: η = 0,40)',
          metrics: [
            { label: 'Potência Incidente', value: '1200 W', color: 'text-primary' },
            { label: 'Taxa Útil de Evaporação', value: '480 J/s', color: 'text-secondary' },
            { label: 'Produção Estimada', value: '0,76 kg/h', color: 'text-emerald-700' }
          ]
        },
        options: [
          { id: 'A', text: '0,76 kg' },
          { id: 'B', text: '2,30 kg' },
          { id: 'C', text: '4,80 kg' },
          { id: 'D', text: '5,75 kg' },
          { id: 'E', text: '8,10 kg' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'A questão avalia a capacidade de relacionar fluxo de radiação incidente, potência útil por rendimento térmico e calor latente de mudança de estado da água ao longo do tempo.',
          stepByStep: [
            '1. Cálculo da Potência Solar Total Incidente: P_total = Irradiação × Área = 800 W/m² × 1,5 m² = 1.200 W (1.200 J/s).',
            '2. Potência Térmica Útil com rendimento de 40%: P_útil = 0,40 × 1.200 W = 480 W = 480 J/s.',
            '3. Energia Útil acumulada em 3 horas (3 × 3.600 s = 10.800 s): E = P_útil × Δt = 480 J/s × 10.800 s = 5.184.000 J = 5,184 × 10⁶ J.',
            '4. Massa de água evaporada e condensada: m = E / L = (5,184 × 10⁶ J) / (2,26 × 10⁶ J/kg) ≈ 2,294 kg ≈ 2,30 kg.'
          ],
          conceptRef: 'Competência de Área 6 do ENEM - Apropriar-se de conhecimentos da Física para, em situações-problema, interpretar, avaliar ou planejar intervenções científicas-tecnológicas.'
        }
      },
      {
        id: 138,
        code: 'ENEM-CN-138',
        discipline: 'Ciências da Natureza • Física Ondulatória',
        difficulty: 'Média',
        topic: 'Dispersão e Fenômenos do Espectro Eletromagnético',
        contextTitle: 'Dispersão e Fenômenos do Espectro Eletromagnético em Atmosferas Planetárias',
        enunciation: `Ao atravessar a atmosfera terrestre, a radiação solar interage com gases e partículas em suspensão por meio de processos físicos bem caracterizados. A teoria do espalhamento molecular (ou Rayleigh) demonstra que a intensidade da radiação espalhada é inversamente proporcional à quarta potência do comprimento de onda (I ∝ 1/λ⁴). Esse comportamento é o principal responsável pela coloração azulada do céu diurno límpido e pelos tons alaranjados observados no crepúsculo.\n\nCom base exclusivamente nos princípios de conservação da energia e na relação empírica do espalhamento luminoso descrita, se a densidade de partículas do gás for duplicada mantendo-se o raio médio molecular constante, a razão entre o coeficiente de atenuação no extremo violeta (λ = 400 nm) e no infravermelho próximo (λ = 800 nm) será de:`,
        diagram: {
          type: 'spectral_chart',
          caption: 'Curva de Transmitância Relativa x Comprimento de Onda (λ) - Resolução 0.2 nm',
        },
        options: [
          { id: 'A', text: '2 vezes maior, visto que o efeito de atenuação está condicionado linearmente ao número de espalhadores por unidade de volume.' },
          { id: 'B', text: '4 vezes maior, correspondendo ao quadrado do índice refrativo do meio atmosférico considerado.' },
          { id: 'C', text: '16 vezes maior, pois a dispersão varia proporcionalmente a (800 / 400)⁴ = 2⁴ = 16, permanecendo a relação geométrica invariante à densidade.' },
          { id: 'D', text: '32 vezes maior, já que a duplicação da densidade amplifica o termo da quarta potência pelo fator volumétrico.' },
          { id: 'E', text: 'Invariável, visto que o espalhamento molecular se anula quando partículas de mesma dimensão colidem isotropicamente.' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'Pela Lei de Rayleigh, a seção de choque de espalhamento por partícula depende de 1/λ⁴. A duplicação da densidade duplica linearmente ambos os coeficientes, cancelando-se na razão.',
          stepByStep: [
            '1. O coeficiente de espalhamento molecular é dado por: σ(λ) ∝ ρ / λ⁴, onde ρ é a densidade numérica de partículas.',
            '2. A razão entre os coeficientes para dois comprimentos de onda λ₁ = 400 nm e λ₂ = 800 nm é: σ(λ₁) / σ(λ₂) = (ρ / 400⁴) / (ρ / 800⁴) = (800 / 400)⁴ = 2⁴ = 16.',
            '3. A densidade ρ multiplicada por 2 incide tanto no numerador quanto no denominador, portanto a razão independe do valor da densidade.'
          ],
          conceptRef: 'Óptica Física e Fenômenos Ondulatórios - Matriz de Referência do ENEM, Habilidade 18.'
        }
      },
      {
        id: 154,
        code: 'ENEM-MAT-154',
        discipline: 'Matemática e suas Tecnologias',
        difficulty: 'Fácil',
        topic: 'Matemática Financeira & Modelagem Linear',
        contextTitle: 'Otimização de Consumo Energético e Bandeira Tarifária',
        enunciation: `Uma família adota uma estratégia de substituição de lâmpadas incandescentes de 60 W por lâmpadas de LED de 9 W em 10 cômodos da residência. Cada lâmpada permanece acesa em média 5 horas por dia. O custo da tarifa de energia elétrica com impostos é de R$ 0,80 por kWh consumido.\n\nConsiderando um mês comercial de 30 dias, a economia financeira mensal gerada exclusivamente pela troca dessas 10 lâmpadas é de:`,
        options: [
          { id: 'A', text: 'R$ 61,20' },
          { id: 'B', text: 'R$ 73,44' },
          { id: 'C', text: 'R$ 85,00' },
          { id: 'D', text: 'R$ 91,80' },
          { id: 'E', text: 'R$ 102,50' }
        ],
        correctOption: 'A',
        explanation: {
          overview: 'Problema clássico de potência, consumo de energia em kWh e cálculo tarifário com proporções diretas.',
          stepByStep: [
            '1. Diferença de potência economizada por lâmpada: ΔP = 60 W - 9 W = 51 W.',
            '2. Para 10 lâmpadas: ΔP_total = 10 × 51 W = 510 W = 0,51 kW.',
            '3. Tempo de funcionamento no mês: 5 h/dia × 30 dias = 150 horas.',
            '4. Energia economizada no mês: E = 0,51 kW × 150 h = 76,5 kWh.',
            '5. Economia financeira: 76,5 kWh × R$ 0,80/kWh = R$ 61,20.'
          ],
          conceptRef: 'Habilidade 21 do ENEM: Resolver problema com dados apresentados em situação real de consumo.'
        }
      }
    ]
  },
  {
    id: 'fuvest',
    name: 'FUVEST',
    fullName: 'Vestibular USP - Universidade de São Paulo',
    tagline: 'Baterias aprofundadas com ênfase nas bancas estaduais mais densas: 1ª e 2ª fases com dissertativas.',
    type: 'Vestibulares',
    banca: 'FUVEST',
    badge: 'Foco Medicina & USP',
    icon: 'biotech',
    totalQuestions: 90,
    averageTRI: '79% acertos',
    timePerQuestionMin: 3.3,
    colorScheme: {
      primary: '#00288e',
      bgBadge: '#dde1ff',
      textBadge: '#001453',
    },
    questions: [
      {
        id: 1,
        code: 'FUVEST-BIO-01',
        discipline: 'Biologia Celular & Genética',
        difficulty: 'Difícil',
        topic: 'Equilíbrio de Hardy-Weinberg e Anemia Falciforme',
        contextTitle: 'Vantagem Heterozigótica e Dinâmica Populacional',
        enunciation: `Em certas regiões da África Subsaariana onde a malária por Plasmodium falciparum é endêmica, a frequência do alelo mutante da hemoglobina S (HbS) é mantida em níveis expressivos devido à resistência oferecida aos indivíduos heterozigotos (HbA/HbS). Em uma população isolada em equilíbrio de Hardy-Weinberg, verificou-se que a frequência de indivíduos homozigotos recessivos afetados por anemia falciforme severa ao nascer é de 4% (0,04).\n\nConsiderando que a população mantém acasalamentos aleatórios e ausência de novas mutações imediatas, a porcentagem esperada de indivíduos heterozigotos portadores da vantagem adaptativa é de:`,
        options: [
          { id: 'A', text: '16%' },
          { id: 'B', text: '24%' },
          { id: 'C', text: '32%' },
          { id: 'D', text: '48%' },
          { id: 'E', text: '64%' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'Aplicação direta do teorema de Hardy-Weinberg: p² + 2pq + q² = 1 e p + q = 1.',
          stepByStep: [
            '1. A frequência de indivíduos homozigotos recessivos (q²) é 0,04. Logo, q = √0,04 = 0,2.',
            '2. Como p + q = 1, temos p = 1 - 0,2 = 0,8 (frequência do alelo HbA).',
            '3. A frequência de heterozigotos (2pq) é: 2 × (0,8) × (0,2) = 0,32 = 32%.'
          ],
          conceptRef: 'Genética de Populações e Seleção Natural Equilibradora (Polimorfismo Balanceado).'
        }
      },
      {
        id: 2,
        code: 'FUVEST-QUI-02',
        discipline: 'Química Geral & Orgânica',
        difficulty: 'Média',
        topic: 'Isomeria Espacial & Estereoquímica Farmacológica',
        contextTitle: 'Quiralidade e Enantiômeros em Fármacos',
        enunciation: `O analgésico anti-inflamatório ibuprofeno possui a fórmula estrutural 2-(4-isobutilfenil)propanoico. A molécula apresenta um centro quiral no carbono que liga o grupo metila, o hidrogênio, a carboxila e o anel aromático.\n\nSobre as propriedades físico-químicas e biológicas dos enantiômeros (R)-ibuprofeno e (S)-ibuprofeno, é correto afirmar que:`,
        options: [
          { id: 'A', text: 'Apresentam pontos de fusão, pontos de ebulição e densidades diferentes em solventes aquosos apróticos.' },
          { id: 'B', text: 'Desviam o plano da luz polarizada no mesmo sentido, porém com magnitudes angulares distintas.' },
          { id: 'C', text: 'Apresentam propriedades físicas idênticas em meios quirais e mesma afinidade enzimática por receptores biológicos.' },
          { id: 'D', text: 'Possuem propriedades físicas idênticas em ambientes aquirais, mas diferem no sentido de rotação da luz polarizada e na atividade farmacológica.' },
          { id: 'E', text: 'Podem ser separados facilmente por destilação fracionada simples sem necessidade de agentes de resolução quiral.' }
        ],
        correctOption: 'D',
        explanation: {
          overview: 'Enantiômeros possuem propriedades escalares idênticas (densidade, ponto de fusão/ebulição) em ambientes aquirais, mas interagem de maneira estéreo-específica com a luz polarizada e receptores biológicos quirais.',
          stepByStep: [
            '1. Enantiômeros são imagens especulares não sobreponíveis.',
            '2. Em meios aquirais possuem mesmas propriedades físicas escalares.',
            '3. Desviam o plano da luz polarizada com mesmo módulo angular, mas sentidos opostos (+ dextrogira / - levogira).',
            '4. No corpo humano (meio quiral), o enantiômero (S) é o farmacologicamente ativo na inibição da ciclooxigenase (COX).'
          ],
          conceptRef: 'Isomeria Óptica e Interação Fármaco-Receptor.'
        }
      },
      {
        id: 3,
        code: 'FUVEST-LIT-03',
        discipline: 'Literatura Brasileira',
        difficulty: 'Média',
        topic: 'Realismo Machadiano & Ironia Narrativa',
        contextTitle: 'Memórias Póstumas de Brás Cubas e a Sociedade Patriarcal',
        enunciation: `No romance "Memórias Póstumas de Brás Cubas" (1881), de Machado de Assis, a condição de defunto autor permite ao narrador romper com os pactos de verossimilhança romântica. Ao narrar o episódio do "Emplasto Brás Cubas", o narrador expressa principalmente:`,
        options: [
          { id: 'A', text: 'Uma preocupação filantrópica genuína voltada à cura das mazelas biológicas da população escravizada do Rio de Janeiro.' },
          { id: 'B', text: 'A busca desmedida pela glória e posteridade individualista, disfarçada sob a retórica do benefício público e científico.' },
          { id: 'C', text: 'A exaltação do cientificismo positivista que vigorava nos meios acadêmicos europeus da segunda metade do século XIX.' },
          { id: 'D', text: 'O arrependimento melancólico por não ter concluído os estudos na Faculdade de Direito de Coimbra.' },
          { id: 'E', text: 'A crítica explícita à burguesia industrial emergente, defendendo os valores tradicionais do trabalho fabril.' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'Brás Cubas confessa que a ideia do emplasto não visava curar a humanidade, mas ver seu nome impresso nos jornais e cartazes de todo o Império.',
          stepByStep: [
            '1. Brás Cubas diz expressamente: "Não me movia o amor à humanidade, mas o amor da glória".',
            '2. A vaidade mórbida e o narcisismo são traços constitutivos da elite ociosa e parasita retratada com fina ironia por Machado.',
            '3. A alternativa B sintetiza com precisão o princípio estruturante do romance.'
          ],
          conceptRef: 'Machado de Assis e a Trilogia Realista.'
        }
      }
    ]
  },
  {
    id: 'unicamp',
    name: 'UNICAMP',
    fullName: 'Vestibular UNICAMP - Universidade Estadual de Campinas',
    tagline: 'Foco em leitura crítica, interdisciplinaridade rigorosa e questões de contextualização histórica e científica.',
    type: 'Vestibulares',
    banca: 'Comvest',
    badge: 'Interdisciplinar & Crítico',
    icon: 'auto_stories',
    totalQuestions: 72,
    averageTRI: '82% acertos',
    timePerQuestionMin: 3.5,
    colorScheme: {
      primary: '#00563a',
      bgBadge: '#85f8c4',
      textBadge: '#002114',
    },
    questions: [
      {
        id: 1,
        code: 'UNICAMP-INT-01',
        discipline: 'Interdisciplinar • Química & Meio Ambiente',
        difficulty: 'Média',
        topic: 'Acidificação dos Oceanos e Equilíbrio de Carbonatos',
        contextTitle: 'Emissões de CO₂ e Vulnerabilidade dos Recifes de Coral',
        enunciation: `A absorção contínua de dióxido de carbono antropogênico pelos oceanos altera o equilíbrio químico das águas superficiais, provocando a diminuição do pH e da concentração do íon carbonato (CO₃²⁻), crucial para a calcificação de corais e moluscos marinhos.\n\nAs reações químicas envolvidas no processo podem ser resumidas em:\nI. CO₂(aq) + H₂O(l) ⇌ H₂CO₃(aq)\nII. H₂CO₃(aq) ⇌ H⁺(aq) + HCO₃⁻(aq)\nIII. H⁺(aq) + CO₃²⁻(aq) ⇌ HCO₃⁻(aq)\n\nCom base no Princípio de Le Chatelier e nas reações apresentadas, o aumento da dissolução de CO₂ atmosférico acarreta:`,
        options: [
          { id: 'A', text: 'Aumento da concentração de íons CO₃²⁻ livres, favorecendo a biomineralização do carbonato de cálcio (CaCO₃).' },
          { id: 'B', text: 'Consumo de íons CO₃²⁻ pelo excesso de íons H⁺ gerados, dificultando a formação do esqueleto calcário dos corais.' },
          { id: 'C', text: 'Elevação do pH da água marinha devido ao caráter alcalino do íon bicarbonato (HCO₃⁻).' },
          { id: 'D', text: 'Neutralização completa do H⁺ presente na água sem alteração da disponibilidade de carbonato.' },
          { id: 'E', text: 'Inibição imediata da fotossíntese do fitoplâncton pela saturação total de íons hidrogênio.' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'O aumento de H⁺ decorrente da dissociação do ácido carbônico desloca a reação III no sentido direto, sequestrando os íons CO₃²⁻ que os corais usam para produzir CaCO₃.',
          stepByStep: [
            '1. Maior teor de CO₂ dissolve mais gás e gera mais H⁺ livre.',
            '2. O íon H⁺ reage com o carbonato livre (CO₃²⁻), transformando-o em bicarbonato (HCO₃⁻).',
            '3. Sem carbonato suficiente em saturação, o CaCO₃ presente nos recifes de corais começa a se dissolver.'
          ],
          conceptRef: 'Equilíbrio Químico em Soluções Aquosas e Crise Climática.'
        }
      },
      {
        id: 2,
        code: 'UNICAMP-HIST-02',
        discipline: 'História do Brasil',
        difficulty: 'Média',
        topic: 'Inconfidência Mineira e Circulação das Ideias Iluministas',
        contextTitle: 'Fiscalismo Metropolitano e Tensões em Vila Rica',
        enunciation: `A Inconfidência Mineira (1789) reuniu magistrados, clérigos, intelectuais e militares da capitania de Minas Gerais insatisfeitos com as diretrizes da Coroa portuguesa. Entre as reivindicações e características centrais desse movimento, destaca-se:`,
        options: [
          { id: 'A', text: 'A proposta unânime de abolição imediata da escravidão em todo o território da capitania de Minas Gerais.' },
          { id: 'B', text: 'A rejeição da cobrança da derrama sobre o ouro e a defesa de uma República inspirada no modelo da independência dos Estados Unidos.' },
          { id: 'C', text: 'A aliança formal com as massas camponesas e escravizadas inspirada na Revolução do Haiti.' },
          { id: 'D', text: 'A manutenção irrestrita do pacto colonial e o apoio irrestrito ao Marquês de Pombal.' },
          { id: 'E', text: 'A intenção de transferir a capital da colônia para Salvador visando o fortalecimento do comércio açucareiro.' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'A Inconfidência Mineira foi um movimento elitista pautado no iluminismo e no exemplo da independência das Treze Colônias norte-americanas, deflagrado pela ameaça da derrama.',
          stepByStep: [
            '1. O estopim foi o anúncio da derrama pelo governador Visconde de Barbacena.',
            '2. Os inconfidentes propunham uma república em Minas Gerais e a criação de uma universidade em Vila Rica.',
            '3. Por serem proprietários de escravizados, não havia consenso sobre a abolição, afastando as alternativas A e C.'
          ],
          conceptRef: 'Movimentos Emancipacionistas no Brasil Colonial.'
        }
      },
      {
        id: 3,
        code: 'UNICAMP-MAT-03',
        discipline: 'Matemática • Geometria Espacial',
        difficulty: 'Difícil',
        topic: 'Tronco de Pirâmide & Volumes Compostos',
        contextTitle: 'Volume e Capacidade em Reservatório Trapezoidal',
        enunciation: `Um reservatório de água possui o formato de um tronco de pirâmide reta de bases quadradas paralelas. A aresta da base superior mede 6 metros, a aresta da base inferior mede 4 metros e a altura do reservatório é de 3 metros.\n\nSendo a fórmula do volume de um tronco de pirâmide dada por V = (h/3) × (B + √(B × b) + b), a capacidade total desse reservatório em litros é de:`,
        options: [
          { id: 'A', text: '68.000 litros' },
          { id: 'B', text: '76.000 litros' },
          { id: 'C', text: '84.000 litros' },
          { id: 'D', text: '92.000 litros' },
          { id: 'E', text: '108.000 litros' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'Cálculo de volume do tronco de pirâmide de bases regulares e conversão de m³ para litros (1 m³ = 1.000 L).',
          stepByStep: [
            '1. Área da base superior: B = 6² = 36 m².',
            '2. Área da base inferior: b = 4² = 16 m².',
            '3. Termo médio geométrico: √(B × b) = √(36 × 16) = 6 × 4 = 24 m².',
            '4. Soma das áreas: B + √(B × b) + b = 36 + 24 + 16 = 76 m².',
            '5. Volume: V = (3 / 3) × 76 = 1 × 76 = 76 m³.',
            '6. Em litros: 76 m³ × 1.000 L/m³ = 76.000 litros.'
          ],
          conceptRef: 'Geometria Espacial Métrica e Poliedros.'
        }
      }
    ]
  },
  {
    id: 'obmep',
    name: 'OBMEP',
    fullName: 'Olimpíada Brasileira de Matemática das Escolas Públicas',
    tagline: 'Desafios de raciocínio puro, criatividade lógica, padrões numéricos e combinatória olímpica.',
    type: 'Olimpíadas Científicas',
    banca: 'IMPA / SBM',
    badge: 'Raciocínio & Criatividade',
    icon: 'calculate',
    totalQuestions: 20,
    averageTRI: 'Nível 1, 2 e 3',
    timePerQuestionMin: 4.5,
    colorScheme: {
      primary: '#1e40af',
      bgBadge: '#b8c4ff',
      textBadge: '#001453',
    },
    questions: [
      {
        id: 1,
        code: 'OBMEP-LOG-01',
        discipline: 'Raciocínio Lógico & Combinatória',
        difficulty: 'Média',
        topic: 'Princípio das Gavetas e Contagem',
        contextTitle: 'Distribuição em Tabuleiro e Padrões Numéricos',
        enunciation: `Em uma caixa há 30 bolas idênticas ao tato: 10 azuis, 10 vermelhas e 10 amarelas. Uma pessoa com os olhos vendados retira bolas sucessivamente da caixa.\n\nQual é o número mínimo de bolas que ela deve retirar para ter certeza absoluta de que retirou pelo menos 4 bolas de uma mesma cor?`,
        options: [
          { id: 'A', text: '7 bolas' },
          { id: 'B', text: '9 bolas' },
          { id: 'C', text: '10 bolas' },
          { id: 'D', text: '12 bolas' },
          { id: 'E', text: '13 bolas' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'Aplicação clássica do Princípio da Casa dos Pombos (Pior Cenário Possível).',
          stepByStep: [
            '1. Para não ter 4 bolas de nenhuma cor, o pior cenário é retirar o máximo possível de cada cor sem alcançar 4.',
            '2. Isso significa retirar exatamente 3 bolas azuis, 3 vermelhas e 3 amarelas = 3 + 3 + 3 = 9 bolas.',
            '3. A próxima bola retirada (a 10ª) obrigatoriamente completará 4 bolas de alguma das 3 cores.',
            '4. Logo, o número mínimo necessário para garantir o evento com certeza é 10 bolas.'
          ],
          conceptRef: 'Princípio das Gavetas de Dirichlet.'
        }
      },
      {
        id: 2,
        code: 'OBMEP-NUM-02',
        discipline: 'Teoria dos Números & Aritmética',
        difficulty: 'Difícil',
        topic: 'Dígito das Unidades e Ciclos de Potência',
        contextTitle: 'Comportamento Periódico de Potências Sucessivas',
        enunciation: `Considere a expressão numérica N = 7²⁰²⁴ + 3²⁰²⁴. Ao calcular o valor exato de N, o algarismo das unidades do resultado obtido é:`,
        options: [
          { id: 'A', text: '0' },
          { id: 'B', text: '2' },
          { id: 'C', text: '4' },
          { id: 'D', text: '6' },
          { id: 'E', text: '8' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'As potências de qualquer número inteiro positivo apresentam um ciclo periódico de 4 elementos no último dígito (módulo 10).',
          stepByStep: [
            '1. Ciclo das unidades de 7: 7¹=7, 7²=9, 7³=3, 7⁴=1 (período 4). Como 2024 é múltiplo de 4 (2024 = 4 × 506), 7²⁰²⁴ termina em 1.',
            '2. Ciclo das unidades de 3: 3¹=3, 3²=9, 3³=7, 3⁴=1 (período 4). Como 2024 é múltiplo de 4, 3²⁰²⁴ termina em 1.',
            '3. A soma dos últimos algarismos é: 1 + 1 = 2.',
            '4. Portanto, o algarismo das unidades de N é 2.'
          ],
          conceptRef: 'Aritmética Modular e Periodicidade Numérica.'
        }
      },
      {
        id: 3,
        code: 'OBMEP-GEO-03',
        discipline: 'Geometria Plana',
        difficulty: 'Média',
        topic: 'Áreas em Malha Triangular e Hexágonos Regulares',
        contextTitle: 'Razão de Áreas em Figuras Regulares Inscritas',
        enunciation: `Um hexágono regular de área total igual a 72 cm² tem seus vértices alternados unidos por segmentos de reta, formando um triângulo equilátero inscrito em seu interior.\n\nA área desse triângulo equilátero inscrito é igual a:`,
        options: [
          { id: 'A', text: '24 cm²' },
          { id: 'B', text: '36 cm²' },
          { id: 'C', text: '48 cm²' },
          { id: 'D', text: '54 cm²' },
          { id: 'E', text: '60 cm²' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'Propriedade de simetria do hexágono regular: ele pode ser dividido em 6 triângulos equiláteros congruentes.',
          stepByStep: [
            '1. O hexágono regular é composto por 6 triângulos equiláteros congruentes de área A = 72 / 6 = 12 cm² cada.',
            '2. Ao ligar 3 vértices alternados, cortamos 3 triângulos menores nas bordas, cada um com metade da área de dois triângulos da decomposição central.',
            '3. A área do triângulo equilátero formado equivale exatamente a 3 dos 6 triângulos congruentes originais.',
            '4. Logo, Área_inscrita = 3 × 12 = 36 cm² (ou metade da área total do hexágono).'
          ],
          conceptRef: 'Decomposição Geométrica e Relações Métricas de Polígonos Regulares.'
        }
      }
    ]
  },
  {
    id: 'oba',
    name: 'OBA',
    fullName: 'Olimpíada Brasileira de Astronomia e Astronáutica',
    tagline: 'Mecânica celeste, exploração aeroespacial, astrofísica estelar e sistemas planetários.',
    type: 'Olimpíadas Científicas',
    banca: 'SAB / AEB',
    badge: 'Astrofísica & Espaço',
    icon: 'public',
    totalQuestions: 15,
    averageTRI: 'Nível 3 e 4',
    timePerQuestionMin: 4.0,
    colorScheme: {
      primary: '#4a3e85',
      bgBadge: '#e8e0f7',
      textBadge: '#25005a',
    },
    questions: [
      {
        id: 1,
        code: 'OBA-AST-01',
        discipline: 'Mecânica Celeste & Gravitação',
        difficulty: 'Média',
        topic: 'Leis de Kepler e Órbitas Planetárias',
        contextTitle: 'Conservação do Momento Angular em Órbitas Elípticas',
        enunciation: `De acordo com a Segunda Lei de Kepler (Lei das Áreas), a linha imaginária que conecta o Sol a um planeta varre áreas iguais em intervalos de tempo iguais. Em consequência direta dessa lei e da conservação do momento angular gravitacional, quando um planeta ou cometa se desloca do afélio para o periélio em sua órbita elíptica:\n\nSua velocidade orbital escalar:`,
        options: [
          { id: 'A', text: 'Permanece constante, uma vez que a massa do Sol é invariável no tempo.' },
          { id: 'B', text: 'Diminui linearmente, pois a atração gravitacional desacelera o corpo à medida que ele se aproxima do astro central.' },
          { id: 'C', text: 'Aumenta continuamente, atingindo seu valor máximo precisamente na passagem pelo periélio.' },
          { id: 'D', text: 'Torna-se nula no periélio devido à inversão de sentido do vetor aceleração radial.' },
          { id: 'E', text: 'Oscila periodicamente sem qualquer relação com a distância heliocêntrica.' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'No periélio a distância ao Sol (r) é mínima; para conservar o momento angular (L = m · v · r) e cobrir a mesma taxa de área, a velocidade (v) deve ser máxima.',
          stepByStep: [
            '1. O campo gravitacional é uma força central, logo o torque resultante em relação ao Sol é zero.',
            '2. O momento angular L = m × r × v é constante ao longo de toda a órbita elíptica.',
            '3. Como r_periélio < r_afélio, obrigatoriamente v_periélio > v_afélio.'
          ],
          conceptRef: 'Segunda Lei de Kepler e Conservação do Momento Angular.'
        }
      },
      {
        id: 2,
        code: 'OBA-ESP-02',
        discipline: 'Astronáutica & Foguetes',
        difficulty: 'Média',
        topic: 'Equação do Foguete de Tsiolkovsky e Velocidade de Escape',
        contextTitle: 'Propulsão Química e Missões Interplanetárias',
        enunciation: `Para que uma sonda espacial não tripulada lançada da superfície terrestre escape definitivamente da atração gravitacional do planeta Terra e ingresse em uma trajetória heliocêntrica sem propulsão contínua adicional, ela deve atingir ao menos a chamada "Velocidade de Escape da Terra" (v_esc = √(2GM/R)).\n\nDesprezando a resistência do ar atmosférico e adotando G = 6,67 × 10⁻¹¹ N·m²/kg², M_Terra ≈ 6,0 × 10²⁴ kg e R_Terra ≈ 6,4 × 10⁶ m, o valor aproximado dessa velocidade crítica de escape é de:`,
        options: [
          { id: 'A', text: '3,8 km/s' },
          { id: 'B', text: '7,9 km/s' },
          { id: 'C', text: '11,2 km/s' },
          { id: 'D', text: '16,7 km/s' },
          { id: 'E', text: '29,8 km/s' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'A velocidade de escape da Terra na superfície é de aproximadamente 11,2 km/s (40.320 km/h). 7,9 km/s é a velocidade de órbita circular baixa (LEO).',
          stepByStep: [
            '1. v_esc = √[(2 × 6,67 × 10⁻¹¹ × 6,0 × 10²⁴) / (6,4 × 10⁶)].',
            '2. Numerador = 8,004 × 10¹⁴. Dividido por 6,4 × 10⁶ = 1,25 × 10⁸ m²/s².',
            '3. Raiz quadrada: √(1,25 × 10⁸) ≈ 11.180 m/s ≈ 11,2 km/s.'
          ],
          conceptRef: 'Energia Potencial Gravitacional e Velocidade de Escape.'
        }
      }
    ]
  },
  {
    id: 'obf',
    name: 'OBF',
    fullName: 'Olimpíada Brasileira de Física',
    tagline: 'Física universitária e pré-olímpica com rigor em eletrodinâmica, mecânica e termodinâmica avançada.',
    type: 'Olimpíadas Científicas',
    banca: 'Sociedade Brasileira de Física',
    badge: 'Física Teórica & Avançada',
    icon: 'bolt',
    totalQuestions: 20,
    averageTRI: 'Nível 1 a 3',
    timePerQuestionMin: 4.5,
    colorScheme: {
      primary: '#00288e',
      bgBadge: '#dde1ff',
      textBadge: '#001453',
    },
    questions: [
      {
        id: 1,
        code: 'OBF-MEC-01',
        discipline: 'Mecânica Clássica • Dinâmica',
        difficulty: 'Difícil',
        topic: 'Colisão Perfeitamente Inelástica com Atrito',
        contextTitle: 'Projétil em Bloco Balístico com Plano Inclinado',
        enunciation: `Um projétil de massa m = 50 g é disparado horizontalmente com velocidade v₀ = 200 m/s contra um bloco de madeira de massa M = 1,95 kg inicialmente em repouso sobre uma superfície horizontal perfeitamente lisa. O projétil penetra e se aloja instantaneamente no bloco.\n\nEm seguida, o conjunto (bloco + projétil) sobe por uma rampa lisa inclinada de 30° em relação à horizontal. Adotando g = 10 m/s², a distância d percorrida pelo conjunto ao longo da rampa até parar momentaneamente é de:`,
        options: [
          { id: 'A', text: '1,25 m' },
          { id: 'B', text: '2,50 m' },
          { id: 'C', text: '3,75 m' },
          { id: 'D', text: '5,00 m' },
          { id: 'E', text: '6,25 m' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'Combinação de conservação da quantidade de movimento no impacto inelástico com conservação da energia mecânica na rampa sem atrito.',
          stepByStep: [
            '1. Conservação do momento linear no choque: m × v₀ = (m + M) × V_conjunto.',
            '2. 0,05 kg × 200 m/s = (0,05 + 1,95) kg × V → 10 = 2,0 × V → V = 5,0 m/s.',
            '3. Energia cinética convertida em potencial gravitacional na rampa: (1/2) × (m + M) × V² = (m + M) × g × h → h = V² / (2g) = 25 / 20 = 1,25 m.',
            '4. A altura h se relaciona com o deslocamento d pelo seno do ângulo: sen(30°) = h / d → 0,5 = 1,25 / d → d = 2,50 m.'
          ],
          conceptRef: 'Colisões Inelásticas e Transformação de Energia Mecânica.'
        }
      },
      {
        id: 2,
        code: 'OBF-ELE-02',
        discipline: 'Eletromagnetismo',
        difficulty: 'Difícil',
        topic: 'Indução Eletromagnética & Lei de Lenz',
        contextTitle: 'Espira Condutora em Campo Magnético Variável',
        enunciation: `Uma espira condutora circular de resistência elétrica R = 4,0 Ω e raio r = 0,1 m está imersa perpendicularmente em uma região com campo magnético uniforme cuja intensidade varia com o tempo conforme a função B(t) = 2,0 + 8,0 t (com B em Tesla e t em segundos).\n\nConsiderando π ≈ 3,14, a intensidade da corrente elétrica induzida que circula na espira durante a variação do fluxo é de aproximadamente:`,
        options: [
          { id: 'A', text: '0,016 A' },
          { id: 'B', text: '0,063 A' },
          { id: 'C', text: '0,126 A' },
          { id: 'D', text: '0,250 A' },
          { id: 'E', text: '0,500 A' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'Cálculo da força eletromotriz induzida através da derivada temporal do fluxo magnético (Lei de Faraday-Neumann: ε = |dΦ/dt|).',
          stepByStep: [
            '1. Área da espira circular: A = π × r² = 3,14 × (0,1)² = 0,0314 m².',
            '2. Taxa de variação do campo magnético: dB/dt = d(2 + 8t)/dt = 8,0 T/s.',
            '3. Fem induzida: ε = A × (dB/dt) = 0,0314 × 8,0 ≈ 0,2512 V.',
            '4. Pela 1ª Lei de Ohm: i = ε / R = 0,2512 V / 4,0 Ω ≈ 0,0628 A ≈ 0,063 A.'
          ],
          conceptRef: 'Lei de Faraday-Lenz e Correntes Induzidas.'
        }
      }
    ]
  },
  {
    id: 'banco-do-brasil',
    name: 'Banco do Brasil',
    fullName: 'Concurso Público - Escriturário & Agente de Tecnologia',
    tagline: 'Conhecimentos bancários, matemática financeira comercial, LGPD, atendimento e compliance.',
    type: 'Concursos Públicos',
    banca: 'Cesgranrio',
    badge: 'Carreira Bancária',
    icon: 'account_balance',
    totalQuestions: 70,
    averageTRI: 'Banca Cesgranrio',
    timePerQuestionMin: 2.8,
    colorScheme: {
      primary: '#00288e',
      bgBadge: '#dde1ff',
      textBadge: '#001453',
    },
    questions: [
      {
        id: 1,
        code: 'BB-CB-01',
        discipline: 'Conhecimentos Bancários',
        difficulty: 'Média',
        topic: 'Sistema Financeiro Nacional & Política Monetária',
        contextTitle: 'Atribuições do Copom e Mecanismo de Transmissão da Selic',
        enunciation: `No âmbito do Sistema Financeiro Nacional (SFN), o Comitê de Política Monetária (Copom), instituído pelo Banco Central do Brasil (Bacen), tem como competência precípua estabelecer a meta para a Taxa Selic.\n\nQuando o Copom decide elevar a taxa básica de juros (Selic Meta), o objetivo macroeconômico prioritário da autoridade monetária é:`,
        options: [
          { id: 'A', text: 'Incentivar o endividamento do consumidor para aquecer o comércio de bens duráveis.' },
          { id: 'B', text: 'Desestimular a captação de recursos por meio de títulos públicos federais.' },
          { id: 'C', text: 'Conter a demanda agregada e ancorar as expectativas de inflação dentro das metas fixadas pelo Conselho Monetário Nacional (CMN).' },
          { id: 'D', text: 'Reduzir as reservas cambiais internacionais custodiadas pelo Tesouro Nacional.' },
          { id: 'E', text: 'Subsidiar linhas de crédito imobiliário popular através do compulsório bancário.' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'A taxa Selic é o principal instrumento de política monetária para o regime de metas de inflação. Subir os juros encarece o crédito, desacelerando a demanda agregada.',
          stepByStep: [
            '1. O Copom reúne-se a cada 45 dias para definir a taxa Selic Meta.',
            '2. Uma Selic mais alta aumenta o custo do crédito bancário para empresas e famílias.',
            '3. Com consumo e investimento mais moderados, a pressão sobre os preços arrefece, mantendo o IPCA dentro da meta do CMN.'
          ],
          conceptRef: 'Política Monetária e Órgãos Normativos do SFN.'
        }
      },
      {
        id: 2,
        code: 'BB-MF-02',
        discipline: 'Matemática Financeira',
        difficulty: 'Média',
        topic: 'Sistemas de Amortização (SAC vs Price)',
        contextTitle: 'Características Estruturais do Sistema Francês de Amortização',
        enunciation: `Um cliente bancário contratou uma linha de crédito imobiliário comercial de R$ 120.000,00 regida pelo Sistema Francês de Amortização (Tabela Price), com taxa de juros efetiva de 1% ao mês e prazo de 60 meses.\n\nNesse modelo financeiro de amortização (Tabela Price), é correto afirmar que, ao longo do fluxo de pagamentos das parcelas:`,
        options: [
          { id: 'A', text: 'O valor da prestação mensal total é constante, enquanto a cota de juros decresce e a cota de amortização do principal cresce.' },
          { id: 'B', text: 'O valor da amortização mensal é estritamente constante, enquanto as prestações diminuem mês a mês.' },
          { id: 'C', text: 'Os juros são cobrados integralmente na primeira parcela, dispensando encargos nos meses subsequentes.' },
          { id: 'D', text: 'O saldo devedor permanece inalterado até a última prestação do contrato.' },
          { id: 'E', text: 'A amortização mensal decresce exponencialmente à medida que o saldo devedor é liquidado.' }
        ],
        correctOption: 'A',
        explanation: {
          overview: 'Na Tabela Price as prestações (PMT) são fixas. Como o saldo devedor reduz, a parcela de juros (J = i × SD) cai, logo a amortização (A = PMT - J) sobe a cada mês.',
          stepByStep: [
            '1. Tabela Price: PMT = constante.',
            '2. Em cada mês, J_k = taxa × Saldo Devedor anterior.',
            '3. Amortização A_k = PMT - J_k.',
            '4. Portanto, a parcela de juros decresce e a de amortização cresce a cada período.'
          ],
          conceptRef: 'Sistemas de Amortização Financeira - Tabela Price vs SAC.'
        }
      }
    ]
  },
  {
    id: 'policia-federal',
    name: 'Polícia Federal',
    fullName: 'Concurso Polícia Federal - Agente & Escrivão',
    tagline: 'Direito Constitucional, Processual Penal, Contabilidade, Informática e Criminologia.',
    type: 'Concursos Públicos',
    banca: 'Cebraspe',
    badge: 'Carreira Policial de Elite',
    icon: 'shield',
    totalQuestions: 120,
    averageTRI: 'Padrão Certo/Errado',
    timePerQuestionMin: 2.2,
    colorScheme: {
      primary: '#1e40af',
      bgBadge: '#dde1ff',
      textBadge: '#001453',
    },
    questions: [
      {
        id: 1,
        code: 'PF-CONST-01',
        discipline: 'Direito Constitucional',
        difficulty: 'Média',
        topic: 'Direitos Fundamentais & Inviolabilidade do Domicílio',
        contextTitle: 'Artigo 5º, XI da CF/88 e Jurisprudência do STF (Tema 280)',
        enunciation: `De acordo com a Constituição Federal de 1988 e a jurisprudência vinculante fixada pelo Supremo Tribunal Federal (STF - RE 603.616/RO, Tema 280), a entrada forçada em domicílio sem mandado judicial, inclusive durante o período noturno, é lícita quando:`,
        options: [
          { id: 'A', text: 'Houver denúncia anônima desprovida de diligências prévias de verificação sumária.' },
          { id: 'B', text: 'Amparada em fundadas razões, devidamente justificadas pelas circunstâncias do caso concreto, que indiquem a ocorrência de situação de flagrante delito no interior da residência.' },
          { id: 'C', text: 'O morador demonstrar comportamento de nervosismo ao avistar viatura policial na via pública.' },
          { id: 'D', text: 'Autorizada exclusivamente por decisão verbal de autoridade policial competente sem posterior registro formal.' },
          { id: 'E', text: 'Conduzida por força policial especializada em qualquer caso de investigação de crimes punidos com reclusão.' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'O STF firmou tese de repercussão geral: a entrada forçada em domicílio sem mandado é legítima, a qualquer hora do dia ou da noite, quando amparada em fundadas razões que indiquem flagrante delito no interior.',
          stepByStep: [
            '1. Art. 5º, XI da CF/88: "a casa é asilo inviolável do indivíduo... salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial".',
            '2. O STF pacificou que o controle judicial a posteriori exige fundamentação prévia baseada em indícios concretos objetivos (fundadas razões).'
          ],
          conceptRef: 'Direito Constitucional - Direitos e Garantias Fundamentais.'
        }
      },
      {
        id: 2,
        code: 'PF-INFO-02',
        discipline: 'Informática & Segurança da Informação',
        difficulty: 'Média',
        topic: 'Criptografia Assimétrica e Assinatura Digital',
        contextTitle: 'Infraestrutura de Chaves Públicas (ICP-Brasil)',
        enunciation: `No processo de emissão e verificação de uma assinatura digital baseada em criptografia de chave pública (assimétrica), o remetente garante a autenticidade e o não-repúdio do documento ao cifrar o hash do arquivo utilizando:`,
        options: [
          { id: 'A', text: 'A chave pública do destinatário da mensagem.' },
          { id: 'B', text: 'A sua própria chave privada (do remetente).' },
          { id: 'C', text: 'Uma chave simétrica efêmera gerada por algoritmo de bloco.' },
          { id: 'D', text: 'A chave pública da Autoridade Certificadora Raiz.' },
          { id: 'E', text: 'O certificado digital revogado de uma terceira parte confiável.' }
        ],
        correctOption: 'B',
        explanation: {
          overview: 'A assinatura digital consiste em encriptar o resumo criptográfico (hash) da mensagem com a chave PRIVADA do remetente. Qualquer pessoa com a chave pública do remetente pode descriptografar e validar.',
          stepByStep: [
            '1. O remetente gera o hash da mensagem (ex: SHA-256).',
            '2. O remetente encripta esse hash com sua chave privada: esta é a assinatura digital.',
            '3. O destinatário recebe o documento, calcula o hash do texto e decifra a assinatura com a chave pública do remetente.',
            '4. Se os dois hashes coincidirem, confirma-se autoria (não-repúdio) e integridade.'
          ],
          conceptRef: 'Segurança da Informação e Criptografia Assimétrica.'
        }
      }
    ]
  },
  {
    id: 'prf',
    name: 'PRF',
    fullName: 'Polícia Rodoviária Federal',
    tagline: 'Legislação de trânsito (CTB), física do movimento veicular, direitos humanos e cidadania.',
    type: 'Concursos Públicos',
    banca: 'Cebraspe',
    badge: 'Segurança Viária',
    icon: 'local_police',
    totalQuestions: 120,
    averageTRI: 'Banca Cebraspe',
    timePerQuestionMin: 2.2,
    colorScheme: {
      primary: '#00563a',
      bgBadge: '#85f8c4',
      textBadge: '#002114',
    },
    questions: [
      {
        id: 1,
        code: 'PRF-CTB-01',
        discipline: 'Legislação de Trânsito • CTB',
        difficulty: 'Média',
        topic: 'Crime de Trânsito & Alcoolemia ao Volante',
        contextTitle: 'Artigo 306 do Código de Trânsito Brasileiro e Resolução Contran',
        enunciation: `Nos termos do Art. 306 do Código de Trânsito Brasileiro (Lei nº 9.503/1997), a conduta de conduzir veículo automotor com capacidade psicomotora alterada em razão da influência de álcool ou de outra substância psicoativa caracteriza crime de trânsito.\n\nCaso a constatação seja realizada por meio de teste de etilômetro (bafômetro), a tipificação criminal é formalizada quando a medição acusar concentração igual ou superior a:`,
        options: [
          { id: 'A', text: '0,05 miligrama de álcool por litro de ar alveolar.' },
          { id: 'B', text: '0,15 miligrama de álcool por litro de ar alveolar.' },
          { id: 'C', text: '0,34 miligrama de álcool por litro de ar alveolar (considerada a margem de tolerância metrológica).' },
          { id: 'D', text: '0,50 miligrama de álcool por litro de ar alveolar.' },
          { id: 'E', text: '1,00 miligrama de álcool por litro de ar alveolar.' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'O art. 306 estipula concentração de 0,3 miligrama de álcool por litro de ar alveolar. Com o desconto da margem de erro da portaria do Inmetro (0,04 mg/L), o valor medido no etilômetro que configura crime é a partir de 0,34 mg/L.',
          stepByStep: [
            '1. Infração administrativa (Art. 165 CTB): qualquer valor positivo acima da margem do aparelho (0,05 mg/L medido).',
            '2. Crime de trânsito (Art. 306 CTB): concentração igual ou superior a 0,30 mg de álcool por litro de ar alveolar expelido.',
            '3. Aplicando a tolerância do etilômetro regulada pelo Contran/Inmetro, o valor medido no visor para prisão em flagrante é a partir de 0,34 mg/L.'
          ],
          conceptRef: 'Código de Trânsito Brasileiro e Resoluções do Contran.'
        }
      },
      {
        id: 2,
        code: 'PRF-FIS-02',
        discipline: 'Física Aplicada ao Trânsito',
        difficulty: 'Média',
        topic: 'Cinemática & Distância de Frenagem com Atrito',
        contextTitle: 'Perícia Técnica e Acidentes Rodoviários',
        enunciation: `Durante a perícia de um acidente em uma rodovia federal plana e retilínea, constatou-se que o condutor de um automóvel acionou os freios bruscamente com travamento das rodas, deixando marcas contínuas de frenagem no asfalto de 45 metros até o repouso completo.\n\nSabendo que o coeficiente de atrito cinético entre os pneus e o asfalto seco era μ = 0,80 e adotando g = 10 m/s², a velocidade aproximada do veículo no exato instante em que iniciou a frenagem era de:`,
        options: [
          { id: 'A', text: '72 km/h' },
          { id: 'B', text: '86 km/h' },
          { id: 'C', text: '97 km/h' },
          { id: 'D', text: '108 km/h' },
          { id: 'E', text: '120 km/h' }
        ],
        correctOption: 'C',
        explanation: {
          overview: 'Aplicação da Equação de Torricelli combinada com a 2ª Lei de Newton para a força de atrito: a = μ × g.',
          stepByStep: [
            '1. A desaceleração decorrente do atrito: a = Fat / m = (μ × m × g) / m = μ × g = 0,80 × 10 = 8,0 m/s².',
            '2. Pela Equação de Torricelli: v² = v₀² - 2 × a × Δs.',
            '3. No repouso, v = 0: 0 = v₀² - 2 × 8,0 × 45 → v₀² = 720.',
            '4. v₀ = √720 ≈ 26,83 m/s.',
            '5. Convertendo para km/h: 26,83 × 3,6 ≈ 96,6 km/h ≈ 97 km/h.'
          ],
          conceptRef: 'Cinemática Escalar e Força de Atrito em Acidentes de Trânsito.'
        }
      }
    ]
  }
];

export interface StudentStats {
  targetExam: string;
  targetCareer: string;
  currentTRI: number;
  targetCutoffTRI: number;
  accuracyRate: number;
  totalAnswered: number;
  avgTimePerQuestion: string;
  totalSimuladosCount: number;
  nationalPercentile: number;
  competencies: {
    name: string;
    score: number;
    targetScore: number;
    answered: string;
    status: string;
    icon: string;
  }[];
  topicPriorities: {
    type: 'Urgente' | 'Atenção' | 'Dominado';
    discipline: string;
    title: string;
    accuracy: number;
    description: string;
  }[];
  history: {
    id: string;
    date: string;
    name: string;
    subtitle: string;
    banca: string;
    correctCount: number;
    totalCount: number;
    triScore: string;
    statusBadge: string;
  }[];
}

export const INITIAL_STUDENT_STATS: StudentStats = {
  targetExam: 'ENEM 2024',
  targetCareer: 'Medicina Ampla Concorrência (UFRJ / USP)',
  currentTRI: 768.5,
  targetCutoffTRI: 810.0,
  accuracyRate: 79.2,
  totalAnswered: 1420,
  avgTimePerQuestion: '2m 38s',
  totalSimuladosCount: 18,
  nationalPercentile: 95.4,
  competencies: [
    {
      name: 'Matemática e suas Tecnologias',
      score: 824.0,
      targetScore: 810.0,
      answered: '40/45 acertos (88.8%)',
      status: 'Superou a meta em +14 pts',
      icon: 'calculate'
    },
    {
      name: 'Redação Nota 1000 MoggaIA',
      score: 920.0,
      targetScore: 920.0,
      answered: 'Média de 6 redações corrigidas',
      status: 'Alinhado à nota de corte',
      icon: 'edit_note'
    },
    {
      name: 'Ciências Humanas e suas Tecnologias',
      score: 738.5,
      targetScore: 750.0,
      answered: '37/45 acertos (82.2%)',
      status: 'Faltam 11.5 pts para meta',
      icon: 'public'
    },
    {
      name: 'Linguagens, Códigos e suas Tecnologias',
      score: 685.0,
      targetScore: 710.0,
      answered: '35/45 acertos (77.7%)',
      status: 'Faltam 25.0 pts para meta',
      icon: 'menu_book'
    },
    {
      name: 'Ciências da Natureza e suas Tecnologias',
      score: 674.2,
      targetScore: 780.0,
      answered: '29/45 acertos (64.4%) • Alavanca principal',
      status: 'Gap de -105.8 pts',
      icon: 'warning'
    }
  ],
  topicPriorities: [
    {
      type: 'Urgente',
      discipline: 'Física',
      title: 'Eletrodinâmica & Circuitos',
      accuracy: 52,
      description: 'Erros frequentes em Leis de Kirchhoff e associação mista de resistores.'
    },
    {
      type: 'Atenção',
      discipline: 'Química',
      title: 'Estequiometria & Rendimento',
      accuracy: 58,
      description: 'Dificuldade em cálculos com reagentes impuros e soluções molares.'
    },
    {
      type: 'Dominado',
      discipline: 'Biologia',
      title: 'Genética Mendeliana',
      accuracy: 89,
      description: 'Domínio Pleno de herança autossômica e probabilidade.'
    },
    {
      type: 'Dominado',
      discipline: 'Matemática',
      title: 'Geometria Espacial',
      accuracy: 84,
      description: 'Domínio Pleno em cálculos de prismas, pirâmides e corpos redondos.'
    }
  ],
  history: [
    {
      id: 'sim-4-dia2',
      date: '18 Mai 2024',
      name: 'Simulado Geral Nacional MoggaCon #4',
      subtitle: 'Dia 2 • Ciências da Natureza e Matemática',
      banca: 'ENEM Padrão',
      correctCount: 69,
      totalCount: 90,
      triScore: '768.5',
      statusBadge: 'Top 5% Nacional'
    },
    {
      id: 'sim-4-dia1',
      date: '11 Mai 2024',
      name: 'Simulado Geral Nacional MoggaCon #4',
      subtitle: 'Dia 1 • Linguagens, Humanas e Redação',
      banca: 'ENEM Padrão',
      correctCount: 72,
      totalCount: 90,
      triScore: '752.0',
      statusBadge: 'Top 7% Nacional'
    },
    {
      id: 'sim-fuvest-1',
      date: '27 Abr 2024',
      name: 'FUVEST Primeira Fase Treinamento Pro',
      subtitle: 'Conhecimentos Gerais Integrados',
      banca: 'FUVEST / USP',
      correctCount: 71,
      totalCount: 90,
      triScore: '78.8 pts',
      statusBadge: 'Classificado 2ª Fase'
    },
    {
      id: 'sim-3-integral',
      date: '14 Abr 2024',
      name: 'Simulado Diagnóstico Oficial MoggaCon #3',
      subtitle: 'Integral (180 Questões)',
      banca: 'ENEM Padrão',
      correctCount: 138,
      totalCount: 180,
      triScore: '734.3',
      statusBadge: 'Top 11% Nacional'
    }
  ]
};
