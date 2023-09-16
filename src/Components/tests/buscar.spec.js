import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../Home/Home.js';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

test('Correct Rendering of the Home', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    const elemento = screen.getByText('Buscar');
    expect(elemento).toBeInTheDocument();
});

test('Click the Search button', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
        <Router history={history}> {/* Use Router instead of MemoryRouter */}
            <Home />
        </Router>
    );

    const botaoBuscar = getByText('Buscar');

    fireEvent.click(botaoBuscar);

    expect(history.location.pathname).toBe('/search'); // Check history location
});
