import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the header', () => {
    render(<Header />);
    const headerText = screen.getByText('Weather App');
    expect(headerText).toBeInTheDocument();
});