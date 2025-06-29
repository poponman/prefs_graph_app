import { renderHook, waitFor } from "@testing-library/react";
import { usePopulationData } from "./usePopulationData";
import { PopulationResponse, PopulationType } from "../types/population";

const mockResponse: PopulationResponse = {
  message: null,
  result: {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 2000, value: 1000 },
          { year: 2010, value: 1100 },
        ],
      },
      {
        label: '年少人口',
        data: [
          { year: 2000, value: 200 },
          { year: 2010, value: 180 },
        ],
      },
    ],
  },
};

describe('usePopulationData', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        process.env.REACT_APP_API_KEY = 'dummy-key';
        global.fetch = jest.fn();
    });
    
    afterEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('fetches population data for selected prefectures and type', async() => {
        (global.fetch as jest.Mock).mockResolvedValue(
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        );

        const { result } = renderHook(() => usePopulationData([13], '総人口' as PopulationType));

        await waitFor(() => {
            expect(result.current[13]).toEqual([
                { year: 2000, value: 1000 },
                { year: 2010, value: 1100 },
            ]);
        }, { timeout: 3000 });

        expect(global.fetch).toHaveBeenCalledWith(
            'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=13',
            expect.objectContaining({
                headers: { 'X-API-KEY': 'dummy-key' },
            })
        );
    });

    it('returns empty object if no prefectures are selected', async() => {
        const { result } = renderHook(() => usePopulationData([], '総人口' as PopulationType));
        //expect(result.current).toEqual({});
        await waitFor(() => {
            expect(result.current).toEqual({});
        });

    });

    it('handles fetch error gracefully', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
        const { result } = renderHook(() => usePopulationData([1], '総人口' as PopulationType));
        await waitFor(() => {
            expect(result.current).toEqual({});
        });
    });
});