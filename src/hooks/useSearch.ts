import { useContext, useEffect, useState } from 'react';
import TApi from '../api/api';
import { TorrentItem } from '../types/api';
import { RootContext } from '../../pages';

export function useSearch(q: string) {
    const [result, setResult] = useState<TorrentItem[]>([]);
    const { setLoading, isLoading } = useContext(RootContext);

    const search = async (q: string) => {
        setLoading(true);
        const response = await TApi.search(q);
        setResult(response);
        setLoading(false);
    };

    useEffect(() => {
        if (q.length > 1) {
            search(q);
        }
    }, [q]);

    return {
        data: result,
        isLoading,
    };
}
