import { createContext, Dispatch, SetStateAction } from 'react';

interface ISearchContext {
    isLoading: boolean,
    hasError: boolean,
    setLoading?: Dispatch<SetStateAction<boolean>>
    setError?: Dispatch<SetStateAction<boolean>>
}

export const SearchContext = createContext<ISearchContext>({
    isLoading: false,
    hasError: false,
});
