import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./hooks/usePrefectures', () => ({
  usePrefectures: () => ({
    prefs: [
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 13, prefName: '東京都' },
    ],
  }),
}));

jest.mock('./hooks/usePopulationData', () => ({
  usePopulationData: (codes: number[], type: string) => {
    if (codes.includes(13) && type === '総人口') {
      return {
        13: [
          { year: 2000, value: 1000 },
          { year: 2010, value: 1100 },
        ],
      };
    }
    return {};
  },
}));

jest.mock('./components/PopulationGraph', () => ({
  PopulationGraph: ({ dataMap }: { dataMap: { [code: number]: { year: number; value: number }[] } }) => {
    return (
      <div>
        {Object.entries(dataMap).map(([code, data]) => (
          <div key={code}>
            <div>都道府県コード: {code}</div>
            {data.map((d, idx) => (
              <div key={idx}>
                {d.year}: {d.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
}));

describe('App.tsx', () => {
  it('初期レンダリングで見出しと説明文が表示される', () => {
    render(<App />);

    expect(screen.getByText('都道府県別の人口推移グラフ')).toBeInTheDocument();
    expect(screen.getByText('都道府県一覧')).toBeInTheDocument();
    expect(screen.getByText('人口構成グラフ')).toBeInTheDocument();
    expect(screen.getByText('都道府県を選択してください')).toBeInTheDocument();
  });

  it('チェックボックスを選択するとグラフが表示される', () => {
    render(<App />);

    const tokyoCheckbox = screen.getByLabelText('東京都');
    fireEvent.click(tokyoCheckbox);

    expect(screen.getByText('都道府県コード: 13')).toBeInTheDocument();
    expect(screen.getByText('2000: 1000')).toBeInTheDocument();
    expect(screen.getByText('2010: 1100')).toBeInTheDocument();
  });
});
