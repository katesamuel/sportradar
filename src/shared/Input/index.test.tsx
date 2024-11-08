import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index';

describe('Input component', () => {
  test('renders with the correct value', () => {
    render(<Input value="Hello" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue(/hello/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange handler with the correct value for text input', () => {
    const onChangeMock = jest.fn();
    render(<Input value="" onChange={onChangeMock} type="text" />);
    const inputElement = screen.getByRole('textbox');
    
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('Hello');
  });

  test('calls onChange handler with the correct value for number input', () => {
    const onChangeMock = jest.fn();
    render(<Input value={0} onChange={onChangeMock} type="number" />);
    const inputElement = screen.getByRole('spinbutton');
    
    fireEvent.change(inputElement, { target: { value: '123' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(123);
  });

  test('prevents invalid number input', () => {
    const onChangeMock = jest.fn();
    render(<Input value={0} onChange={onChangeMock} type="number" />);
    const inputElement = screen.getByRole('spinbutton');
    
    fireEvent.change(inputElement, { target: { value: 'abc' } });
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  test('disables input when disabled prop is true', () => {
    const onChangeMock = jest.fn();
    render(<Input value="Test" onChange={onChangeMock} disabled />);
    const inputElement = screen.getByDisplayValue(/test/i);
    expect(inputElement).toBeDisabled();
  });

  test('renders with a placeholder', () => {
    render(<Input value="" onChange={() => {}} placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText(/enter text/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('applies custom CSS classes', () => {
    render(<Input value="" onChange={() => {}} className="custom-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('shared-input');
    expect(inputElement).toHaveClass('custom-class');
  });

  test('applies aria-label when provided', () => {
    render(<Input value="" onChange={() => {}} ariaLabel="custom-aria-label" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('aria-label', 'custom-aria-label');
  });

  test('renders as a required input when required prop is true', () => {
    render(<Input value="" onChange={() => {}} required />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeRequired();
  });
});
