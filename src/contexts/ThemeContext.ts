import { createContext, Dispatch, SetStateAction } from 'react';

interface IThemeContext {
    isLightTheme: boolean,
    setLightTheme?: Dispatch<SetStateAction<boolean>>,
}

export const ThemeContext = createContext<IThemeContext>({
    isLightTheme: false,
});
