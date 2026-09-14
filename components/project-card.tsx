import { ProjectDialog } from "@/components/project-dialog";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal as="article" className={cn("project-card", project.featured && "project-featured")}>
      <div className={`project-glow project-glow-${project.accent}`} aria-hidden="true" />
      <div className="project-head">
        <span className="project-index">{project.index} / {project.type}</span>
        <span className="status-pill"><i aria-hidden="true" /> {project.status}</span>
      </div>
      <div className="project-body">
        <p className="project-kicker">{project.kicker}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <dl className={`project-metrics${project.featured ? "" : " compact"}`}>
        {project.metrics.map((metric) => <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>)}
      </dl>
      <div className="project-footer">
        <p className="stack">{project.stack.join(" · ")}</p>
        <ProjectDialog project={project} />
      </div>
    </Reveal>
  );
}
