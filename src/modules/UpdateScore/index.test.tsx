import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateScore from "./index";
import { Match } from "../../services/matchService";

describe("UpdateScore Component", () => {
  const mockOnUpdateScore = jest.fn();

  const selectedMatch: Match = {
    homeTeam: "Team A",
    awayTeam: "Team B",
    homeScore: 1,
    awayScore: 2,
    startedAt: Date.now(),
  };

  test("renders input fields and button when a match is selected", () => {
    render(
      <UpdateScore
        selectedMatch={selectedMatch}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    const homeScoreInput = screen.getByPlaceholderText("Home score");
    const awayScoreInput = screen.getByPlaceholderText("Away score");
    const updateButton = screen.getByRole("button", { name: /update score/i });

    expect(homeScoreInput).toHaveValue(1); // The initial home score should be 1
    expect(awayScoreInput).toHaveValue(2); // The initial away score should be 2
    expect(updateButton).toBeEnabled(); // The update button should be enabled
  });

  test("updates score and calls onUpdateScore on form submit", () => {
    render(
      <UpdateScore
        selectedMatch={selectedMatch}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    const homeScoreInput = screen.getByPlaceholderText("Home score");
    const awayScoreInput = screen.getByPlaceholderText("Away score");
    const updateButton = screen.getByRole("button", { name: /update score/i });

    fireEvent.change(homeScoreInput, { target: { value: "3" } });
    fireEvent.change(awayScoreInput, { target: { value: "4" } });

    fireEvent.click(updateButton);
    expect(mockOnUpdateScore).toHaveBeenCalledWith(3, 4);
  });

  test("disables input fields and button when no match is selected", () => {
    render(
      <UpdateScore selectedMatch={null} onUpdateScore={mockOnUpdateScore} />
    );

    const homeScoreInput = screen.getByPlaceholderText("Home score");
    const awayScoreInput = screen.getByPlaceholderText("Away score");
    const updateButton = screen.getByRole("button", { name: /update score/i });

    expect(homeScoreInput).toBeDisabled(); 
    expect(awayScoreInput).toBeDisabled(); 
    expect(updateButton).toBeDisabled(); 
  });

  test("initializes score inputs with selected match values", () => {
    render(
      <UpdateScore
        selectedMatch={selectedMatch}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    const homeScoreInput = screen.getByPlaceholderText("Home score");
    const awayScoreInput = screen.getByPlaceholderText("Away score");

    expect(homeScoreInput).toHaveValue(1); 
    expect(awayScoreInput).toHaveValue(2); 
  });
});
