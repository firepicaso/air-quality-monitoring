import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import States from './States';
import mockStore from '../__mocks__/reduxMock';

const initialState = {
  states: [],
};

const store = mockStore(initialState);

describe('testing states component', () => {
  test('renders States component', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <States />
        </BrowserRouter>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'Ontario' } });

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
