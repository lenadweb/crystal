import { useEffect, useState } from 'react';
import TApi from '../api/api';

export function useDescription(id: string | undefined) {
    const [result, setResult] = useState<any>([]);
    const [isComplete, setComplete] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const description = async (id: string) => {
        setLoading(true);
        const response = await TApi.description(id);
        setResult(response);
        setLoading(false);
        setComplete(true);
    };

    useEffect(() => {
        if (id) {
            description(id);
        }
    }, [id]);

    return {
        data: result,
        isLoading,
        isComplete,
    };
}
