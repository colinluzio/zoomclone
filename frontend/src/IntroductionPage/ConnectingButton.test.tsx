import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './ConnectingButton';

test('renders learn react link', () => {
    render(<Button buttonText='Click here' onClickHandler={() => { }} />);
    const linkElement = screen.getByText(/Click here/i);
    expect(linkElement).toBeInTheDocument();
});
