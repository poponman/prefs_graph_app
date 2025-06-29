import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PopulationTypeSelector } from './PopulationTypeSelector';
import { PopulationType } from '../types/population';

const types: PopulationType[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

describe('PopulationTypeSelector', () => {
  it('renders all population type buttons', () => {
    const mockOnChange = jest.fn();
    render(<PopulationTypeSelector selected="総人口" onChange={mockOnChange} />);

    types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('applies selected style to the selected type', () => {
    const mockOnChange = jest.fn();
    render(
      <PopulationTypeSelector selected="生産年齢人口" onChange={mockOnChange} />
    );

    const selectedButton = screen.getByText('生産年齢人口');
    expect(selectedButton.className).toContain('selected');
  });

  it('calls onChange when a button is clicked', () => {
    const mockOnChange = jest.fn();
    render(<PopulationTypeSelector selected="総人口" onChange={mockOnChange} />);

    const targetButton = screen.getByText('老年人口');
    fireEvent.click(targetButton);

    expect(mockOnChange).toHaveBeenCalledWith('老年人口');
  });
});
