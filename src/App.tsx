import React, { useCallback, useState } from 'react';
import './App.css';
import todouhuken from './todouhuken.png'
import PrefCheckboxList from './components/PrefCheckboxList.tsx';

function App() {
  const [selectedCodes, setSelectedCodes] = useState<number[]>([]);

  const handleSelectPrefCode = useCallback((codes: number[]) => {
    setSelectedCodes(codes);
  }, [])
  return ( 
   <>
    <header>
      <h1 className = 'headerTitle'> 都道府県別の人口推移グラフ</h1>
    </header>
    <div className = 'main'>
      <img src={todouhuken} className='todouhukenLogo' alt='' />
      <h2>都道府県一覧</h2>
        <PrefCheckboxList onSelectPrefCode = {handleSelectPrefCode} />
    </div>
   </>
  );
}

export default App;
