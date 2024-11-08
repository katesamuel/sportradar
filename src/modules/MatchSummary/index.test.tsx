import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MatchSummary from "./index";
import { Match } from "../../services/matchService";

const mockOnFinishMatch = jest.fn();
const mockOnMatchSelection = jest.fn();

const matches: Match[] = [
  {
    homeTeam: "Team A",
    awayTeam: "Team B",
    homeScore: 1,
    awayScore: 2,
    startedAt: Date.now() - 1000,
  },
  {
    homeTeam: "Team C",
    awayTeam: "Team D",
    homeScore: 3,
    awayScore: 3,
    startedAt: Date.now(),
  },
];

describe("MatchSummary Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders match summary correctly", () => {
    render(
      <MatchSummary
        matches={matches}
        onFinishMatch={mockOnFinishMatch}
        onMatchSelection={mockOnMatchSelection}
      />
    );

    expect(screen.getByText(/Team A vs Team B/)).toBeInTheDocument();
    expect(screen.getByText(/1-2/)).toBeInTheDocument();
    expect(screen.getByText(/Team C vs Team D/)).toBeInTheDocument();
    expect(screen.getByText(/3-3/)).toBeInTheDocument();
  });

  test("calls onMatchSelection when a match is clicked", () => {
    render(
      <MatchSummary
        matches={matches}
        onFinishMatch={mockOnFinishMatch}
        onMatchSelection={mockOnMatchSelection}
      />
    );

    const firstMatch = screen.getByText(/Team A vs Team B/);
    if (firstMatch) {
      fireEvent.click(firstMatch);
    }

    expect(mockOnMatchSelection).toHaveBeenCalledTimes(1);
    expect(mockOnMatchSelection).toHaveBeenCalledWith(0); // Index of the first match
  });

  test('calls onFinishMatch when the "Finish Match" button is clicked', () => {
    render(
      <MatchSummary
        matches={matches}
        onFinishMatch={mockOnFinishMatch}
        onMatchSelection={mockOnMatchSelection}
      />
    );

    const finishButton = screen.getAllByText("Finish Match")[0]; // Get the first finish button
    fireEvent.click(finishButton);

    expect(mockOnFinishMatch).toHaveBeenCalledTimes(1);
    expect(mockOnFinishMatch).toHaveBeenCalledWith(0); // Index of the first match
  });

  test('applies "selected" class when a match is clicked', () => {
    render(
      <MatchSummary
        matches={matches}
        onFinishMatch={mockOnFinishMatch}
        onMatchSelection={mockOnMatchSelection}
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const firstMatch = screen.getAllByRole("listitem")[0].firstElementChild;
    if (firstMatch) fireEvent.click(firstMatch);
    expect(firstMatch).toHaveClass("selected");
  });
});
