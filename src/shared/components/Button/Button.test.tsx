import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders the button with the correct label', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button label="Click Me" onClick={onClickMock} />);
    
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const onClickMock = jest.fn();
    render(<Button label="Click Me" onClick={onClickMock} disabled />);
    
    const buttonElement = screen.getByText(/click me/i);
    
    fireEvent.click(buttonElement);

    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('has the disabled attribute when disabled', () => {
    render(<Button label="Click Me" onClick={() => {}} disabled />);
    
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeDisabled();
  });
});
