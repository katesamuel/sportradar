// utils/matchService.ts
export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startedAt: number; // Timestamp to track when the match started
    isSelected?: boolean;
  }
  
  let ongoingMatches: Match[] = [];
  
  export const startMatch = (homeTeam: string, awayTeam: string) => {
    const newMatch = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startedAt: Date.now(),
    };
    ongoingMatches = [...ongoingMatches, newMatch];
  };
  
  export const updateScore = (homeScore: number, awayScore: number, matchIndex: number) => {
    const ongoingMatchesTemp = ongoingMatches;
    ongoingMatchesTemp[matchIndex].homeScore = homeScore;
    ongoingMatchesTemp[matchIndex].awayScore = awayScore;
    ongoingMatches = [...ongoingMatchesTemp];
  };
  
  export const finishMatch = (matchIndex: number) => {
    const ongoingMatchesTemp = ongoingMatches;
    ongoingMatchesTemp.splice(matchIndex, 1)
    ongoingMatches = [...ongoingMatchesTemp];
  };

  export const setSelectedMatch = (matchIndex: number) => {
    const ongoingMatchesTemp = ongoingMatches;
    ongoingMatchesTemp.forEach((match, index) => match.isSelected = (index === matchIndex) ? true : false);
    ongoingMatches = [...ongoingMatchesTemp];
  };
  
  export const getMatchSummary = () => {
    const ongoingMatchesTemp = ongoingMatches;
    return ongoingMatchesTemp
      .sort((a, b) => {
        const scoreA = a.homeScore + a.awayScore;
        const scoreB = b.homeScore + b.awayScore;
        if (scoreA === scoreB) {
          return b.startedAt - a.startedAt; // Most recently started match
        }
        return scoreB - scoreA; // Sorted by total score
      });
  };
  