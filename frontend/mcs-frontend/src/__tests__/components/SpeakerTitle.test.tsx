import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpeakerTitle } from '../../components/SpeakerTitle/SpeakerTitle';

describe('SpeakerTitle', () => {
  it('renders speaker information correctly', () => {
    render(
      <SpeakerTitle
        firstname="Jane"
        lastname="Doe"
        organisation="University XYZ"
      >
        <span>Child 1</span>
        <span>Child 2</span>
      </SpeakerTitle>
    );
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('University XYZ')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});