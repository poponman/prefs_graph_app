import React from 'react';
import styles from'../styls/PopulationTypeSelector.module.css'
import { PopulationType } from '../types/population';

type Props = {
  selected: PopulationType;
  onChange: (type: PopulationType) => void;
};

const types : PopulationType[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

export const PopulationTypeSelector: React.FC<Props> = ({selected, onChange}) => {
  return (
    <div style = {{marginBottom: '1rem'}}>
      {types.map((type) => (
        <button
          key = {type}
          onClick = {() => onChange(type)}
          className  ={`${styles.button} ${selected ===type ? styles.selected : ''}`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
