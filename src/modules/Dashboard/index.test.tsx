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
    expect(screen.getByText(/Start Match/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Update Score/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Match Summary/i)).toBeInTheDocument(); 
  });

  test('handles starting a new match', () => {
    render(<Dashboard />);
    
    const homeTeamInput = screen.getByPlaceholderText(/Home team/i); 
    const awayTeamInput = screen.getByPlaceholderText(/Away team/i); 
    const startMatchButton = screen.getByText(/Start Match/i); 

    fireEvent.change(homeTeamInput, { target: { value: 'Team A' } });
    fireEvent.change(awayTeamInput, { target: { value: 'Team B' } });
    fireEvent.click(startMatchButton);

    expect(mockedStartMatch).toHaveBeenCalledWith('Team A', 'Team B');
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });

  test('handles updating score', () => {
    mockedGetMatchSummary.mockReturnValue([{ homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 0, awayScore: 0, startedAt: Date.now(), isSelected: true }]);
    render(<Dashboard />);

    // eslint-disable-next-line testing-library/no-node-access
    const firstMatch = screen.getAllByRole("listitem")[0].firstElementChild;
    if (firstMatch) fireEvent.click(firstMatch);

    const homeScoreInput = screen.getByPlaceholderText(/Home Score/i); 
    const awayScoreInput = screen.getByPlaceholderText(/Away Score/i); 
    const updateScoreButton = screen.getByText(/Update Score/i); 

    fireEvent.change(homeScoreInput, { target: { value: '1' } });
    fireEvent.change(awayScoreInput, { target: { value: '2' } });
    fireEvent.click(updateScoreButton);

    expect(mockedUpdateScore).toHaveBeenCalledWith(1, 2, 0); 
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });

  test('handles finishing a match', () => {
    mockedGetMatchSummary.mockReturnValue([{ homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 0, awayScore: 0, startedAt: Date.now() }]);
    render(<Dashboard />);

    const finishMatchButton = screen.getByText(/Finish Match/i); 

    fireEvent.click(finishMatchButton);

    expect(mockedFinishMatch).toHaveBeenCalledWith(0); 
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });

  test('handles match selection', () => {
    mockedGetMatchSummary.mockReturnValue([{ homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 0, awayScore: 0, startedAt: Date.now() }]);
    render(<Dashboard />);

    const matchElement = screen.getByText(/Team A vs Team B/i); 

    fireEvent.click(matchElement);

    expect(mockedSetSelectedMatch).toHaveBeenCalledWith(0); 
    expect(mockedGetMatchSummary).toHaveBeenCalled();
  });
});
