import React, { useEffect, useState } from 'react';
import { regionMap } from '../utils/region.ts';
import '../styls/PrefCheckboxList.css'
import { usePrefectures } from '../hooks/usePrefectures.ts' ; 

type Props = {
    onSelectPrefCode: (code: number[]) => void;
}

const PrefCheckboxList: React.FC<Props> = ({ onSelectPrefCode }) => {
    const [selected, setSelected] = useState<number[]>([]);
    const { prefs, loading, error } = usePrefectures();

    useEffect(() => {
        onSelectPrefCode(selected);
    }, [selected, onSelectPrefCode]);

    const toggle = (code : number) => {
        setSelected((prev) =>
        prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        );
    };

    if ( loading ) return <p>都道府県を読み込み中...</p>;
    if (error) return <p>読み込みエラー: {error}</p>;

    return(
        <div className='checkboxContainer'>
            {Object.entries(regionMap).map(([regionName, codes]) => {
                return(
                    <div key = {regionName} className = 'regionBlock'>
                        <div className = 'regionLabel'>
                            {regionName}
                        </div>
                        <div className='prefsList'>
                            {codes.map(code => {
                                const pref = prefs.find((p) => p.prefCode === code);
                                if(!pref){
                                    return null;
                                }
                                return (
                                    <label 
                                        key={code} 
                                        className={`prefCheckbox ${
                                            selected.includes(code) ? 'selected' : ''
                                            }`}
                                    >
                                        <input
                                            type='checkbox'
                                            value={code}
                                            checked={selected.includes(code)}
                                            onChange={() => toggle(code)}
                                        />
                                        {pref.prefName}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PrefCheckboxList;

