import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationData } from '../types/population';

type Props = {
  dataMap: { [code: number]: PopulationData[]};
  codeToNameMap: { [code: number]: string };
  type: string;
};

export const PopulationGraph:React.FC<Props> = React.memo(({
  dataMap, codeToNameMap, type
}) => {
  const years = React.useMemo(() =>{
    const codes = Object.keys(dataMap);
    if (!codes.length) return [];
    const first = Number(codes[0]);
    return dataMap[first].map(d => d.year.toString());
  },[dataMap]);

  const series = React.useMemo(() => (
    Object.entries(dataMap).map(([code, data]) => ({
      type: 'line' as const,
      name: codeToNameMap[Number(code)] ?? `都道府県 ${code}`,
      data: data.map(d => d.value),
    }))
  ), [dataMap, codeToNameMap]);

  const options = React.useMemo<Highcharts.Options>(() => ({
    title: { text: `人口構成：${type}` },
    xAxis: { title: { text: '年' }, categories: years },
    yAxis: { title: { text: '人口数' } },
    series,
  }), [type, years, series]);

  if (series.length === 0) {
    return <div style={{ margin: '1rem', fontWeight: 'bold' }}>データがありません</div>;
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
});
