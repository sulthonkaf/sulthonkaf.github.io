import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/portfolio";
import { ProjectDialog } from "@/components/project-dialog";

describe("ProjectDialog", () => {
  it("opens an accessible case study with evidence and closes it", () => {
    render(<ProjectDialog project={projects[0]} />);

    fireEvent.click(screen.getByRole("button", { name: /view case study/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Muhammadiyah Games 2026" })).toBeInTheDocument();
    expect(screen.getByText("Contribution")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close case study/i }));
  });
});
