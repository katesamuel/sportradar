import { render, screen, fireEvent } from '@testing-library/react';
import InputBox from './InputBox';

describe('InputBox component', () => {
  test('renders the input with the correct placeholder', () => {
    render(<InputBox value="" onChange={() => {}} placeholder="Type here" />);

    // Check if the input renders with the given placeholder
    const inputElement = screen.getByPlaceholderText(/type here/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('displays the correct initial value', () => {
    render(<InputBox value="Initial value" onChange={() => {}} />);

    // Check if the input has the correct initial value
    const inputElement = screen.getByDisplayValue(/initial value/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange handler when typing', () => {
    const onChangeMock = jest.fn();
    render(<InputBox value="" onChange={onChangeMock} />);

    // Simulate typing into the input
    const inputElement = screen.getByRole('textbox', { name: /input-box/i });
    fireEvent.change(inputElement, { target: { value: 'New text' } });

    // Assert that the onChange handler was called
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test('updates the value as per the prop', () => {
    const { rerender } = render(<InputBox value="First value" onChange={() => {}} />);

    const inputElement = screen.getByDisplayValue(/first value/i);
    expect(inputElement).toBeInTheDocument();

    // Rerender with a new value
    rerender(<InputBox value="Updated value" onChange={() => {}} />);
    expect(screen.getByDisplayValue(/updated value/i)).toBeInTheDocument();
  });
});
