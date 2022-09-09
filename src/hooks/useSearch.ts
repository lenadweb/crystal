import { useContext, useEffect, useState } from 'react';
import TApi from '../api/api';
import { SearchContext } from '../contexts/SearchContext';
import { TorrentItem } from '../types/api';

export function useSearch(q: string) {
    const [result, setResult] = useState<TorrentItem[]>([]);
    const [isSuccess, setSuccess] = useState(false);
    const { setLoading, isLoading, hasError, setError } = useContext(SearchContext);

    const search = async (q: string) => {
        try {
            setError && setError(false);
            setSuccess(false);
            setLoading && setLoading(true);
            const response = await TApi.search(q);
            setResult(response);
            setLoading && setLoading(false);
            setSuccess(true);
        } catch (e) {
            console.error(e);
            setError && setError(true);
            setSuccess(true);
            setLoading && setLoading(false);
        }
    };

    useEffect(() => {
        if (q.length > 0) {
            search(q);
        } else {
            hasError && setError && setError(false);
        }
    }, [q]);

    return {
        data: result,
        isLoading,
        isSuccess: isSuccess && !hasError,
        isError: hasError,
    };
}
