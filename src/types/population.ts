export type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

export type PopulationData = {
    year : number;
    value: number;
};

export type PopulationResponse = {
    message: null;
    result: {
        boundaryYear: number;
        data: {
            label: PopulationType;
            data: PopulationData[];
        }[];
    };
};
