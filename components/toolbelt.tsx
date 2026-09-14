import { toolkit } from "@/data/portfolio";

export function Toolbelt() {
  const loop = [...toolkit, ...toolkit];
  return (
    <div className="toolbelt" aria-label={`Technology toolkit: ${toolkit.join(", ")}`}>
      <div className="toolbelt-track" aria-hidden="true">
        {loop.map((technology, index) => <span key={`${technology}-${index}`}><b>{technology}</b><i /></span>)}
      </div>
    </div>
  );
}
