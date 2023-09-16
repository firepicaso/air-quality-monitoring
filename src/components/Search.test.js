import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('renders States component and checks search operation', () => {
  test('testing search input', () => {
    render(<Search onSearch={() => { }} />);

    const inputField = screen.getByPlaceholderText('Search...');
    expect(inputField).toBeInTheDocument();
  });

  test('testing onSearch callback', () => {
    const mockOnSearch = jest.fn();

    render(<Search onSearch={mockOnSearch} />);

    const inputField = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputField, { target: { value: 'Ontario' } });

    expect(mockOnSearch).toHaveBeenCalledWith('Ontario');
  });

  test('testing input clearance', () => {
    const mockOnSearch = jest.fn();

    render(<Search onSearch={mockOnSearch} />);

    const inputField = screen.getByPlaceholderText('Search...');

    fireEvent.change(inputField, { target: { value: 'Quebec' } });

    expect(inputField.value).toBe('Quebec');

    fireEvent.change(inputField, { target: { value: '' } });

    expect(inputField.value).toBe('');
  });

  test('calls the onSearch callback with a value', () => {
    const mockOnSearch = jest.fn();

    render(<Search onSearch={mockOnSearch} />);

    const inputField = screen.getByPlaceholderText('Search...');
    const search = screen.getByTestId('search-text');

    fireEvent.change(inputField, { target: { value: 'Yukon' } });

    fireEvent.submit(search);

    expect(mockOnSearch).toHaveBeenCalledWith('Yukon');
  });
});
