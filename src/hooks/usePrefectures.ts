import { useEffect, useState } from 'react';
import { Prefecture, PrefectureResponse } from '../types/prefecture';

export const usePrefectures = () => {
    const [prefs, setPrefs] = useState<Prefecture[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const API_KEY = process.env.REACT_APP_API_KEY;

        const fetchPrefs = async() => {
            try {
                const res = await fetch (
                    'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures',
                    {
                        headers: {
                            'X-API-KEY': API_KEY ?? '',
                        },
                    }
                );
                if(!res.ok) throw new Error(`API error : ${res.status}`);
                const data : PrefectureResponse = await res.json();
                if(!Array.isArray(data.result))throw new Error('Invalid API response');
                setPrefs(data.result);
            } catch (err: any) {
                setError(err.message ?? '不明なエラー');
            } finally {
                setLoading(false);
            }
        };

        fetchPrefs();
     }, []);

     return {prefs, loading, error};
}