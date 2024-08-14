import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpeakerTag } from '../../../components/SpeakerTag/SpeakerTag';

describe('SpeakerTag', () => {
  it('renders speaker name correctly', () => {
    render(<SpeakerTag name="John Doe" />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('XXXX')).toBeInTheDocument();
  });

  it('renders avatar with correct initials', () => {
    render(<SpeakerTag name="John Doe" />);
    
    expect(screen.getByText('A')).toBeInTheDocument(); // Avatar should show 'A' for 'Anonymous'
  });
});