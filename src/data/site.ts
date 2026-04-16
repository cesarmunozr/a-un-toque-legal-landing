// Source of truth for all page content.
// Edit here — sections consume these exports at build time.

export interface Differentiator {
  numeral: string;
  title: string;
  body: string;
}

export interface Step {
  index: string;
  title: string;
  body: string;
}

export interface PracticeArea {
  numeral: string;
  area: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export type TeamImageKey =
  | "gonzalo-cisternas"
  | "juan-pablo-lorenzini"
  | "daniela-saleh"
  | "jose-tomas-eyzaguirre"
  | "marlene-molero";

export interface TeamMember {
  name: string;
  role: string;
  university: string;
  imageKey: TeamImageKey;
  bio: string;
  credentials: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

// ─── Diferenciadores ──────────────────────────────────────────────────────────

export const differentiators: Differentiator[] = [
  {
    numeral: "01",
    title: "Respuesta en 24 horas",
    body: "Respondemos toda consulta dentro de un día hábil. Su tiempo es tan valioso como el nuestro.",
  },
  {
    numeral: "02",
    title: "Acceso directo al equipo",
    body: "Sin intermediarios. Habla directamente con el abogado a cargo de su caso desde el primer contacto.",
  },
  {
    numeral: "03",
    title: "Resultados medibles, plazos reales",
    body: "No entregamos informes de 40 páginas. Le decimos qué esperar, cuándo, y qué haremos en cada etapa.",
  },
];

// ─── Cómo trabajamos ──────────────────────────────────────────────────────────

export const steps: Step[] = [
  {
    index: "01",
    title: "Consulta",
    body: "Una conversación directa para entender su situación, sin compromiso y sin costo.",
  },
  {
    index: "02",
    title: "Diagnóstico",
    body: "Análisis claro de su caso y propuesta de honorarios por escrito dentro de 24 horas.",
  },
  {
    index: "03",
    title: "Estrategia",
    body: "Definimos el camino a seguir con hitos concretos y fechas estimadas.",
  },
  {
    index: "04",
    title: "Ejecución",
    body: "Trabajamos en su caso manteniéndole informado en cada etapa relevante.",
  },
  {
    index: "05",
    title: "Seguimiento",
    body: "Una vez resuelto su asunto, quedamos disponibles para cualquier consulta futura.",
  },
];

// ─── Áreas de práctica ────────────────────────────────────────────────────────

export const practiceAreas: PracticeArea[] = [
  {
    numeral: "01",
    area: "Litigación Civil Compleja",
    description:
      "Representación estratégica en juicios civiles de alta complejidad ante tribunales de todo el país.",
  },
  {
    numeral: "02",
    area: "Libre Competencia y Mercados Regulados",
    description:
      "Asesoría ante la FNE y el TDLC en investigaciones, consultas y operaciones de concentración.",
  },
  {
    numeral: "03",
    area: "Derecho Laboral",
    description:
      "Despidos injustificados, tutela laboral, negociación colectiva y asesoría continua a empleadores.",
  },
  {
    numeral: "04",
    area: "Derecho de Familia y Patrimonio",
    description:
      "Divorcios, acuerdos de tuición, alimentos y protección del patrimonio familiar.",
  },
  {
    numeral: "05",
    area: "Tribunales Superiores de Justicia",
    description:
      "Recursos de apelación, casación y amparos ante la Corte de Apelaciones y la Corte Suprema.",
  },
];

// ─── Testimoniales ────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    quote:
      "Resolví un problema laboral que arrastraba hace dos años en menos de tres semanas. La claridad con que me explicaron el proceso fue lo que más valoré.",
    author: "Carolina Méndez",
    role: "Directora de RRHH",
  },
  {
    quote:
      "Buscaba un abogado que me hablara en español, no en juridiqués. Los encontré. Mi contrato quedó perfecto y entiendo cada cláusula.",
    author: "Rodrigo Fuentes",
    role: "Emprendedor",
  },
  {
    quote:
      "Proceso de constitución de sociedad impecable, rápido y sin vueltas. Claridad total en honorarios desde el principio.",
    author: "Valentina Torres",
    role: "Fundadora, startup tecnológica",
  },
];

// ─── Equipo ───────────────────────────────────────────────────────────────────

