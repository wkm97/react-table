import { render, screen } from '@testing-library/react';
import { OwnerDisplay } from './owner-display';

describe('OwnerDisplay component', () => {
  it('rendered correctly with name and avatar_url', () => {
    render(<OwnerDisplay avatar_url="www.image.com" name="random-name" />);

    const ownerDisplay = screen.getByTestId('owner-display');
    const thumbnail = screen.getByTestId('owner-display-thumbnail');
    expect(ownerDisplay).toContainElement(thumbnail);
    expect(ownerDisplay).toHaveTextContent('random-name');
    expect(thumbnail).toHaveAttribute('src', 'www.image.com');
  });
});
