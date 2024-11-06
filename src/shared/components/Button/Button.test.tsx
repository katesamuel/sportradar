// components/Button/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for additional Jest matchers
import Button from './Button';

describe('Button component', () => {
  test('renders the button with the correct label', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    
    // Check if the button renders with the given label
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button label="Click Me" onClick={onClickMock} />);
    
    // Simulate a click event
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    // Assert that the onClick handler was called once
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const onClickMock = jest.fn();
    render(<Button label="Click Me" onClick={onClickMock} disabled />);
    
    const buttonElement = screen.getByText(/click me/i);
    
    // Try clicking the disabled button
    fireEvent.click(buttonElement);

    // Assert that the onClick handler was not called
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('has the disabled attribute when disabled', () => {
    render(<Button label="Click Me" onClick={() => {}} disabled />);
    
    // Check if the button has the disabled attribute
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeDisabled();
  });
});
