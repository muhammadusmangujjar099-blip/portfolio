export type Skill = { name: string; note: string };
export type SkillModule = { id: string; title: string; blurb: string; skills: Skill[] };

export const skillModules: SkillModule[] = [
  {
    id: "core",
    title: "Core engineering",
    blurb: "The language and frameworks behind every service I ship.",
    skills: [
      { name: "Python", note: "Typed, async-friendly services, scripts and tooling." },
      { name: "FastAPI", note: "Pydantic-validated REST APIs with dependency injection and generated OpenAPI docs." },
      { name: "Flask", note: "Lightweight WSGI services and quick internal tools." },
      { name: "AsyncIO", note: "Concurrent I/O with async/await for network-bound workloads." },
    ],
  },
  {
    id: "ai",
    title: "AI and data infrastructure",
    blurb: "Retrieval, embeddings and LLM plumbing that keeps answers grounded.",
    skills: [
      { name: "RAG with pgvector", note: "Ingest, chunk, embed, retrieve and generate, with PostgreSQL as the vector store." },
      { name: "Ollama", note: "Run open models locally for private, offline-friendly inference." },
      { name: "LLM tooling", note: "Prompting, structured JSON output and validation around model calls." },
      { name: "LangChain and LlamaIndex", note: "Orchestration concepts: document loaders, retrievers and chains." },
    ],
  },
  {
    id: "data",
    title: "Database and storage",
    blurb: "Schemas and queries designed for correctness first, speed second.",
    skills: [
      { name: "PostgreSQL", note: "Relational modelling, indexes, transactions and row-level locking." },
      { name: "SQLite", note: "Zero-setup storage for prototypes and local tools." },
      { name: "SQLAlchemy", note: "ORM mappings and parameterised query building." },
    ],
  },
  {
    id: "devops",
    title: "DevOps and tooling",
    blurb: "Everything that gets code from a laptop to a running service.",
    skills: [
      { name: "Docker", note: "Containerised services with Compose for local and deployed stacks." },
      { name: "Linux", note: "Daily driver on Ubuntu and Mint: shell, packages, services." },
      { name: "Git", note: "Branching, rebasing and clean commit history." },
      { name: "CI/CD with GitHub Actions", note: "Automated tests and deploys on every push." },
      { name: "Nginx", note: "Reverse proxy and TLS termination basics." },
    ],
  },
];

export type FlowNode = { label: string; detail?: string; accent?: boolean };
export type Flow = { title: string; nodes: FlowNode[] };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badges: string[];
  highlights: string[];
  stack: string[];
  repo: string; // empty string = not linked yet
  demo: string; // empty string = not linked yet
  architecture: { summary: string; flows: Flow[] };
};

export const projects: Project[] = [
  {
    id: "rag-study-assistant",
    title: "RAG Document Study Assistant",
    tagline: "Ask questions about your own PDFs and get answers grounded in the text.",
    description:
      "Upload a PDF and the system extracts and chunks the text, stores embeddings in PostgreSQL with pgvector, then retrieves the most relevant passages to give the language model context for every answer.",
    badges: ["RAG Pipeline", "pgvector", "LLM"],
    highlights: [
      "PDF ingestion with text extraction and chunking",
      "Vector similarity search inside PostgreSQL",
      "Context-aware answers built from retrieved passages",
    ],
    stack: ["Python", "PostgreSQL", "pgvector", "LLM"],
    repo: "", // TODO: add the repository URL
    demo: "", // TODO: add the live demo URL
    architecture: {
      summary: "Documents flow into a vector store once, then every question reuses that index.",
      flows: [
        {
          title: "Ingest",
          nodes: [
            { label: "PDF upload" },
            { label: "Text extraction" },
            { label: "Chunking" },
            { label: "Embedding model", accent: true },
          ],
        },
        {
          title: "Store",
          nodes: [{ label: "PostgreSQL", detail: "chunks and metadata" }, { label: "pgvector", detail: "vectors", accent: true }],
        },
        {
          title: "Answer",
          nodes: [
            { label: "Question" },
            { label: "Similarity search", detail: "top matching chunks", accent: true },
            { label: "Prompt with context" },
            { label: "LLM" },
            { label: "Grounded answer" },
          ],
        },
      ],
    },
  },
  {
    id: "dukaan",
    title: "Smart E-Commerce Platform (Dukaan)",
    tagline: "A store whose assistant turns “phone under 20,000” into a real database query.",
    description:
      "A FastAPI backend with product search, filtering and order placement, a PostgreSQL schema, and a Next.js storefront. The assistant converts plain language into validated filters, so the model never writes SQL.",
    badges: ["FastAPI + Next.js", "PostgreSQL", "AI Filters"],
    highlights: [
      "Dynamic AI product filtering with validated JSON filters",
      "Orders checked server-side, with row locks to prevent overselling",
      "Docker Compose setup for database, API and storefront",
    ],
    stack: ["FastAPI", "Next.js", "PostgreSQL", "SQLAlchemy", "Docker", "Tailwind CSS"],
    repo: "https://github.com/muhammadusmangujjar099-blip/Dukaan",
    demo: "", // TODO: add the deployed storefront URL
    architecture: {
      summary: "The browser never talks to the database: the API validates every filter the model suggests.",
      flows: [
        {
          title: "Storefront",
          nodes: [
            { label: "Next.js App Router" },
            { label: "Zustand", detail: "cart and chat state" },
            { label: "Assistant widget", accent: true },
          ],
        },
        {
          title: "API",
          nodes: [
            { label: "FastAPI" },
            { label: "Pydantic validation", accent: true },
            { label: "SQLAlchemy" },
            { label: "PostgreSQL", detail: "products, categories, orders" },
          ],
        },
        {
          title: "AI filters",
          nodes: [
            { label: "Customer message" },
            { label: "LLM via OpenRouter" },
            { label: "JSON filters", accent: true },
            { label: "Validated query" },
            { label: "Matching products" },
          ],
        },
      ],
    },
  },
];

export type TimelineItem = {
  id: string;
  kind: "education" | "experience";
  title: string;
  org: string;
  period: string;
  description: string;
};

// Edit the dates and descriptions to match your real history.
export const timeline: TimelineItem[] = [
  {
    id: "gcuf",
    kind: "education",
    title: "Bachelor of Science in Computer Science",
    org: "GCUF",
    period: "2026",
    description: "Computer science degree, class of 2026.",
  },
  {
    id: "bitlogicx",
    kind: "experience",
    title: "Software Engineering Intern, AI Systems Integration",
    org: "BitLogicx",
    period: "Internship",
    description: "Worked on connecting AI features to backend software systems.",
  },
];
