import { useEffect, useMemo, useState } from 'react'
import { PopulationData, PopulationResponse, PopulationType } from '../types/population'

export const usePopulationData = (
  prefCode: number[],
  type: PopulationType
): { [code: number]: PopulationData[] } => {
  const [data, setData] = useState<{ [code: number]: PopulationData[] }>({});

 const prefCodeKey = useMemo(() => prefCode.join(','), [prefCode]);
 
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (prefCode.length === 0){
    setData({});
    return;
  }
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchData = async () => {
    const allData: Record<number, PopulationData[]> = {};
    try {
      for (const code of prefCode) {
        const res = await fetch(
          `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${code}`,
          { headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY ?? '' }, signal }
        );

        if (!res.ok) throw new Error('Network response was not ok');

        const json: PopulationResponse = await res.json();
        const sel = json.result.data.find(d => d.label === type);
        if (sel) {
          allData[code] = sel.data.map(d => ({ year: d.year, value: d.value }));
        }
      }
      setData(allData);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
        setData({});
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, [prefCodeKey, type]);

  return data;
}
