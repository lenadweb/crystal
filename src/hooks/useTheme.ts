import { useContext, useMemo } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function useTheme() {
    const { isLightTheme, setLightTheme } = useContext(ThemeContext);

    const result = useMemo(() => ({
        isLightTheme,
        toggleTheme: () => {
            localStorage.setItem('theme', isLightTheme ? 'dark' : 'light');
            setLightTheme && setLightTheme(!isLightTheme);
        },
    }), [setLightTheme, isLightTheme]);

    return result;
}
