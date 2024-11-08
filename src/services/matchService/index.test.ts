import {
  startMatch,
  updateScore,
  finishMatch,
  setSelectedMatch,
  getMatchSummary,
} from "./index";

describe("matchService", () => {
  beforeEach(() => {
    // Reset ongoing matches before each test
    while (getMatchSummary().length > 0) {
      finishMatch(0);
    }
  });

  test("startMatch adds a new match with initial scores", () => {
    startMatch("Team A", "Team B");
    const matches = getMatchSummary();
    expect(matches.length).toBe(1);
    expect(matches[0]).toMatchObject({
      homeTeam: "Team A",
      awayTeam: "Team B",
      homeScore: 0,
      awayScore: 0,
    });
  });

  test("updateScore updates the score for a specific match", () => {
    startMatch("Team A", "Team B");
    updateScore(3, 2, 0);
    const matches = getMatchSummary();
    expect(matches[0].homeScore).toBe(3);
    expect(matches[0].awayScore).toBe(2);
  });

  test("finishMatch removes a match from the list of ongoing matches", () => {
    startMatch("Team A", "Team B");
    startMatch("Team C", "Team D");
    finishMatch(0); // Finish the first match
    const matches = getMatchSummary();
    expect(matches.length).toBe(1);
    expect(matches[0].homeTeam).toBe("Team C");
    expect(matches[0].awayTeam).toBe("Team D");
  });

  test("setSelectedMatch sets the selected match correctly", () => {
    startMatch("Team A", "Team B");
    startMatch("Team C", "Team D");
    setSelectedMatch(1);
    const matches = getMatchSummary();
    expect(matches[0].isSelected).toBe(false);
    expect(matches[1].isSelected).toBe(true);
  });

  test("getMatchSummary returns matches sorted by total score and start time", (done) => {
    // Start the first match
    startMatch("Team A", "Team B"); // Earliest timestamp

    // Wait a short time before starting the next match
    setTimeout(() => {
      startMatch("Team C", "Team D");

      // Wait again before starting the next match
      setTimeout(() => {
        startMatch("Team E", "Team F"); // Most recent timestamp

        // Update scores to create a tie
        updateScore(1, 2, 0); // Total score: 3
        updateScore(0, 0, 1); // Total score: 0
        updateScore(1, 2, 2); // Total score: 3 (same as first match)

        const matches = getMatchSummary();

        // Expect the most recent match with the same score (Team E) to be first
        expect(matches[0].homeTeam).toBe("Team E");
        done(); // End the test since we used setTimeouts
      }, 2000); // 2-second delay before starting the third match
    }, 2000);
  });
});
