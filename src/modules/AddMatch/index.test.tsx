import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddMatch from "./index";

describe("AddMatch component", () => {
  const mockOnStartMatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<AddMatch onStartMatch={mockOnStartMatch} />);

    expect(screen.getByLabelText(/Home team score input/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Away team score input/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Match/i)).toBeInTheDocument();
  });

  test("handles input changes for home and away team", () => {
    render(<AddMatch onStartMatch={mockOnStartMatch} />);

    const homeTeamInput = screen.getByLabelText(/Home team score input/i);
    const awayTeamInput = screen.getByLabelText(/Away team score input/i);

    fireEvent.change(homeTeamInput, { target: { value: "Team A" } });
    fireEvent.change(awayTeamInput, { target: { value: "Team B" } });

    expect(homeTeamInput).toHaveValue("Team A");
    expect(awayTeamInput).toHaveValue("Team B");
  });

  test("calls onStartMatch when form is submitted", () => {
    render(<AddMatch onStartMatch={mockOnStartMatch} />);

    const homeTeamInput = screen.getByLabelText(/Home team score input/i);
    const awayTeamInput = screen.getByLabelText(/Away team score input/i);
    const startMatchButton = screen.getByText(/Start Match/i);

    fireEvent.change(homeTeamInput, { target: { value: "Team A" } });
    fireEvent.change(awayTeamInput, { target: { value: "Team B" } });
    fireEvent.click(startMatchButton);

    expect(mockOnStartMatch).toHaveBeenCalledWith("Team A", "Team B");
    expect(homeTeamInput).toHaveValue(""); // Resets input
    expect(awayTeamInput).toHaveValue(""); // Resets input
  });

  test("does not call onStartMatch with empty inputs", () => {
    render(<AddMatch onStartMatch={mockOnStartMatch} />);
    const homeTeamInput = screen.getByLabelText(/Home team score input/i);
    const awayTeamInput = screen.getByLabelText(/Away team score input/i);
    const startMatchButton = screen.getByText(/Start Match/i);

    fireEvent.change(homeTeamInput, { target: { value: "" } });
    fireEvent.change(awayTeamInput, { target: { value: "" } });

    fireEvent.click(startMatchButton);

    expect(mockOnStartMatch).not.toHaveBeenCalled();
  });
});
