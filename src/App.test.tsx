// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';
import './pages/Dashboard/Dashboard';

jest.mock('./pages/Dashboard/Dashboard', () => () => <div data-testid="dashboard">Dashboard Component</div>);

describe('App component', () => {
  test('renders the Dashboard component', () => {
    render(<App />);
    
    const dashboardElement = screen.getByTestId('dashboard');
    expect(dashboardElement).toBeInTheDocument();
  });
});