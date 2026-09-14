"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/data/portfolio";

export function ProjectDialog({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="project-detail-button" type="button">
          View case study <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <m.div
                className="dialog-overlay"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={`${project.id}-summary`}>
              <m.div
                className="dialog-content"
                initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`dialog-accent dialog-accent-${project.accent}`} aria-hidden="true" />
                <div className="dialog-topline">
                  <span>{project.index} · {project.type}</span>
                  <Dialog.Close className="dialog-close" aria-label="Close case study"><X size={18} aria-hidden="true" /></Dialog.Close>
                </div>
                <Dialog.Title>{project.title}</Dialog.Title>
                <Dialog.Description id={`${project.id}-summary`}>{project.summary}</Dialog.Description>
                <dl className="dialog-metrics">
                  {project.metrics.map((metric) => <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>)}
                </dl>
                <div className="dialog-story">
                  <section><span>Challenge</span><p>{project.challenge}</p></section>
                  <section><span>Contribution</span><p>{project.contribution}</p></section>
                  <section><span>Outcome</span><p>{project.outcome}</p></section>
                </div>
                <ul className="dialog-stack" aria-label="Technology stack">
                  {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
