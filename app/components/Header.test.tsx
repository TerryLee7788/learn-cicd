import { render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import Header from "./Header";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
