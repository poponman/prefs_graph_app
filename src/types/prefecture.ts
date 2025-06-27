export type Prefecture = {
    prefCode:number;
    prefName : string;
};

export type PrefectureResponse = {
  message: string;
  result: Prefecture[];
};

export type RegionMap = {
    [region:string]:number[];
};