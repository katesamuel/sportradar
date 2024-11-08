import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button component', () => {
  test('renders with the correct label', () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('handles click events', () => {
    const onClickMock = jest.fn();
    render(<Button label="Click Me" onClick={onClickMock} />);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('disables the button when the "disabled" prop is true', () => {
    const onClickMock = jest.fn();
    render(<Button label="Click Me" onClick={onClickMock} disabled />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeDisabled();

    // Ensure onClick isn't called when button is disabled
    fireEvent.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('uses the correct button type', () => {
    render(<Button label="Submit" type="submit" />);
    const buttonElement = screen.getByText(/submit/i);
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('applies custom CSS classes', () => {
    render(<Button label="Styled Button" className="custom-class" />);
    const buttonElement = screen.getByText(/styled button/i);
    expect(buttonElement).toHaveClass('shared-button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  test('uses aria-label when provided', () => {
    render(<Button label="Accessible Button" ariaLabel="custom-aria-label" />);
    const buttonElement = screen.getByText(/accessible button/i);
    expect(buttonElement).toHaveAttribute('aria-label', 'custom-aria-label');
  });
});
