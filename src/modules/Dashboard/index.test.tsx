import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './index';
import * as matchService from '../../services/matchService';

jest.mock('../../services/matchService');

const mockedStartMatch = matchService.startMatch as jest.Mock;
const mockedUpdateScore = matchService.updateScore as jest.Mock;
const mockedFinishMatch = matchService.finishMatch as jest.Mock;
const mockedGetMatchSummary = matchService.getMatchSummary as jest.Mock;
const mockedSetSelectedMatch = matchService.setSelectedMatch as jest.Mock;

describe('Dashboard component', () => {
  beforeEach(() => {
    mockedGetMatchSummary.mockReturnValue([]);
  });

  test('renders correctly', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Live Football World Cup Scoreboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Match/i)).toBeInTheDocument(); // Assuming the AddMatch component has this text
    expect(screen.getByText(/Update Score/i)).toBeInTheDocument(); // Assuming UpdateScore component has this text
    expect(screen.getByText(/Match Summary/i)).toBeInTheDocument(); // Assuming MatchSummary component has this text
  });

  test('handles starting a new match', () => {
    render(<Dashboard />);
    
    const homeTeamInput = screen.getByPlaceholderText(/Home team/i); // Assuming AddMatch form has this placeholder
    const awayTeamInput = screen.getByPlaceholderText(/Away team/i); // Assuming AddMatch form has this placeholder
    const addMatchButton = screen.getByText(/Add Match/i); // Assuming there's a button to add match

    fireEvent.change(homeTeamInput, { target: { value: 'Team A' } });
    fireEvent.change(awayTeamInput, { target: { value: 'Team B' } });
    fireEvent.click(addMatchButton);

    expect(mockedStartMatch).toHaveBeenCalledWith('Team A', 'Team B');
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });

  test('handles updating score', () => {
    mockedGetMatchSummary.mockReturnValue([{ homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 0, awayScore: 0, startedAt: Date.now(), isSelected: true }]);
    render(<Dashboard />);

    const homeScoreInput = screen.getByPlaceholderText(/Home Score/i); // Assuming UpdateScore form has this placeholder
    const awayScoreInput = screen.getByPlaceholderText(/Away Score/i); // Assuming UpdateScore form has this placeholder
    const updateScoreButton = screen.getByText(/Update Score/i); // Assuming there's a button to update score

    fireEvent.change(homeScoreInput, { target: { value: '1' } });
    fireEvent.change(awayScoreInput, { target: { value: '2' } });
    fireEvent.click(updateScoreButton);

    expect(mockedUpdateScore).toHaveBeenCalledWith(1, 2, 0); // Assuming match index is 0
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });

  test('handles finishing a match', () => {
    mockedGetMatchSummary.mockReturnValue([{ homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 0, awayScore: 0, startedAt: Date.now() }]);
    render(<Dashboard />);

    const finishMatchButton = screen.getByText(/Finish Match/i); // Assuming each match has a finish button

    fireEvent.click(finishMatchButton);

    expect(mockedFinishMatch).toHaveBeenCalledWith(0); // Assuming match index is 0
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });

  test('handles match selection', () => {
    mockedGetMatchSummary.mockReturnValue([{ homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 0, awayScore: 0, startedAt: Date.now() }]);
    render(<Dashboard />);

    const matchElement = screen.getByText(/Team A vs Team B/i); // Assuming MatchSummary lists matches this way

    fireEvent.click(matchElement);

    expect(mockedSetSelectedMatch).toHaveBeenCalledWith(0); // Assuming match index is 0
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });
});
