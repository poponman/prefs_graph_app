import { render, screen, fireEvent } from '@testing-library/react';
import PrefCheckboxList from './PrefCheckboxList';
import * as usePrefecturesHook from '../hooks/usePrefectures';
import '@testing-library/jest-dom'

jest.mock('../utils/region.ts', () => ({
  regionMap: {
    関東: [13], 
  },
}));

describe('PrefCheckboxList', () => {
  const mockPrefs = [
    { prefCode: 13, prefName: '東京都' }
  ];

  const mockUsePrefectures = {
    prefs: mockPrefs,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.spyOn(usePrefecturesHook, 'usePrefectures').mockReturnValue(mockUsePrefectures);
  });

  it('renders prefectures correctly', () => {
    const mockCallback = jest.fn();
    render(<PrefCheckboxList onSelectPrefCode={mockCallback} />);

    expect(screen.getByText('関東')).toBeInTheDocument();
    expect(screen.getByLabelText('東京都')).toBeInTheDocument();
  });

  it('calls onSelectPrefCode when checkbox is toggled', () => {
    const mockCallback = jest.fn();
    render(<PrefCheckboxList onSelectPrefCode={mockCallback} />);

    const checkbox = screen.getByLabelText('東京都') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockCallback).toHaveBeenCalledWith([13]);

    fireEvent.click(checkbox); // 再度クリックで解除
    expect(mockCallback).toHaveBeenCalledWith([]);
  });

  it('shows loading state', () => {
    jest.spyOn(usePrefecturesHook, 'usePrefectures').mockReturnValue({
      prefs: [],
      loading: true,
      error: null,
    });

    const mockCallback = jest.fn();
    render(<PrefCheckboxList onSelectPrefCode={mockCallback} />);
    expect(screen.getByText('都道府県を読み込み中...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    jest.spyOn(usePrefecturesHook, 'usePrefectures').mockReturnValue({
      prefs: [],
      loading: false,
      error: '取得失敗',
    });

    const mockCallback = jest.fn();
    render(<PrefCheckboxList onSelectPrefCode={mockCallback} />);
    expect(screen.getByText('読み込みエラー: 取得失敗')).toBeInTheDocument();
  });
});
