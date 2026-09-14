import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-orb" aria-hidden="true" />
      <div>
        <span>Error 404 · Route not found</span>
        <h1>This page took a different path.</h1>
        <p>The link may be outdated, but the main portfolio is exactly where it should be.</p>
        <Link className="button button-primary" href="/">Return to the portfolio →</Link>
      </div>
    </main>
  );
}
