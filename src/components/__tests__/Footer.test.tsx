import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../Footer';

describe('Footer related sites', () => {
  it('renders Also check chips for ByteToolBox and TextCraft', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const nav = screen.getByRole('navigation', { name: 'Related sites' });
    expect(within(nav).getByText('Also check')).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: /ByteToolBox/ })).toHaveAttribute(
      'href',
      'https://www.bytetoolbox.com/'
    );
    expect(within(nav).getByRole('link', { name: /TextCraft/ })).toHaveAttribute(
      'href',
      'https://www.textcraft.dev/'
    );
  });
});
