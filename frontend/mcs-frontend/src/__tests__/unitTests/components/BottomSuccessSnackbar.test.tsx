import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar';

describe('BottomSuccessSnackbar', () => {
  it('renders when showSuccess is true', () => {
    render(
      <BottomSuccessSnackbar
        showSuccess={true}
        setShowSuccess={jest.fn()}
        message="Success message"
      />
    );
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('does not render when showSuccess is false', () => {
    render(
      <BottomSuccessSnackbar
        showSuccess={false}
        setShowSuccess={jest.fn()}
        message="Success message"
      />
    );
    
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
  });

  it('calls setShowSuccess when closed', () => {
    const setShowSuccess = jest.fn();
    render(
      <BottomSuccessSnackbar
        showSuccess={true}
        setShowSuccess={setShowSuccess}
        message="Success message"
      />
    );
    
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    });
    
    expect(setShowSuccess).toHaveBeenCalledWith(false);
  });
});