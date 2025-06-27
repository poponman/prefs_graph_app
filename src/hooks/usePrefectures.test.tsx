import { renderHook, waitFor } from '@testing-library/react';
import { usePrefectures } from './usePrefectures';

const mockResponse = {
  result: [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 13, prefName: '東京都' },
  ]
};

describe('usePrefectures', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    
  });

  it('fetches and sets prefecture data correctly', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
            status: 200,
        })
    ) as jest.Mock;

    const { result } = renderHook(() => usePrefectures());
    await waitFor(() => result.current.loading === false)

    expect(result.current.prefs).toEqual(mockResponse.result);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API error'));

   
    const { result } = renderHook(() => usePrefectures());
    await waitFor(() => result.current.loading === false)

    expect(result.current.prefs).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('API error');
  });
});
