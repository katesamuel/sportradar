// components/UpdateScore.tsx
import React, { useEffect, useState } from "react";
import { Match } from "../../services/matchService";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import './index.css';

interface UpdateScoreProps {
  selectedMatch: Match | null;
  onUpdateScore: (homeScore: number, awayScore: number) => void;
}

const UpdateScore: React.FC<UpdateScoreProps> = ({
  onUpdateScore,
  selectedMatch,
}) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateScore(homeScore, awayScore);
  };

  useEffect(() => {
    setHomeScore(selectedMatch?.homeScore || 0);
    setAwayScore(selectedMatch?.awayScore || 0);
  }, [selectedMatch]);

  return (
    <form onSubmit={handleSubmit} className="update-match">
      <div className="label-input">
        <label>Home Score:</label>
        {selectedMatch?.homeTeam}
        <Input
          type="number"
          value={homeScore}
          onChange={setHomeScore}
          disabled={!selectedMatch}
          aria-label="Home Team Score Input"
        />
      </div>
      <div className="label-input">
        <label>Away Score:</label>
        {selectedMatch?.awayTeam}
        <Input
          type="number"
          value={awayScore}
          onChange={setAwayScore}
          disabled={!selectedMatch}
          aria-label="Away Team Score Input"
        />
      </div>

      <Button
        type="submit"
        disabled={!selectedMatch}
        label="Update Score"
        className="primary"
      ></Button>
    </form>
  );
};

export default UpdateScore;