export const team: TeamMember[] = [
  {
    name: "Gonzalo Cisternas Sobarzo",
    role: "Director Legal",
    university: "U. Gabriela Mistral",
    imageKey: "gonzalo-cisternas",
    bio: "Especialista en resolución de conflictos económicos y comerciales de alta complejidad, con destacada trayectoria en litigios y arbitrajes nacionales e internacionales.",
    credentials: [
      "Master of Laws Trial Advocacy Magna Cum Laude — California Western School of Law",
      "LLM en Economía y Finanzas — UGIM",
      "Certificado en Design Thinking — MIT",
      "Coach Ontológico y Diplomado en Competencias Directivas",
    ],
  },
  {
    name: "Juan Pablo Lorenzini Paci",
    role: "Libre Competencia y Mercados Regulados",
    university: "U. de Chile",
    imageKey: "juan-pablo-lorenzini",
    bio: "Ex-Superintendente de Electricidad y Combustibles y Ex-Sub-Fiscal Nacional Económico. Referente nacional en regulación tarifaria, libre competencia y derecho económico.",
    credentials: [
      "Ex-Asesor Legal Comisión Nacional de Energía",
      "Ex-Vice-Presidente del Negocio Eléctrico",
      "Profesor de Derecho Económico — U. Alberto Hurtado",
      "Especialista en regulación tarifaria y colusión",
    ],
  },
  {
    name: "Daniela Saleh Navas",
    role: "Litigación y Corporativo",
    university: "U. José Abreu",
    imageKey: "daniela-saleh",
    bio: "Abogada litigante con sólida formación en derecho inmobiliario, migratorio y urbanístico. Ex-abogada del Conservador de Bienes Raíces de La Serena.",
    credentials: [
      "Ex-abogada Conservador de Bienes Raíces de La Serena",
      "Ex-investigadora Manual de Derecho Migratorio",
      "Diplomado en Derecho Urbanístico — U. de Los Andes",
      "Minor en Escritura Creativa — UAS",
    ],
  },
  {
    name: "José Tomás Eyzaguirre Córdova",
    role: "Litigación Penal Compleja",
    university: "U. del Desarrollo",
    imageKey: "jose-tomas-eyzaguirre",
    bio: "Penalista con experiencia en el sector privado y el Ministerio Público. Especializado en derecho penal económico y de la empresa.",
    credentials: [
      "Ex-abogado penalista Ministerio Público",
      "Diplomado en Derecho Penal — U. de Chile",
      "Master en Derecho Penal y Procesal Penal — U. Carlos III de Madrid",
    ],
  },
  {
    name: "Marlene Molero de Venegas",
    role: "Niñez y Adolescencia",
    university: "U. del Zulia, Venezuela",
    imageKey: "marlene-molero",
    bio: "Ex-Fiscal del Ministerio Público del Estado Zulia con amplia experiencia y docencia en derechos de la niñez y adolescencia. MBA con orientación jurídica.",
    credentials: [
      "Ex-Fiscal Ministerio Público Estado Zulia",
      "Docente en Derechos de la Niñez y Adolescencia",
      "MBA — U. de Castilla, España",
      "Proceso de revalidación — U. de Chile",
    ],
  },
];

// ─── Contacto ─────────────────────────────────────────────────────────────────

export const contact: ContactInfo = {
  email: "contacto@auntoquelegal.cl",
  phone: "+56 2 2425 5000",
  address:
    "Candelaria Goyenechea 3900, oficina Z4, \nVitacura, Santiago — Chile",
};

// ─── Client logos ─────────────────────────────────────────────────────────────

export interface ClientLogo {
  key: string;
  name: string;
  sector: string;
}

export const clientLogos: ClientLogo[] = [
  { key: "anfp", name: "ANFP", sector: "Deporte profesional" },
  { key: "betterfood_chile", name: "BetterFood Chile", sector: "Alimentación & FoodTech" },
  { key: "clearchannel_chile", name: "Clear Channel Chile", sector: "Publicidad exterior" },
  { key: "comudef_laflorida_municipalidad", name: "Municipalidad de La Florida", sector: "Sector público" },
  { key: "globalchannel_chile", name: "Global Channel Chile", sector: "Medios & Distribución" },
];

// ─── Site metadata ────────────────────────────────────────────────────────────

export const siteMeta = {
  url: "https://auntoquelegal.cl",
  name: "A un toque legal",
  firm: "Cisternas, Lorenzini & Saleh",
  defaultTitle: "A un toque legal — Firma de Abogados Santiago, Chile",
  defaultDescription:
    "Cisternas, Lorenzini & Saleh. Firma de abogados en Santiago, Chile. Litigación civil, libre competencia, derecho laboral, familia. Contacto en 24 horas.",
};
