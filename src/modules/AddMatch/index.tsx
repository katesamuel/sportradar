import React, { useState } from "react";
import "./index.css";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

interface AddMatchProps {
  onStartMatch: (homeTeam: string, awayTeam: string) => void;
}

const AddMatch: React.FC<AddMatchProps> = ({ onStartMatch }) => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeTeam.trim() || !awayTeam.trim()) {
      return;
    }
    onStartMatch(homeTeam, awayTeam);
    setHomeTeam("");
    setAwayTeam("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-match">
      <div className="label-input">
        <label>Home Team:</label>
        <Input
          type="text"
          value={homeTeam}
          onChange={setHomeTeam}
          ariaLabel="Home team score input"
          required
        />
      </div>
      <div className="label-input">
        <label>Away Team:</label>
        <Input
          type="text"
          value={awayTeam}
          onChange={setAwayTeam}
          ariaLabel="Away team score input"
        />
      </div>
      <Button
        type="submit"
        label="Start Match"
        ariaLabel="Start Match button"
        className="primary"
      ></Button>
    </form>
  );
};

export default AddMatch;
