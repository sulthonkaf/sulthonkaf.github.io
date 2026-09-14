export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  id: string;
  index: string;
  type: string;
  status: "Production" | "Research" | "Prototype";
  kicker: string;
  title: string;
  summary: string;
  challenge: string;
  contribution: string;
  outcome: string;
  metrics: Metric[];
  stack: string[];
  accent: "blue" | "purple" | "cyan";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "muhammadiyah-games",
    index: "01",
    type: "Platform",
    status: "Production",
    kicker: "Event operations · Full-stack delivery",
    title: "Muhammadiyah Games 2026",
    summary: "A multi-role platform covering contingent onboarding, athlete registration, payments, document verification, and event administration.",
    challenge: "Replace fragmented event workflows with one role-aware system that could keep registration, payment, and verification states legible to operators.",
    contribution: "Contributed across frontend and backend delivery, workflow translation, RBAC, integration decisions, deployment, and production support with the project team.",
    outcome: "The platform created one operational surface for a large event dataset while making pending and approved work visible to administrators.",
    metrics: [
      { value: "419", label: "contingents" },
      { value: "1,669", label: "athletes" },
      { value: "339", label: "payment records" },
    ],
    stack: ["Next.js 16", "TypeScript", "Laravel 12", "PostgreSQL", "Docker", "Cloudflare R2"],
    accent: "blue",
    featured: true,
  },
  {
    id: "soulcare",
    index: "02",
    type: "AI research",
    status: "Research",
    kicker: "Multimodal intelligence",
    title: "SoulCare",
    summary: "A mental-health support prototype combining text, audio, and visual emotion signals with Transformer-based fusion.",
    challenge: "Evaluate whether complementary language, speech, and visual signals can produce a more useful emotion representation for a mental-health support interaction.",
    contribution: "Designed the multimodal experiment, feature contracts, Transformer fusion architecture, evaluation flow, model artifacts, and FastAPI inference deployment.",
    outcome: "Produced a reproducible research baseline and explicit deployment artifacts. The 54.90% weighted F1 is reported as evidence, not inflated as a production claim.",
    metrics: [
      { value: "13.7K", label: "samples" },
      { value: "54.90%", label: "weighted F1" },
      { value: "3", label: "modalities" },
    ],
    stack: ["PyTorch", "Transformers", "RoBERTa", "wav2vec 2.0", "EfficientNet", "FastAPI"],
    accent: "purple",
  },
  {
    id: "momsync",
    index: "03",
    type: "Digital health",
    status: "Prototype",
    kicker: "Technical direction · Architecture",
    title: "MomSync",
    summary: "An end-to-end maternal-health concept connecting wearable data, monitoring workflows, risk visibility, and structured care support.",
    challenge: "Turn continuous wearable signals into an understandable care workflow without hiding uncertainty or overwhelming the people making decisions.",
    contribution: "Shaped the product flow and technical architecture spanning the web dashboard, typed services, data contracts, and wearable integration path.",
    outcome: "Created a coherent prototype direction for connecting device data, risk visibility, and follow-up actions across one care experience.",
    metrics: [
      { value: "Web", label: "care dashboard" },
      { value: "API", label: "typed services" },
      { value: "Data", label: "wearable flow" },
    ],
    stack: ["Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Zod"],
    accent: "cyan",
  },
];

export const capabilities = [
  {
    title: "Product & systems",
    description: "Discovery, workflow mapping, RBAC, architecture, API contracts, and technical roadmaps.",
    tags: ["System design", "Technical leadership", "Product scoping"],
  },
  {
    title: "Full-stack engineering",
    description: "Accessible interfaces, reliable APIs, data modeling, integrations, and production-aware delivery.",
    tags: ["Next.js", "TypeScript", "Laravel & NestJS"],
  },
  {
    title: "Applied AI",
    description: "Reproducible experiments, model evaluation, inference services, and human-centered AI workflows.",
    tags: ["PyTorch", "Transformers", "Multimodal ML"],
  },
  {
    title: "Delivery & operations",
    description: "Deployment, quality gates, observability thinking, runbooks, and continuous improvement.",
    tags: ["Docker", "Cloud delivery", "Documentation"],
  },
];

export const repositories = [
  { name: "Plant Disease Detection API", stack: "FastAPI · CNN", href: "https://github.com/sulthonkaf/plant-disease-detection" },
  { name: "Housing Model Benchmark", stack: "MLP · XGBoost · Scikit-learn", href: "https://github.com/sulthonkaf/housing-price-prediction" },
  { name: "Fashion Data Pipeline", stack: "Python · ETL · PostgreSQL", href: "https://github.com/sulthonkaf/ETL" },
];

export const toolkit = ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "PyTorch", "FastAPI", "Docker", "Cloudflare"];
