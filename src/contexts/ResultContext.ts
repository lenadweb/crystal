import { createContext, Dispatch, SetStateAction } from 'react';

interface IResultContext {
    selectItemId: string | null,
    setSelectItemId?: Dispatch<SetStateAction<string | null>>
}

export const ResultContext = createContext<IResultContext>({
    selectItemId: null,
});
