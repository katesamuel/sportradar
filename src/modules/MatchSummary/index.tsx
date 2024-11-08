import React, { useEffect, useState } from "react";
import { Match } from "../../services/matchService";
import Button from "../../shared/Button";
import "./index.css";

interface MatchSummaryProps {
  matches: Match[];
  onFinishMatch: (matchIndex: number) => void;
  onMatchSelection: (matchIndex: number) => void;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({
  matches,
  onFinishMatch,
  onMatchSelection,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {}, [selectedItem]);

  return (
    <div>
      <h2>Match Summary</h2>
      <ul>
        {matches &&
          matches.map((match, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  setSelectedItem(index);
                  onMatchSelection(index);
                }}
                className={selectedItem === index ? "selected" : ""}
              >
                <div className="summary-item">
                  {match.homeTeam} vs {match.awayTeam}{" "}
                  <div className="separator">|</div> {match.homeScore}-
                  {match.awayScore}
                </div>
              </div>
              <Button
                onClick={() => onFinishMatch(index)}
                label="Finish Match"
                className="danger"
              ></Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MatchSummary;
