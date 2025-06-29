import React from 'react';
import { render, screen } from '@testing-library/react';
import { PopulationGraph } from './PopulationGraph';
import { PopulationData } from '../types/population';

jest.mock('highcharts', () => ({}));
jest.mock('highcharts-react-official', () => () => <div data-testid='highcharts-mock' />);

describe('PopulationGraph', () => {
    const mockData: { [code: number]: PopulationData[] } = {
        13: [
            { year: 2000, value: 1000 },
            { year: 2010, value: 1100 },
        ],
        1: [
            { year: 2000, value: 800 },
            { year: 2010, value: 850 },
        ],
    };

    const mockCodeToNameMap = {
        13: '東京都',
        1: '北海道',
    };

    it('renders message when no data is available', () => {
    render(<PopulationGraph dataMap={{}} codeToNameMap={{}} type='総人口' />);
    expect(screen.getByText('データがありません')).toBeInTheDocument();
  });

  it('renders Highcharts component when data is available', () => {
    render(<PopulationGraph dataMap={mockData} codeToNameMap={mockCodeToNameMap} type='総人口' />);
    expect(screen.queryByText('データがありません')).not.toBeInTheDocument();
    expect(screen.getByTestId('highcharts-mock')).toBeInTheDocument();
  });

  it('sets correct title text in Highcharts options', () => {
    const { rerender } = render(<PopulationGraph dataMap={mockData} codeToNameMap={mockCodeToNameMap} type="老年人口" />);
    expect(screen.queryByText('データがありません')).not.toBeInTheDocument();
    rerender(<PopulationGraph dataMap={{}} codeToNameMap={{}} type='老年人口' />);
    expect(screen.getByText('データがありません')).toBeInTheDocument();
  });
});