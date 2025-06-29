import './App.css';
import todouhuken from './todouhuken.png'
import PrefCheckboxList from './components/PrefCheckboxList.tsx';
import { PopulationTypeSelector } from './components/PopulationTypeSelector.tsx';
import { PopulationType} from './types/population.ts';
import { PopulationGraph } from './components/PopulationGraph.tsx';
import { usePopulationData } from './hooks/usePopulationData.ts';
import { useCallback, useMemo, useState } from 'react';
import { usePrefectures } from './hooks/usePrefectures.ts';

function App() {
  const [selectedCodes, setSelectedCodes] = useState<number[]>([]);
  const [type, setType] = useState<PopulationType>('総人口');
  const populationData = usePopulationData(selectedCodes, type);
  const { prefs: prefectures} = usePrefectures();

  const codeToNameMap = useMemo(() => {
    const map: {[code: number]: string} = {};
    prefectures.forEach((p) => {
      map[p.prefCode] = p.prefName;
    });
    return map;
  }, [prefectures]);

  const handleSelectPrefCode = useCallback((codes: number[]) => {
    setSelectedCodes(codes);
  }, [])
  return ( 
   <>
    <header>
      <h1 className = 'headerTitle'> 都道府県別の人口推移グラフ</h1>
    </header>
    <div className = 'main'>
      <img src={todouhuken} className='todouhukenLogo' alt='todouhuken' />
      <h2>都道府県一覧</h2>
        <PrefCheckboxList onSelectPrefCode = {handleSelectPrefCode} />
      
      <h2>人口構成グラフ</h2>
        <PopulationTypeSelector selected={type} onChange={setType} />
        {selectedCodes.length > 0 ? (
          <PopulationGraph
            dataMap={populationData}
            codeToNameMap={codeToNameMap}
            type={type}
          />
        ):(
          <div className='graphMsg'>
            都道府県を選択してください
          </div>
        )}
    </div>
   </>
  );
}

export default App;
