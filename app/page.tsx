import { ArrowDownRight, ArrowUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { MotionProvider } from "@/components/motion-provider";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteHeader } from "@/components/site-header";
import { Toolbelt } from "@/components/toolbelt";
import { capabilities, projects, repositories } from "@/data/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const process = [
  ["Understand the system", "Map users, workflows, constraints, and the outcome worth measuring."],
  ["Structure the decisions", "Shape interfaces, data, architecture, tradeoffs, and a delivery path."],
  ["Ship in evidence", "Deliver useful slices, validate assumptions, and keep progress legible."],
  ["Operate and improve", "Document, observe, learn, and strengthen the product after release."],
] as const;

export default function Home() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="noise" aria-hidden="true" />
      <ScrollProgress />
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="aurora aurora-one" aria-hidden="true" />
          <div className="aurora aurora-two" aria-hidden="true" />
          <div className="grid-field" aria-hidden="true" />
          <div className="shell hero-layout">
            <Reveal className="hero-copy">
              <p className="eyebrow"><span>Full-stack engineer</span><b aria-hidden="true" /><span>Indonesia · UTC+7</span></p>
              <h1 id="hero-title">I turn hard problems into <span>software people can trust.</span></h1>
              <p className="hero-intro">I&apos;m Sulthon—an engineer and technical product builder connecting product clarity, scalable systems, and responsible AI from first decision to production.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore selected work <ArrowDownRight size={16} aria-hidden="true" /></a>
                <a className="button button-ghost" href="https://www.linkedin.com/in/sulthonkaf" target="_blank" rel="noreferrer">Let&apos;s connect <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
              <dl className="hero-proof" aria-label="Selected proof points">
                <div><dt>1,669</dt><dd>Athletes in platform data</dd></div>
                <div><dt>13.7K</dt><dd>Research samples</dd></div>
                <div><dt>End-to-end</dt><dd>Discovery to delivery</dd></div>
              </dl>
            </Reveal>
            <Reveal as="aside" className="hero-stage" aria-label="Profile overview" delay={0.1}>
              <div className="stage-ring stage-ring-one" aria-hidden="true" />
              <div className="stage-ring stage-ring-two" aria-hidden="true" />
              <div className="profile-card">
                <div className="profile-image-wrap">
                  <Image src="https://avatars.githubusercontent.com/u/177893016?v=4&size=640" alt="Sulthon Kaffaah Al Farizzi" width={640} height={640} priority unoptimized sizes="(max-width: 860px) 80vw, 420px" />
                  <div className="profile-gradient" aria-hidden="true" />
                </div>
                <div className="profile-card-copy"><span>Currently focused on</span><strong>Reliable platforms, applied AI, and digital health.</strong></div>
              </div>
              <div className="floating-card floating-card-top" aria-hidden="true"><span>01</span><strong>Product clarity</strong><small>before complexity</small></div>
              <div className="floating-card floating-card-bottom" aria-hidden="true"><i /><strong>Production minded</strong><small>by default</small></div>
            </Reveal>
          </div>
          <a className="scroll-cue" href="#work"><span>Scroll to explore</span><i aria-hidden="true" /></a>
        </section>

        <Toolbelt />

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="shell">
            <Reveal className="section-heading">
              <div><p className="section-label">01 · Selected work</p><h2 id="work-title">Systems measured by what they enable.</h2></div>
              <p>A focused set of platforms and research where I contributed across architecture, implementation, product decisions, and delivery.</p>
            </Reveal>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <Reveal className="open-source">
              <div className="open-source-intro"><p className="section-label">Open source & applied learning</p><h3>More experiments, fewer black boxes.</h3></div>
              <div className="repo-list">
                {repositories.map((repository, index) => (
                  <a key={repository.href} href={repository.href} target="_blank" rel="noreferrer">
                    <span className="repo-number">0{index + 1}</span>
                    <span><strong>{repository.name}</strong><small>{repository.stack}</small></span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section approach-section" id="approach" aria-labelledby="approach-title">
          <div className="aurora aurora-three" aria-hidden="true" />
          <div className="shell approach-layout">
            <Reveal className="approach-copy">
              <p className="section-label">02 · How I work</p>
              <h2 id="approach-title">Clarity compounds.</h2>
              <p>Good delivery is less about heroic coding and more about making constraints, decisions, risks, and outcomes visible early.</p>
              <blockquote>“Build with clarity. Operate with responsibility. Improve what matters.”</blockquote>
            </Reveal>
            <ol className="process-list">
              {process.map(([title, description], index) => (
                <Reveal as="li" key={title} delay={index * 0.04}>
                  <span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="section capability-section" aria-labelledby="capability-title">
          <div className="shell">
            <Reveal className="section-heading">
              <div><p className="section-label">03 · Capabilities</p><h2 id="capability-title">From ambiguous brief to operated system.</h2></div>
              <p>Hands-on engineering paired with the product and operational thinking needed to keep delivery useful.</p>
            </Reveal>
            <div className="capability-grid">
              {capabilities.map((capability, index) => (
                <Reveal as="article" className="capability-card" key={capability.title} delay={index * 0.05}>
                  <span>0{index + 1}</span><h3>{capability.title}</h3><p>{capability.description}</p>
                  <ul>{capability.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="shell about-layout">
            <Reveal className="about-profile">
              <div className="about-photo"><Image src="https://avatars.githubusercontent.com/u/177893016?v=4&size=720" alt="Sulthon Kaffaah Al Farizzi" width={720} height={720} loading="lazy" unoptimized sizes="(max-width: 860px) 88vw, 480px" /></div>
              <div className="about-caption"><span>Based in Indonesia</span><strong>Building for meaningful, real-world outcomes.</strong></div>
            </Reveal>
            <Reveal className="about-copy" delay={0.08}>
              <p className="section-label">04 · About</p>
              <h2 id="about-title">Engineering is valuable when it improves the system around it.</h2>
              <p className="lead">My work sits between software engineering, product strategy, and human-centered problem solving.</p>
              <p>I&apos;ve contributed across technical leadership, project coordination, full-stack implementation, AI experimentation, and deployment. That range helps me translate between users, business stakeholders, and engineering teams without losing the details that make systems dependable.</p>
              <p>I&apos;m especially interested in products that strengthen health, education, public systems, and operational decision-making.</p>
              <div className="principles" aria-label="Working principles"><span>Useful</span><span>Understandable</span><span>Secure</span><span>Built to improve</span></div>
            </Reveal>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-orb" aria-hidden="true" />
          <Reveal className="shell contact-inner">
            <p className="section-label">05 · Let&apos;s build something useful</p>
            <h2 id="contact-title">Have a meaningful problem worth solving?</h2>
            <p>I&apos;m open to full-stack engineering, technical product, and applied AI opportunities where thoughtful execution and long-term value matter.</p>
            <div className="contact-actions">
              <a className="button button-light" href="https://www.linkedin.com/in/sulthonkaf" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="text-link" href="https://github.com/sulthonkaf" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-layout">
          <p>© {new Date().getUTCFullYear()} Sulthon Kaffaah Al Farizzi.</p>
          <p>Engineered with intent. Static-first React.</p>
          <a href="#top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </footer>
    </MotionProvider>
  );
}
