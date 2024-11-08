import React, { useState } from "react";
import "./index.css";
import {
  startMatch,
  updateScore,
  finishMatch,
  getMatchSummary,
  Match,
  setSelectedMatch,
} from "../../services/matchService";
import AddMatch from "../AddMatch";
import UpdateScore from "../UpdateScore";
import MatchSummary from "../MatchSummary";

const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(getMatchSummary());
  const selectedMatch: Match | null = matches?.find(match => match.isSelected) || null;
  const [matchIndex, setMatchIndex] = useState<number | null>();

  const handleStartMatch = (homeTeam: string, awayTeam: string) => {
    startMatch(homeTeam, awayTeam);
    setMatches(getMatchSummary());
  };

  const handleUpdateScore = (
    homeScore: number,
    awayScore: number,
  ) => {
    if (matchIndex != null) {
      updateScore(homeScore, awayScore, matchIndex);
    }
    setMatches(getMatchSummary());
  };

  const handleFinishMatch = (matchIndex: number) => {
    finishMatch(matchIndex);
    setMatches(getMatchSummary());
  };

  const handleMatchSelection = (matchIndex: number) => {
    setMatchIndex(matchIndex)
    setSelectedMatch(matchIndex);
    setMatches(getMatchSummary());
  };

  return (
    <div>
      <h1>Live Football World Cup Scoreboard</h1>
      <div className="container"><AddMatch onStartMatch={handleStartMatch} /></div>
      <div className="container"><UpdateScore onUpdateScore={handleUpdateScore} selectedMatch={selectedMatch} /></div>
      <div className="container"><MatchSummary matches={matches} onFinishMatch={handleFinishMatch} onMatchSelection={handleMatchSelection} /></div>
    </div>
  );
};

export default Dashboard;
